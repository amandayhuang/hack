import axios from "axios";
import { headers } from "./";

export const getCompetition = async () => {
  const comp = await axios.post("/.netlify/functions/getCompetition", {
    headers,
  });

  return comp.data;
};
