import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  buttonText?: string;
  buttonClickHandler?: () => void;
  content: React.ReactNode | string;
  title: string;
  isLoading: boolean;
  href?: string;
};

const AlertDialog = ({
  open,
  setOpen,
  buttonText,
  buttonClickHandler,
  content,
  title,
  isLoading,
  href,
}: Props) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box> {title} </Box>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Box display="flex" justifyContent="center" width="100%">
          <Box m={1}>
            <Button onClick={handleClose} variant="outlined">
              Close
            </Button>
          </Box>
          {buttonClickHandler && buttonText && (
            <Box m={1}>
              <Button
                onClick={buttonClickHandler}
                variant="contained"
                disabled={isLoading}
                href={href || undefined}
              >
                {isLoading && (
                  <CircularProgress
                    color="inherit"
                    className="spinner"
                    size="1rem"
                  />
                )}
                {buttonText}
              </Button>
            </Box>
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
