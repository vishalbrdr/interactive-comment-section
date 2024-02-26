import React, { createContext, useState } from "react";
import data from "../../assets/data.json";
import { Comment, Reply } from "../../assets/types/Comment";
type CommentContextProviderProps = {
  children: React.ReactNode;
};

type CommentContextProps = {
  comments: Comment[];
  addNewComment: (newComment: Comment) => void;
  editComment: (cmt: Comment) => void;
  deleteComment: (cmtId: number[]) => void;
  updateCommentScore: (cmtId: number, scoreAction: "+" | "-") => void;
  addNewReply: (newReply: Reply, cmtId: number) => void;
  editReply: (newReply: Reply, cmtId: number) => void;
};

export const CommmentContext = createContext<CommentContextProps | null>(null);
export default function CommentContextProvider({
  children,
}: CommentContextProviderProps) {
  const [comments, setComments] = useState(data.comments);

  const addNewComment = (newComment: Comment) => {
    setComments((prev) => [...prev, newComment]);
  };

  const addNewReply = (newReply: Reply, cmtId: number) => {
    const newCommentArr = comments.map((c) => {
      if (c.id !== cmtId) return c;
      return { ...c, replies: [...c.replies, newReply] };
    });
    setComments(newCommentArr);
  };

  const editComment = (cmt: Comment) => {
    const newCommentArr = comments.map((c) => {
      if (cmt.id !== c.id) return c;
      return { ...c, content: cmt.content };
    });
    setComments(newCommentArr);
  };

  const editReply = (newReply: Reply, cmtId: number) => {
    const newCommentArr = comments.map((c) => {
      if (c.id !== cmtId) return c;
      const newReplies = c.replies.map((r) => {
        if (r.id !== newReply.id) return r;
        return newReply;
      });
      return { ...c, replies: newReplies };
    });
    setComments(newCommentArr);
  };

  const updateCommentScore = (cmtId: number, scoreAction: "+" | "-") => {
    const newCommentArr = comments.map((c) => {
      if (c.id !== cmtId) return c;
      if (scoreAction === "-") return { ...c, score: c.score - 1 };
      return { ...c, score: c.score + 1 };
    });
    setComments(newCommentArr);
  };

  const deleteComment = (cmtId: number[]) => {
    if (cmtId.length === 1) {
      const newCommentArr = comments.filter((c) => c.id !== cmtId[0]);
      setComments(newCommentArr);
      return;
    } else if (cmtId.length === 2) {
      const newCommentArr = comments.map((c) => {
        if (c.id !== cmtId[0]) return c;
        const newReplies = c.replies.filter((r) => r.id !== cmtId[1]);
        return { ...c, replies: newReplies };
      });
      setComments(newCommentArr);
    }
  };

  const value = {
    comments,
    addNewComment,
    editComment,
    deleteComment,
    updateCommentScore,
    addNewReply,
    editReply,  
  };

  return (
    <CommmentContext.Provider value={value}>
      {children}
    </CommmentContext.Provider>
  );
}
