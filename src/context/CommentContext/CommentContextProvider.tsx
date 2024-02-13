import React, { createContext, useState } from "react";
import data from "../../assets/data.json";
import { Comment } from "../../assets/types/Comment";
type CommentContextProviderProps = {
  children: React.ReactNode;
};

type CommentContextProps = {
  comments: Comment[];
  addNewComment: (newComment: Comment) => void;
};

export const CommmentContext = createContext<CommentContextProps | null>(null);
export default function CommentContextProvider({
  children,
}: CommentContextProviderProps) {
  const [comments, setComments] = useState(data.comments);

  const addNewComment = (newComment: Comment) => {
    setComments((prev) => [...prev, newComment]);
  };

  const value = {
    comments,
    addNewComment,
  };

  return (
    <CommmentContext.Provider value={value}>
      {children}
    </CommmentContext.Provider>
  );
}
