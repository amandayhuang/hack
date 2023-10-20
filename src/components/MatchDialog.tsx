import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import { createMatch } from "../services/match";
import { Orbit } from "@uiball/loaders";

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
          ></Box>
        </DialogTitle>
        <DialogContent>
          {isLoading && (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Orbit size={80} color="#fff689ff" />
              <Typography>Finding the Right Match</Typography>
            </Box>
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
            <Box display="flex" width="100%" justifyContent="center">
              <Button onClick={() => setOpen(false)} variant="contained">
                Learn More
              </Button>
            </Box>
          )}
          {matchError && (
            <Box display="flex" width="100%" justifyContent="center">
              <Button onClick={() => setOpen(false)} variant="contained">
                Close
              </Button>
            </Box>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default MatchDialog;
