import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  TextField,
  DialogActions,
  DialogContent,
  Box,
  Chip,
  CircularProgress,
  Avatar,
} from "@mui/material";
import { useQueryClient, useMutation, useQuery } from "react-query";
import AlertDialog from "./AlertDialog";
import { useNavigate } from "react-router-dom";
import { interests } from "../constants";
import { updateInterests, getInterests } from "../services/profile";
import { ProfileInterest } from "../types";
import { uploadImage } from "../services/contentful";

type Props = {
  passage_id: string;
  isEditable: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const Interests = ({ isEditable, passage_id, setOpen }: Props) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<number[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null | undefined>(null);
  const [desc, setDesc] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isLoadingInterests, refetch: getInterestsQuery } =
    useQuery(
      "get-interests",
      async () => {
        return await getInterests({
          passage_id,
        });
      },
      {
        enabled: false,
        onSuccess: (data) => {
          setSelectedInterests(
            data.Profile_Interest.map((i: ProfileInterest) => i.interest_id)
          );
          setImageUrl(data.image);
          setDesc(data.description);
        },
      }
    );

  const { isLoading, mutate: updateInterestsMutation } = useMutation(
    async () => {
      return await updateInterests({
        passage_id,
        interests: selectedInterests,
        description: desc,
        image: imageUrl,
      });
    },
    {
      onSuccess: () => {
        if (setOpen) {
          setOpen(false);
        }
        setOpenAlert(true);
        queryClient.fetchQuery("get-profile");
        queryClient.fetchQuery("get-interests");
      },
    }
  );

  const toggleInterest = (id: number) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== id));
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const handleSave = async () => {
    updateInterestsMutation();
  };

  useEffect(() => {
    if (passage_id) {
      getInterestsQuery();
    }
  }, [getInterestsQuery, passage_id]);

  if (isLoadingInterests) {
    return <CircularProgress />;
  }

  const handleFileChange = async (event: any) => {
    setUploadLoading(true);
    const asset = await uploadImage(event.target.files[0], passage_id);
    setImageUrl(asset.fields.file["en-US"].url.slice(2));
    setUploadLoading(false);
  };

  const handleDescChange = (e: any) => {
    setDesc(e.target.value);
  };

  return (
    <Box style={{ backgroundColor: "white" }} borderRadius={3}>
      <DialogContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Box mr={2}>
            <Avatar
              src={imageUrl ? `https:${imageUrl}` : ""}
              sx={{ width: 80, height: 80 }}
            />
          </Box>
          <Box>
            {isEditable && (
              <Button
                variant="contained"
                component="label"
                size="small"
                disabled={uploadLoading}
              >
                {uploadLoading && (
                  <CircularProgress
                    color="inherit"
                    className="spinner"
                    size="1rem"
                  />
                )}
                Upload Profile Photo
                <input type="file" hidden onChange={handleFileChange} />
              </Button>
            )}
          </Box>
        </Box>
        <TextField
          value={desc}
          onChange={handleDescChange}
          disabled={!isEditable}
          fullWidth
          required
          variant="outlined"
          margin="dense"
          id="description"
          label="About Me"
          type="text"
          minRows={2}
          multiline
          helperText={
            isEditable ? (
              <Typography
                style={{ fontSize: "12px" }}
              >{`Give a short intro about yourself.`}</Typography>
            ) : undefined
          }
        />
        <Box mt={2}>
          {isEditable && (
            <Box>
              <Typography>Select Interests</Typography>
            </Box>
          )}
          {interests.map((interest) => {
            return (
              <Chip
                key={interest.id}
                label={`${interest.icon} ${interest.title}`}
                color="primary"
                onClick={
                  isEditable ? () => toggleInterest(interest.id) : () => null
                }
                variant={
                  selectedInterests.includes(interest.id)
                    ? "filled"
                    : "outlined"
                }
                size="small"
                style={{ marginRight: "10px", marginTop: "10px" }}
              ></Chip>
            );
          })}
        </Box>
      </DialogContent>
      {isEditable && (
        <DialogActions>
          <Box display="flex" width="100%" justifyContent="center">
            <Button
              onClick={handleSave}
              variant="contained"
              disabled={isLoading}
            >
              {isLoading && (
                <CircularProgress
                  color="inherit"
                  className="spinner"
                  size="1rem"
                />
              )}
              {"Save"}
            </Button>
          </Box>
        </DialogActions>
      )}

      <AlertDialog
        open={openAlert}
        setOpen={setOpenAlert}
        buttonText={"Find Match"}
        content={
          "Your profile has been saved successfully. You're ready to be matched!"
        }
        buttonClickHandler={() => navigate("/about")}
        title="Profile Saved"
        isLoading={false}
      />
    </Box>
  );
};
export default Interests;
