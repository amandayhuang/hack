import React, { useState, useContext } from "react";
import PageWrapper from "../pages/PageWrapper";
import { Box, Typography, Button } from "@mui/material";
import PassageDialog from "../PassageDialog";
import { ProfileContext } from "../../context/ProfileContext";
import ProfileDialog from "../ProfileDialog";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [type, setType] = useState<string | null>(null);
  const profileContext = useContext(ProfileContext);

  const handleOpenPassage = (passageType: "login" | "register") => {
    setType(passageType);
    setOpen(true);
  };

  return (
    <PageWrapper>
      <Box display="flex" justifyContent="center">
        <Box className="sizing">
          <Box mb={2}>
            <Typography
              variant="h5"
              className="section-header"
            >{`phone a friend`}</Typography>
            <Box mt={3}>
              {!profileContext?.profile && (
                <Button
                  variant="outlined"
                  onClick={() => handleOpenPassage("register")}
                  style={{ marginRight: "20px" }}
                >
                  Sign Up
                </Button>
              )}
              {!profileContext?.profile && (
                <Button
                  variant="outlined"
                  onClick={() => handleOpenPassage("login")}
                >
                  Login
                </Button>
              )}
              {profileContext?.profile && (
                <Button variant="outlined" onClick={() => setOpenProfile(true)}>
                  Build Profile
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      {type && <PassageDialog open={open} setOpen={setOpen} type={type} />}
      <ProfileDialog open={openProfile} setOpen={setOpenProfile} />
    </PageWrapper>
  );
};

export default Home;
