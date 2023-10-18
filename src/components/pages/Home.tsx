import React, { useState, useContext } from "react";
import PageWrapper from "../pages/PageWrapper";
import { Box, Typography, Button } from "@mui/material";
import PassageDialog from "../PassageDialog";
import { ProfileContext } from "../../context/ProfileContext";
import ProfileDialog from "../ProfileDialog";
import AlertDialog from "../AlertDialog";
import MatchDialog from "../MatchDialog";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openMatch, setOpenMatch] = useState(false);
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
              {profileContext?.profile &&
                !profileContext.profile.description && (
                  <Button
                    variant="outlined"
                    onClick={() => setOpenProfile(true)}
                  >
                    Build Profile
                  </Button>
                )}
              {profileContext?.profile &&
                profileContext.profile.description && (
                  <Button variant="outlined" onClick={() => setOpenAlert(true)}>
                    Get Matched
                  </Button>
                )}
            </Box>
          </Box>
        </Box>
      </Box>

      {type && <PassageDialog open={open} setOpen={setOpen} type={type} />}
      <ProfileDialog open={openProfile} setOpen={setOpenProfile} />
      <AlertDialog
        open={openAlert}
        setOpen={setOpenAlert}
        buttonText={"Confirm"}
        content={
          "Are you ready to be matched? You'll be paired immediately and will be expected to make one call per week."
        }
        buttonClickHandler={() => setOpenMatch(true)}
        title="Get Matched"
        isLoading={false}
      />
      <MatchDialog open={openMatch} setOpen={setOpenMatch} />
    </PageWrapper>
  );
};

export default Home;
