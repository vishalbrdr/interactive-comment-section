import React, { createContext, useState } from "react";
import data from "../../assets/data.json";
import { Comment } from "../../assets/types/Comment";
type CommentContextProviderProps = {
  children: React.ReactNode;
};

type CommentContextProps = {
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

export const CommmentContext = createContext<CommentContextProps | null>(null);
export default function CommentContextProvider({
  children,
}: CommentContextProviderProps) {
  const [comments, setComments] = useState(data.comments);

  const value = { 
    comments,
    setComments,
  };

  return (
    <CommmentContext.Provider value={value}>
      {children}
    </CommmentContext.Provider>
  );
}
