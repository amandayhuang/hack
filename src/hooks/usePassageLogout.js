import { Passage } from "@passageidentity/passage-js";

export const usePassageLogout = () => {
  const passage = new Passage(process.env.REACT_APP_PASSAGE_APP_ID);
  const session = passage.getCurrentSession();

  const logout = () => {
    session.signOut();
  };

  return { logout };
};
