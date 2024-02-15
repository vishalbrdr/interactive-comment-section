import React, { createContext, useState } from "react";
import data from "../../assets/data.json";
import { Comment } from "../../assets/types/Comment";
type CommentContextProviderProps = {
  children: React.ReactNode;
};

type CommentContextProps = {
  comments: Comment[];
  addNewComment: (newComment: Comment) => void;
  editComment: (cmt: Comment) => void;
  deleteComment: (cmtId: number) => void;
};

export const CommmentContext = createContext<CommentContextProps | null>(null);
export default function CommentContextProvider({
  children,
}: CommentContextProviderProps) {
  const [comments, setComments] = useState(data.comments);

  const addNewComment = (newComment: Comment) => {
    setComments((prev) => [...prev, newComment]);
  };

  const editComment = (cmt: Comment) => {
    const newCommentArr = comments.map((c) => {
      if (cmt.id !== c.id) return cmt;
      return { ...c, content: cmt.content };
    });
    setComments(newCommentArr);
  };

  const deleteComment = (id: number) => {
    const newCommentArr = comments.filter((c) => c.id !== id);
    setComments(newCommentArr);
  };

  const value = {
    comments,
    addNewComment,
    editComment,
    deleteComment,
  };

  return (
    <CommmentContext.Provider value={value}>
      {children}
    </CommmentContext.Provider>
  );
}