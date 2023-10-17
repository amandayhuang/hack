import axios from "axios";
import { headers } from ".";

type ProfileInput = {
  passage_id: string;
  email: string;
};

export const getProfile = async (profile: ProfileInput) => {
  const dbProfile = await axios.post("/.netlify/functions/getProfile", {
    data: JSON.stringify(profile),
    headers,
  });
  return dbProfile.data;
};
