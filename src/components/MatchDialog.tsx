import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  CircularProgress,
} from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import { createMatch } from "../services/match";

type Props = {
  passage_id: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setShowMatch: React.Dispatch<React.SetStateAction<boolean>>;
};

const MatchDialog = ({ open, setOpen, passage_id, setShowMatch }: Props) => {
  const queryClient = useQueryClient();
  const [match, setMatch] = useState<any>(null);
  const [matchError, setMatchError] = useState(false);
  const { isLoading, mutate: createMatchMutation } = useMutation(
    async () => {
      return await createMatch({ passage_id });
    },
    {
      onSuccess: (data) => {
        setMatch(data);
        if (data?.first_name) {
          setShowMatch(true);
        } else {
          setMatchError(true);
        }
        queryClient.fetchQuery("get-profile");
        queryClient.fetchQuery("get-match");
      },
    }
  );

  useEffect(() => {
    if (open) {
      createMatchMutation();
    }
  }, [createMatchMutation, open]);

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>Match</Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          {isLoading && (
            <Typography>
              <CircularProgress />
              Finding the Perfect Match
            </Typography>
          )}
          {!isLoading && match && (
            <Typography>{`👻 You've been matched with ${match?.first_name} ${match?.last_name}!`}</Typography>
          )}
          {!isLoading && matchError && (
            <Typography>{`Sorry we're unable to match you right now. Try again later.`}</Typography>
          )}
        </DialogContent>
        <DialogActions>
          {match && (
            <Box>
              <Box display="flex" width="100%" alignItems="center">
                <Button onClick={() => setOpen(false)} variant="contained">
                  Learn More
                </Button>
              </Box>
            </Box>
          )}
          {matchError && (
            <Box>
              <Box display="flex" width="100%" alignItems="center">
                <Button onClick={() => setOpen(false)} variant="contained">
                  Close
                </Button>
              </Box>
            </Box>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default MatchDialog;
