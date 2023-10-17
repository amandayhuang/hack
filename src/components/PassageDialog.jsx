import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import "@passageidentity/passage-elements/passage-auth";

const PassageDialog = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <div className="form-container">
          <passage-auth app-id={process.env.REACT_APP_PASSAGE_APP_ID} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default PassageDialog;
