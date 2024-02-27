import { FormEvent, useEffect, useRef } from "react";
import { useCommentContext } from "../context/CommentContext/useCommentContext";
import { useUserContext } from "../context/UserContext/useUserContext";
import { Comment as Cmt, Reply } from "../assets/types/Comment";

type CommentFormProps = {
  commentType: "comment" | "reply";
  comment?: Cmt;
  replyingTo?: string;
  setIsReplying?: React.Dispatch<React.SetStateAction<boolean>>;
};

function CommentForm({
  commentType,
  comment,
  replyingTo,
  setIsReplying,
}: CommentFormProps) {
  const input = useRef<HTMLTextAreaElement>(null);
  const currentUser = useUserContext();
  const { comments, addNewComment, addNewReply } = useCommentContext();

  useEffect(() => {
    if (commentType === "reply" && input.current) input.current.focus();
  });

  const handleNewComment = () => {
    const content = input.current?.value;
    const id = comments.length + 1;
    const newComment = new Cmt(id, content!, currentUser);
    addNewComment(newComment);
  };

  const handleNewReply = () => {
    if (!comment?.id) return console.error("No reply data");
    const content = input.current?.value;
    const id = comment.replies.length;
    const newReply = new Reply(
      id,
      content!,
      currentUser,
      replyingTo || comment.user.username
    );
    addNewReply(newReply, comment.id);
    if (setIsReplying) setIsReplying(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.current) return;
    if (input.current.value.trim() === "") return;
    if (commentType === "comment") handleNewComment();
    if (commentType === "reply") handleNewReply();
    input.current.value = "";
  };

  return (
    <form
      className="flex max-sm:flex-col p-3 rounded-lg gap-4 items-start bg-neutral-white justify-start"
      onSubmit={handleSubmit}
    >
      <div className="max-sm:hidden">
        <img className="w-10" src={currentUser.image.png} alt="user-display" />
      </div>
      <textarea
        className="resize-none  text-neutral-grayishBlue outline-none p-2 border-2 rounded-md grow border-neutral-lightGray hover:border-primary-blue focus:border-primary-blue transition-colors duration-300 ease-in-out w-full"
        ref={input}
        name="comment"
        rows={3}
        onBlur={() => {
          if (setIsReplying) setIsReplying(false);
        }}
        placeholder={
          commentType === "reply"
            ? `reply to @${replyingTo || comment?.user.username}`
            : "Add a comment..."
        }
      />
      <button
        type="submit"
        className="max-sm:hidden bg-primary-blue hover:bg-primary-grayishBlue focus:bg-primary-grayishBlue text-neutral-white px-4 py-2 uppercase rounded"
      >
        {commentType === "comment" ? "send" : "reply"}
      </button>

      {/* mobile view code start*/}
      <div className="sm:hidden flex justify-between w-full">
        <div>
          <img
            className="w-10"
            src={currentUser.image.png}
            alt="user-display"
          />
        </div>
        <button
          type="submit"
          className="bg-primary-blue hover:bg-primary-grayishBlue focus:bg-primary-grayishBlue text-neutral-white px-4 py-2 uppercase rounded"
        >
          {commentType === "comment" ? "send" : "reply"}
        </button>
      </div>
      {/* mobile view code end*/}
    </form>
  );
}

export default CommentForm;
