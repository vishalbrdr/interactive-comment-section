import { FormEvent, useRef, useState } from "react";
import jsonData from "./assets/data.json";
import Comment from "./components/Comment";
import { Comment as Cmt } from "./assets/types/Comment";
import { useUserContext } from "./context/UserContext/useUserContext";

function App() {
  const currentUser = useUserContext();

  const [comments, setComments] = useState<Cmt[]>(jsonData.comments);

  const newCommentInput = useRef<HTMLInputElement>(null);

  const handleNewComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newCommentInput.current) return;
    if (newCommentInput.current.value.trim() === "") return;

    const content = newCommentInput.current?.value;
    const id = comments.length + 1;
    const newComment = new Cmt(id, content!, currentUser);

    setComments((comments) => [...comments, newComment]);

    newCommentInput.current.value = "";
  };

  return (
    <main className="border container">
      <div className="border">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
      <form onSubmit={handleNewComment}>
        <input ref={newCommentInput} name="comment" className="border" />
        <input type="submit" value="send" />
      </form>
    </main>
  );
}

export default App;
