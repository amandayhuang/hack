import axios from "axios";
import { headers } from "./";

type GroupInput = {
  owner_auth0_id: string;
  name: string;
  description?: string;
  id?: string;
  shouldDelete?: boolean;
};

type MemberInput = {
  auth0_id: string;
  is_owner: boolean;
  code: string;
};

type DeleteMemberInput = {
  auth0_id: string;
  group_id: string;
};

export const createOrUpdateGroup = async (group: GroupInput) => {
  const resp = await axios.post("/.netlify/functions/createOrUpdateGroup", {
    data: JSON.stringify(group),
    headers,
  });

  return resp.data;
};

export const createGroupMember = async (member: MemberInput) => {
  const resp = await axios.post("/.netlify/functions/createGroupMember", {
    data: JSON.stringify(member),
    headers,
  });

  return resp.data;
};

export const deleteGroupMember = async (member: DeleteMemberInput) => {
  const resp = await axios.post("/.netlify/functions/deleteGroupMember", {
    data: JSON.stringify(member),
    headers,
  });

  return resp.data;
};
