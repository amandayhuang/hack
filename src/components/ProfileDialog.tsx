import React, { useState, useContext, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
  Chip,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import AlertDialog from "./AlertDialog";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../context/ProfileContext";
import { interests } from "../constants";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfileDialog = ({ open, setOpen }: Props) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<number[]>([]);
  const profileContext = useContext(ProfileContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  //   const { isLoading, mutate: createPredictionMutation } = useMutation(
  //     async () => {
  //       if (!user?.sub || !winningTeamId || pointsBet === null) return;
  //       const fixtureId = parseInt(fixture.source_fixture_id.toString());
  //       return await createOrUpdatePrediction({
  //         auth0_id: user.sub,
  //         source_fixture_id: fixtureId,
  //         winner_source_team_id: winningTeamId,
  //         points_bet: pointsBet,
  //         id: prediction?.id || undefined,
  //       });
  //     },
  //     {
  //       onSuccess: () => {
  //         setOpen(false);
  //         setOpenAlert(true);
  //         queryClient.fetchQuery("get-user");
  //         queryClient.fetchQuery("get-predictions");
  //       },
  //     }
  //   );

  const handleClose = () => {
    setOpen(false);
  };

  const toggleInterest = (id: number) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== id));
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box> Edit Profile </Box>
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {/* <Typography color="error">{teamError}</Typography> */}

          <TextField
            variant="outlined"
            margin="dense"
            InputLabelProps={{ shrink: true }}
            id="name"
            label="Date of Birth"
            type="date"
            helperText={
              <Typography style={{ fontSize: "12px" }}>{`Optional`}</Typography>
            }
          />
          <Box>
            <Box>
              <Typography>Select Interests</Typography>
            </Box>
            {interests.map((interest) => {
              return (
                <Chip
                  label={`${interest.icon} ${interest.title}`}
                  color="primary"
                  onClick={() => toggleInterest(interest.id)}
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
        <DialogActions>
          <Box>
            <Box display="flex" width="100%" justifyContent="center">
              <Button
                onClick={() => null}
                variant="contained"
                // disabled={isLoading}
              >
                {/* {isLoading && (
                  <CircularProgress
                    color="inherit"
                    className="spinner"
                    size="1rem"
                  />
                )} */}
                {"Update Profile"}
              </Button>
            </Box>
          </Box>
        </DialogActions>
      </Dialog>
      <AlertDialog
        open={openAlert}
        setOpen={setOpenAlert}
        buttonText={"Find Match"}
        content={
          "Your profile has been saved successfully. You're ready to be matched."
        }
        buttonClickHandler={() => navigate("/about")}
        title="Prediction Saved"
        isLoading={false}
      />
    </div>
  );
};
export default ProfileDialog;
