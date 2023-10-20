import React, { useState } from "react";
import {
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation, useQueryClient } from "react-query";
import AlertDialog from "./AlertDialog";
import { Profile } from "../types";
import { createMatchNote } from "../services/match";
import { formatPhoneNumber } from "../services/util";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  match: Profile;
  matchId: number;
};

const PredictDialog = ({ open, setOpen, match, matchId }: Props) => {
  const [noteError, setNoteError] = useState(false);
  const [note, setNote] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const queryClient = useQueryClient();

  const { isLoading, mutate: createMatchNoteMutation } = useMutation(
    async () => {
      return await createMatchNote({
        match_id: matchId,
        note,
      });
    },
    {
      onSuccess: () => {
        queryClient.fetchQuery("get-match-notes");
        setOpen(false);
        setOpenAlert(true);
      },
    }
  );

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (!note) {
      setNoteError(true);
      return;
    }

    createMatchNoteMutation();
  };

  const handleChangeNote = (e: any) => {
    setNote(e.target.value);
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
            <Box> {`Call with ${match.first_name}`} </Box>
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {match.phone && (
            <Box mb={1}>
              <Typography color="primary" style={{ fontWeight: 600 }}>
                📞{" "}
                <a href={`tel:${match.phone}`}>
                  {`${formatPhoneNumber(match.phone)}`}
                </a>
              </Typography>
            </Box>
          )}
          <TextField
            variant="outlined"
            margin="dense"
            label="Notes"
            multiline
            minRows={2}
            type="text"
            helperText={
              <Typography
                color={noteError ? "error" : undefined}
                style={{ fontSize: "12px" }}
              >
                {`Give a brief summary of how the call went.`}
              </Typography>
            }
            onChange={handleChangeNote}
          />
        </DialogContent>
        <DialogActions>
          <Box display="flex" width="100%" justifyContent="center">
            <Button
              onClick={handleSubmit}
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
              {`Submit Call`}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      <AlertDialog
        open={openAlert}
        setOpen={setOpenAlert}
        content={"Well done. You're doing great!"}
        title="Call Completed"
        isLoading={false}
      />
    </div>
  );
};
export default PredictDialog;
