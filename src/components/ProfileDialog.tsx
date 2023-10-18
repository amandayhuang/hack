import React, { useState, useContext, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogTitle, Box, IconButton } from "@mui/material";
import { ProfileContext } from "../context/ProfileContext";
import Interests from "./Interests";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfileDialog = ({ open, setOpen }: Props) => {
  const profileContext = useContext(ProfileContext);

  const handleClose = () => {
    setOpen(false);
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
            <Box> My Interests </Box>
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        {profileContext?.profile?.passage_id && (
          <Interests
            passage_id={profileContext?.profile?.passage_id}
            isEditable
            setOpen={setOpen}
          />
        )}
      </Dialog>
    </div>
  );
};
export default ProfileDialog;
