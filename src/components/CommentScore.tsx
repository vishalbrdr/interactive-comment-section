import plusIcon from "../assets/icons/icon-plus.svg";
import minusIcon from "../assets/icons/icon-minus.svg";
import { useCommentContext } from "../context/CommentContext/useCommentContext";
type CommentScoreProps = {
  cmtId: number;
  score: number;
};

function CommentScore({ cmtId, score }: CommentScoreProps) {
  const { updateCommentScore } = useCommentContext();
  return (
    <div className="flex rounded-md flex-col border w-8">
      <button
        className="h-7 grid place-items-center w-full"
        onClick={() => updateCommentScore(cmtId, "+")}
      >
        <img src={plusIcon} alt="upvote" />
      </button>
      <div className="text-center">{score}</div>
      <button
        className="h-7 w-full grid place-items-center"
        onClick={() => updateCommentScore(cmtId, "-")}
      >
        <img src={minusIcon} alt="upvote" />
      </button>
    </div>
  );
}

export default CommentScore;
