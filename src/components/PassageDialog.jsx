import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import "@passageidentity/passage-elements/passage-register";
import "@passageidentity/passage-elements/passage-login";

const PassageDialog = ({ open, setOpen, type }) => {
  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        {type === "register" ? (
          <div className="form-container">
            <passage-register app-id={process.env.REACT_APP_PASSAGE_APP_ID} />
          </div>
        ) : (
          <div className="form-container">
            <passage-login app-id={process.env.REACT_APP_PASSAGE_APP_ID} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
export default PassageDialog;
