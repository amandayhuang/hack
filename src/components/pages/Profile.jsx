import React, { useState, useContext } from "react";
import PageWrapper from "./PageWrapper";
import { Box, Typography, Button } from "@mui/material";
import "@passageidentity/passage-elements/passage-profile";
import ProfileDialog from "../ProfileDialog";
import { ProfileContext } from "../../context/ProfileContext";
import PassageDialog from "../PassageDialog";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const profileContext = useContext(ProfileContext);

  if (!profileContext?.profile) {
    return (
      <PageWrapper>
        <Box display="flex" justifyContent="center">
          <Box className="sizing">
            <Box mb={2}>
              <Typography
                variant="h5"
                className="section-header"
              >{`my profile`}</Typography>
              <Box mt={3}>
                <Button variant="contained" onClick={() => setOpen(true)}>
                  Log In
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
        <PassageDialog open={open} setOpen={setOpen} type={"login"} />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Box display="flex" justifyContent="center">
        <Box className="sizing">
          <Box mb={2}>
            <Typography
              variant="h5"
              className="section-header"
            >{`my profile`}</Typography>
            <Box mt={3}>
              <Button variant="contained" onClick={() => setOpen(true)}>
                Update Interests & Photo
              </Button>
            </Box>
            <Box mt={3}>
              <div className="form-container">
                <passage-profile
                  app-id={process.env.REACT_APP_PASSAGE_APP_ID}
                />
              </div>
            </Box>
          </Box>
        </Box>
        <ProfileDialog open={open} setOpen={setOpen} />
      </Box>
    </PageWrapper>
  );
};

export default Profile;
