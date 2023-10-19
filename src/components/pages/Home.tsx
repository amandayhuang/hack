import React, { useState, useContext } from "react";
import PageWrapper from "../pages/PageWrapper";
import { Box, Typography, Button, Avatar, IconButton } from "@mui/material";
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
      <Avatar
        src={`https:/images.ctfassets.net/po2c06fb2ov2/5375hP3jfHw8or2kcKN4IL/6d8a09f403f9c67878560a07ed36f171/VuROcseNn3DxYxSSrlsNcTLO`}
        // sx={{ width: 80, height: 80 }}
      >
        {"ME"}
      </Avatar>

      <IconButton onClick={() => null} sx={{ p: 0 }}>
        <Avatar
          alt={profileContext?.profile?.email || ""}
          src={`https:/images.ctfassets.net/po2c06fb2ov2/5375hP3jfHw8or2kcKN4IL/6d8a09f403f9c67878560a07ed36f171/VuROcseNn3DxYxSSrlsNcTLO`}
        >
          {profileContext?.profile?.email
            ? profileContext?.profile?.email.slice(0, 1)
            : undefined}
        </Avatar>
      </IconButton>
    </PageWrapper>
  );
};

export default Home;
