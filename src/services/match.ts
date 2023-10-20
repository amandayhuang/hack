import axios from "axios";
import { headers } from ".";

type MatchInput = {
  passage_id: string;
};

type MatchNoteInput = {
  match_id: number;
  note: string;
};

type NoteInput = {
  match_id: number;
};

export const createMatch = async (input: MatchInput) => {
  const match = await axios.post("/.netlify/functions/createMatch", {
    data: JSON.stringify(input),
    headers,
  });
  return match.data;
};

export const getMatch = async (input: MatchInput) => {
  const match = await axios.post("/.netlify/functions/getMatch", {
    data: JSON.stringify(input),
    headers,
  });
  return match.data;
};

export const createMatchNote = async (input: MatchNoteInput) => {
  const matchNote = await axios.post("/.netlify/functions/createMatchNote", {
    data: JSON.stringify(input),
    headers,
  });
  return matchNote.data;
};

export const getMatchNotes = async (input: NoteInput) => {
  const matchNotes = await axios.post("/.netlify/functions/getMatchNotes", {
    data: JSON.stringify(input),
    headers,
  });
  return matchNotes.data;
};
