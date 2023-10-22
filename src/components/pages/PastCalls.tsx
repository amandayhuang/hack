import React, { useState, useContext, useEffect } from "react";
import PageWrapper from "./PageWrapper";
import {
  Box,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import "@passageidentity/passage-elements/passage-profile";
import { ProfileContext } from "../../context/ProfileContext";
import { getMatchNotes } from "../../services/match";
import { useQuery } from "react-query";
import { MatchNote } from "../../types";
import moment from "moment";

const PastCalls = () => {
  const [matchNotes, setMatchNotes] = useState<MatchNote[] | null>(null);
  const profileContext = useContext(ProfileContext);

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
    if (profileContext?.profile?.match_id) {
      getMatchNotesQuery();
    }
  }, [getMatchNotesQuery, profileContext?.profile?.match_id]);

  return (
    <PageWrapper>
      <Box display="flex" justifyContent="center">
        <Box className="sizing">
          <Box mb={2}>
            <Typography
              variant="h5"
              className="section-header"
            >{`past calls`}</Typography>
            {matchNotes && matchNotes.length > 0 ? (
              <Box mt={3}>
                <TableContainer component={Paper}>
                  <Table sx={{ maxWidth: 350 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Date </TableCell>
                        <TableCell align="right">Notes</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {matchNotes.map((row) => (
                        <TableRow
                          key={`${row.dt_created}`}
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                            },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {moment(row.dt_created).format("MMM DD, YYYY")}
                          </TableCell>
                          <TableCell align="right">{row.note}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            ) : (
              <Box mt={3}>
                <Typography style={{ fontStyle: "italic" }}>
                  no calls yet
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </PageWrapper>
  );
};

export default PastCalls;
