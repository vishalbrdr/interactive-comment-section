import { useContext } from "react";
import { CommmentContext } from "./CommentContextProvider";

export function useCommentContext() {
  const context = useContext(CommmentContext);
  if (!context)
    throw new Error("useCommentContext must be used within a UserContextProvider");
  return context;
}
