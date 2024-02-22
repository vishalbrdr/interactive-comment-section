import { FormEvent, useRef } from "react";
import Comment from "./components/Comment";
import { Comment as Cmt } from "./assets/types/Comment";
import { useUserContext } from "./context/UserContext/useUserContext";
import { useCommentContext } from "./context/CommentContext/useCommentContext";

function App() {
  const currentUser = useUserContext();
  const { comments, addNewComment } = useCommentContext();

  const newCommentInput = useRef<HTMLTextAreaElement>(null);

  const handleNewComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newCommentInput.current) return;
    if (newCommentInput.current.value.trim() === "") return;
    const content = newCommentInput.current?.value;
    const id = comments.length + 1;
    const newComment = new Cmt(id, content!, currentUser);
    addNewComment(newComment);
    newCommentInput.current.value = "";
  };

  return (
    <main className="min-h-screen py-10">
      <div className="w-fit mx-auto">
        <div className="w-[40rem] space-y-5 my-5">
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
        <form
          className="flex p-3 gap-4 items-start bg-neutral-white justify-start"
          onSubmit={handleNewComment}
        >
          <div>
            <img
              className="h-8"
              src={currentUser.image.png}
              alt="user-display"
            />
          </div>
          <textarea
            className="resize-none text-neutral-grayishBlue outline-none p-2 border-2 rounded-md grow border-neutral-lightGray hover:border-primary-blue focus:border-primary-blue transition-colors duration-300 ease-in-out w-full"
            ref={newCommentInput}
            name="comment"
            rows={3}
            placeholder="Add a comment..."
          />
          <button
            type="submit"
            className="bg-primary-blue hover:bg-primary-grayishBlue focus:bg-primary-grayishBlue text-neutral-white px-4 py-2 uppercase rounded"
          >
            send
          </button>
        </form>
      </div>
    </main>
  );
}

export default App;
