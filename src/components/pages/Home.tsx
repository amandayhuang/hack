import React, { useState, useContext, useEffect } from "react";
import PageWrapper from "../pages/PageWrapper";
import { Box, Typography, Button } from "@mui/material";
import PassageDialog from "../PassageDialog";
import { ProfileContext } from "../../context/ProfileContext";
import ProfileDialog from "../ProfileDialog";
import AlertDialog from "../AlertDialog";
import MatchDialog from "../MatchDialog";
import { getMatch, getMatchNotes } from "../../services/match";
import { useQuery } from "react-query";
import { Profile, MatchNote } from "../../types";
import Interests from "../Interests";
import { daysSinceDate } from "../../services/util";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openMatch, setOpenMatch] = useState(false);
  const [type, setType] = useState<string | null>(null);
  const profileContext = useContext(ProfileContext);
  const navigate = useNavigate();
  const [match, setMatch] = useState<Profile | null>(null);
  const [showMatch, setShowMatch] = useState(false);
  const [matchNotes, setMatchNotes] = useState<MatchNote[] | null>(null);
  const [daysSinceLastCall, setDaysSinceLastCall] = useState<number | null>(
    null
  );
  const { refetch: getMatchQuery } = useQuery(
    "get-match",
    async () => {
      if (profileContext?.profile?.passage_id) {
        return await getMatch({
          passage_id: profileContext?.profile?.passage_id,
        });
      }
    },
    {
      enabled: false,
      onSuccess: (data) => {
        setMatch(data);
        setShowMatch(true);
      },
    }
  );

  const { refetch: getMatchNotesQuery } = useQuery(
    "get-match-notes",
    async () => {
      if (profileContext?.profile?.match_id) {
        return await getMatchNotes({
          match_id: profileContext?.profile?.match_id,
        });
      }
    },
    {
      enabled: false,
      onSuccess: (data) => {
        setMatchNotes(data.notes);
      },
    }
  );

  useEffect(() => {
    if (profileContext?.profile?.passage_id) {
      getMatchQuery();
    }
  }, [getMatchQuery, profileContext?.profile?.passage_id]);

  useEffect(() => {
    if (profileContext?.profile?.match_id) {
      getMatchNotesQuery();
    }
  }, [getMatchNotesQuery, profileContext?.profile?.match_id]);

  useEffect(() => {
    setDaysSinceLastCall(
      matchNotes && matchNotes.length > 0
        ? daysSinceDate(matchNotes[0].dt_created)
        : null
    );
  }, [matchNotes]);

  const handleOpenPassage = (passageType: "login" | "register") => {
    setType(passageType);
    setOpen(true);
  };

  const handleGetMatch = () => {
    setOpenAlert(false);
    setOpenMatch(true);
  };

  return (
    <PageWrapper>
      <Box display="flex" justifyContent="center">
        <Box className="sizing">
          <Box mb={2}>
            <Typography variant="h5" className="section-header">
              {match && profileContext?.profile ? `my match` : "get started"}
            </Typography>
            {(!match || !profileContext?.profile) && (
              <Box mt={2}>
                <Typography>
                  Phone a Friend connects volunteers with individuals at risk of
                  social isolation. Make one phone call a week and make a new
                  friend.
                </Typography>
              </Box>
            )}
            {match && showMatch && profileContext?.profile && (
              <Box mt={3}>
                <Interests
                  isEditable={false}
                  passage_id={match.passage_id}
                  setShowMatch={setShowMatch}
                  daysSinceLastCall={daysSinceLastCall}
                />
                {matchNotes && (
                  <Box m={2} display="flex" alignItems="center">
                    <Typography>{`You've completed ${matchNotes.length} ${
                      matchNotes.length === 1 ? "call" : "calls"
                    }.`}</Typography>{" "}
                    <Box ml={2}>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => navigate("/calls")}
                      >
                        View
                      </Button>
                    </Box>
                  </Box>
                )}
              </Box>
            )}

            <Box mt={3}>
              {!profileContext?.profile && (
                <Button
                  variant="contained"
                  onClick={() => handleOpenPassage("register")}
                  style={{ marginRight: "20px" }}
                >
                  Sign Up
                </Button>
              )}
              {!profileContext?.profile && (
                <Button
                  variant="contained"
                  onClick={() => handleOpenPassage("login")}
                >
                  Login
                </Button>
              )}
              {profileContext?.profile &&
                !profileContext.profile.description && (
                  <Button
                    variant="contained"
                    onClick={() => setOpenProfile(true)}
                  >
                    Build Profile
                  </Button>
                )}
              {profileContext?.profile &&
                profileContext.profile.description &&
                !match && (
                  <Button
                    variant="contained"
                    onClick={() => setOpenAlert(true)}
                  >
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
        buttonClickHandler={handleGetMatch}
        title="Get Matched"
        isLoading={false}
      />
      {profileContext?.profile?.passage_id && (
        <MatchDialog
          open={openMatch}
          setOpen={setOpenMatch}
          passage_id={profileContext?.profile?.passage_id}
          setShowMatch={setShowMatch}
        />
      )}
    </PageWrapper>
  );
};

export default Home;
