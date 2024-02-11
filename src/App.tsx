import { FormEvent, useState } from "react";
import jsonData from "./assets/data.json";
import Comment from "./components/Comment";
import { User } from "./assets/types/User";
import { Comment as Cmt } from "./assets/types/Comment";

function App() {
  const currentUser: User = jsonData.currentUser;
  const [comments, setComments] = useState<Cmt[]>(jsonData.comments);

  const handleNewComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const commentInput = e.currentTarget.elements.namedItem(
      "comment"
    ) as HTMLInputElement;

    const content = commentInput.value;
    const id = comments.length + 1;

    const newComment = new Cmt(id, content, currentUser);

    setComments((comments) => [...comments, newComment]);
  };

  return (
    <main>
      <div>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
      <form onSubmit={handleNewComment}>
        <input name="comment" className="border" type="text" />
        <input type="submit" value="send" />
      </form>
    </main>
  );
}

export default App;
