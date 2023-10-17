import React, { useState } from "react";
import { Profile } from "../types";

type ProfileContextProviderProps = {
  children: React.ReactNode;
};

type ProfileContextType = {
  profile: Profile | null;
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
};

export const ProfileContext = React.createContext<ProfileContextType | null>(
  null
);

export const ProfileContextProvider = ({
  children,
}: ProfileContextProviderProps) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
