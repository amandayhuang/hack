import axios from "axios";
import { headers } from "./";

export const getPlayerList = async () => {
  const players = await axios.post("/.netlify/functions/getPlayers", {
    headers,
  });

  return players.data;
};
