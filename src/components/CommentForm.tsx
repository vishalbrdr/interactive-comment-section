import { FormEvent, useRef } from "react";
import { useCommentContext } from "../context/CommentContext/useCommentContext";
import { useUserContext } from "../context/UserContext/useUserContext";
import { Comment as Cmt } from "../assets/types/Comment";

type CommentFormProps = {
  commentType: "comment" | "reply";
  replyData?: { replyingTo: string; cmtId: number };
};

function CommentForm({ commentType }: CommentFormProps) {
  const input = useRef<HTMLTextAreaElement>(null);
  const currentUser = useUserContext();
  const { comments, addNewComment } = useCommentContext();

  const handleNewComment = () => {
    const content = input.current?.value;
    const id = comments.length + 1;
    const newComment = new Cmt(id, content!, currentUser);
    addNewComment(newComment);
  };

  const handleNewReply = () => {

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
      className="flex p-3 gap-4 items-start bg-neutral-white justify-start"
      onSubmit={handleSubmit}
    >
      <div>
        <img className="w-10" src={currentUser.image.png} alt="user-display" />
      </div>
      <textarea
        className="resize-none text-neutral-grayishBlue outline-none p-2 border-2 rounded-md grow border-neutral-lightGray hover:border-primary-blue focus:border-primary-blue transition-colors duration-300 ease-in-out w-full"
        ref={input}
        name="comment"
        rows={3}
        placeholder="Add a comment..."
      />
      <button
        type="submit"
        className="bg-primary-blue hover:bg-primary-grayishBlue focus:bg-primary-grayishBlue text-neutral-white px-4 py-2 uppercase rounded"
      >
        {commentType === "comment" ? "send" : "reply"}
      </button>
    </form>
  );
}

export default CommentForm;
