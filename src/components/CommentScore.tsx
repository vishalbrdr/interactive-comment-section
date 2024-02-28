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
    <div className="flex rounded-md sm:flex-col bg-neutral-veryLightGray w-8 max-sm:w-auto max-sm:py-1">
      <button
        className="h-7 hover:text-primary-blue grid place-items-center w-full max-sm:w-8"
        onClick={() => updateCommentScore(comment, "+")}
      >
        <img src={plusIcon} alt="upvote" />
      </button>
      <div className="text-center max-sm:w-8 text-primary-blue font-bold">
        {comment[1]?.score || comment[0].score}
      </div>
      <button
        className="h-7 w-full grid max-sm:w-8 place-items-center"
        onClick={() => updateCommentScore(comment, "-")}
      >
        <img src={minusIcon} alt="upvote" />
      </button>
    </div>
  );
}

export default CommentScore;
