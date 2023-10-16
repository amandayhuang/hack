import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useAuth0Helpers } from "../hooks/useAuth0Helpers";

type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
  title: string;
  description: string;
};

const LoginDialog = ({ open, setOpen, title, description }: Props) => {
  const { handleSignup, handleLogin } = useAuth0Helpers();
  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box> {title} </Box>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography>{description}</Typography>
      </DialogContent>
      <DialogActions>
        <Box display="flex" justifyContent="center" width="100%">
          <Box m={1}>
            <Button onClick={handleSignup} variant="contained">
              Sign up
            </Button>
          </Box>
          <Box m={1}>
            <Button onClick={handleLogin} variant="contained">
              Log in
            </Button>
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
export default LoginDialog;
