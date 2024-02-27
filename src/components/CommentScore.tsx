import plusIcon from "../assets/icons/icon-plus.svg";
import minusIcon from "../assets/icons/icon-minus.svg";
import { useCommentContext } from "../context/CommentContext/useCommentContext";
import { Comment, Reply } from "../assets/types/Comment";
type CommentScoreProps = {
  comment: [Comment, Reply?];
};

function CommentScore({ comment }: CommentScoreProps) {
  const { updateCommentScore } = useCommentContext();
  return (
    <div className="flex rounded-md flex-col bg-neutral-veryLightGray w-8">
      <button
        className="h-7 hover:text-primary-blue grid place-items-center w-full"
        onClick={() => updateCommentScore(comment, "+")}
      >
        <img src={plusIcon} alt="upvote" />
      </button>
      <div className="text-center text-primary-blue font-bold">
        {comment[1]?.score || comment[0].score}
      </div>
      <button
        className="h-7 w-full grid place-items-center"
        onClick={() => updateCommentScore(comment, "-")}
      >
        <img src={minusIcon} alt="upvote" />
      </button>
    </div>
  );
}

export default CommentScore;
