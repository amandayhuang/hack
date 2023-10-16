import axios from "axios";
import { headers } from "./";

type PredictionInput = {
  auth0_id: string;
  source_fixture_id: number;
  winner_source_team_id: number;
  points_bet: number;
  id?: string;
};

type UserInput = {
  auth0_id: string;
};

type CancelInput = {
  id: string;
};

export const createOrUpdatePrediction = async (prediction: PredictionInput) => {
  const resp = await axios.post(
    "/.netlify/functions/createOrUpdatePrediction",
    {
      data: JSON.stringify(prediction),
      headers,
    }
  );

  return resp.data;
};

export const getPredictions = async (user: UserInput) => {
  const predictions = await axios.post("/.netlify/functions/getPredictions", {
    data: JSON.stringify(user),
    headers,
  });

  return predictions.data;
};

export const cancelPrediction = async (prediction: CancelInput) => {
  const resp = await axios.post("/.netlify/functions/cancelPrediction", {
    data: JSON.stringify(prediction),
    headers,
  });

  return resp;
};
