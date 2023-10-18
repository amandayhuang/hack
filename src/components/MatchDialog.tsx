import React from "react";
import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  IconButton,
} from "@mui/material";
// import { useMutation, useQueryClient } from "react-query";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MatchDialog = ({ open, setOpen }: Props) => {
  //   const { isLoading, mutate: createPredictionMutation } = useMutation(
  //     async () => {
  //       if (!user?.sub || !winningTeamId || pointsBet === null) return;
  //       const fixtureId = parseInt(fixture.source_fixture_id.toString());
  //       return await createOrUpdatePrediction({
  //         auth0_id: user.sub,
  //         source_fixture_id: fixtureId,
  //         winner_source_team_id: winningTeamId,
  //         points_bet: pointsBet,
  //         id: prediction?.id || undefined,
  //       });
  //     },
  //     {
  //       onSuccess: () => {
  //         setOpen(false);
  //         setOpenAlert(true);
  //         queryClient.fetchQuery("get-user");
  //         queryClient.fetchQuery("get-predictions");
  //       },
  //     }
  //   );

  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box> Match </Box>
            <IconButton aria-label="close" onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="h3">Finding the Perfect Match</Typography>
        </DialogContent>
        <DialogActions>
          <Box>
            <Box display="flex" width="100%" justifyContent="center">
              <Button onClick={() => setOpen(false)} variant="contained">
                Close
              </Button>
            </Box>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default MatchDialog;
