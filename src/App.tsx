import Comment from "./components/Comment";
import { useCommentContext } from "./context/CommentContext/useCommentContext";
import CommentForm from "./components/CommentForm";

function App() {
  const { comments } = useCommentContext();

  return (
    <main className="min-h-screen bg-primary-blue px-2 py-10">
      <div className="w-fit  mx-auto">
        <div className="max-w-[40rem]  space-y-5 my-5">
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
        <CommentForm commentType="comment" />
      </div>
    </main>
  );
}

export default App;
