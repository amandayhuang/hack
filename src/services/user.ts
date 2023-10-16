import axios from "axios";
import { headers } from "./";

type UserInput = {
  auth0_id: string;
  email: string;
};

type NameInput = {
  auth0_id: string;
  display_name: string;
};

interface InviteInput {
  inviter_auth0_id: string;
  email: string;
  status: string;
  id?: string;
}

type IdInput = {
  auth0_id: string | undefined;
};

type WinnerInput = {
  auth0_id: string;
  winner_source_team_id: number;
  is_winner_points_eligible: boolean;
};

export const getUser = async (user: UserInput) => {
  const dbUser = await axios.post("/.netlify/functions/getUser", {
    data: JSON.stringify(user),
    headers,
  });
  return dbUser.data;
};

export const updateDisplayName = async (user: NameInput) => {
  const dbUser = await axios.post("/.netlify/functions/updateDisplayName", {
    data: JSON.stringify(user),
    headers,
  });

  return dbUser.data;
};

export const createOrUpdateInvite = async (invite: InviteInput) => {
  const dbInvite = await axios.post(
    "/.netlify/functions/createOrUpdateInvite",
    {
      data: JSON.stringify(invite),
      headers,
    }
  );

  return dbInvite.data;
};

export const getInvites = async (user: UserInput) => {
  const invites = await axios.post("/.netlify/functions/getInvites", {
    data: JSON.stringify(user),
    headers,
  });

  return invites.data;
};

export const getLeaderboard = async (id: IdInput) => {
  const invites = await axios.post("/.netlify/functions/getLeaderboard", {
    data: JSON.stringify(id),
    headers,
  });

  return invites.data;
};

export const saveWinningTeam = async (user: WinnerInput) => {
  const dbUser = await axios.post("/.netlify/functions/saveWinningTeam", {
    data: JSON.stringify(user),
    headers,
  });

  return dbUser.data;
};
