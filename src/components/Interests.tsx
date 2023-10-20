import React, { useState, useEffect, useContext } from "react";
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
import { Profile } from "../types";
import MatchNoteDialog from "./MatchNoteDialog";
import { ProfileContext } from "../context/ProfileContext";

type Props = {
  passage_id: string;
  isEditable: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setShowMatch?: React.Dispatch<React.SetStateAction<boolean>>;
};

const Interests = ({
  isEditable,
  passage_id,
  setOpen,
  setShowMatch,
}: Props) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [openNote, setOpenNote] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<number[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null | undefined>(null);
  const [desc, setDesc] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const profileContext = useContext(ProfileContext);

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
          setProfile(data);
          if (data.first_name && setShowMatch) {
            setShowMatch(true);
          }
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
        {!isEditable && (
          <Box
            display="flex"
            justifyContent="space-between"
            mb={3}
            width="100%"
            alignItems="center"
            className="call-box"
            bgcolor={"#fff689ff"}
            p={2}
            borderRadius={2}
          >
            <Typography style={{ fontSize: "14px", color: "black" }}>
              Introduce Yourself
            </Typography>
            <Button
              variant="contained"
              onClick={() => setOpenNote(true)}
            >{`Call ${profile?.first_name}`}</Button>
          </Box>
        )}
        <Box display="flex" alignItems="center" mb={2}>
          <Box mr={2}>
            <Avatar
              src={imageUrl ? `https://${imageUrl}` : ""}
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
                Upload Photo
                <input type="file" hidden onChange={handleFileChange} />
              </Button>
            )}
            {!isEditable && (
              <Typography
                style={{ color: "black" }}
              >{`${profile?.first_name} ${profile?.last_name}`}</Typography>
            )}
          </Box>
        </Box>
        <TextField
          value={desc}
          onChange={handleDescChange}
          disabled={!isEditable}
          fullWidth
          variant="outlined"
          margin="dense"
          id="description"
          label="About"
          type="text"
          minRows={2}
          multiline
          className="desc"
          helperText={
            isEditable ? (
              <Typography
                style={{ fontSize: "12px" }}
              >{`Give a short intro about yourself.`}</Typography>
            ) : undefined
          }
        />
        <Box mt={2}>
          <Box>
            <Typography style={{ color: "black" }}>
              {isEditable ? `Select Interests` : "Interests"}
            </Typography>
          </Box>

          {interests.map((interest) => {
            return isEditable || selectedInterests.includes(interest.id) ? (
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
            ) : null;
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
      {profile && !isEditable && profileContext?.profile?.match_id && (
        <>
          <MatchNoteDialog
            open={openNote}
            match={profile}
            setOpen={setOpenNote}
            matchId={profileContext?.profile?.match_id}
          />
        </>
      )}
    </Box>
  );
};
export default Interests;
