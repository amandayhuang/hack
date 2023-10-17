import React, { useState, useContext } from "react";
import PageWrapper from "../pages/PageWrapper";
import { Box, Typography, Button } from "@mui/material";
import PassageDialog from "../PassageDialog";
import { ProfileContext } from "../../context/ProfileContext";

const Home = () => {
  const [open, setOpen] = useState(false);
  const profileContext = useContext(ProfileContext);

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
                <Button variant="outlined" onClick={() => setOpen(true)}>
                  Sign Up
                </Button>
              )}

              {profileContext?.profile && (
                <Button variant="outlined" onClick={() => null}>
                  Find My Match
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <PassageDialog open={open} setOpen={setOpen} />
    </PageWrapper>
  );
};

export default Home;
