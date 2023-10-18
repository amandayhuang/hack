import axios from "axios";
import { headers } from ".";

type ProfileInput = {
  passage_id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
};

type InterestInput = {
  passage_id: string;
  interests: number[];
};

type GetInterestInput = {
  passage_id: string;
};

export const getProfile = async (profile: ProfileInput) => {
  const dbProfile = await axios.post("/.netlify/functions/getProfile", {
    data: JSON.stringify(profile),
    headers,
  });
  return dbProfile.data;
};

export const updateInterests = async (input: InterestInput) => {
  const dbProfile = await axios.post("/.netlify/functions/updateInterests", {
    data: JSON.stringify(input),
    headers,
  });
  return dbProfile.data;
};

export const getInterests = async (input: GetInterestInput) => {
  const interests = await axios.post("/.netlify/functions/getInterests", {
    data: JSON.stringify(input),
    headers,
  });
  return interests.data;
};
