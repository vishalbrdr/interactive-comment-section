import React, { createContext } from "react";
import { User } from "../../assets/types/User";
import data from "../../assets/data.json";

type UserContextProviderProps = {
  children: React.ReactNode;
};

export const UserContext = createContext<User | null>(null);

export default function UserContextProvider({
  children,
}: UserContextProviderProps) {
  const currentUser = data.currentUser;

  return (
    <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
  );
}
