import axios from "axios";
import { headers } from "./";

export const getFixtures = async () => {
  const resp = await axios.post("/.netlify/functions/getFixtures", {
    headers,
  });

  return resp.data;
};

export const getTeamGroups = async () => {
  const resp = await axios.post("/.netlify/functions/getTeamGroups", {
    headers,
  });

  return resp.data;
};

export const getTeams = async () => {
  const resp = await axios.post("/.netlify/functions/getTeams", {
    headers,
  });

  return resp.data;
};
