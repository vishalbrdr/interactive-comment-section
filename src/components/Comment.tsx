import { Comment as Cmt } from "../assets/types/Comment";
import replyIcon from "../assets/icons/icon-reply.svg";
import CommentScore from "./CommentScore";

type CommentProps = {
  comment: Cmt;
};

export default function Comment({ comment }: CommentProps) {
  return (
    <div>
      <CommentScore cmtId={comment.id} score={comment.score} />
      <section>
        <header>
          <img src={comment.user.image.png} alt="user" />
          <span>{comment.user.username}</span>
          <span>{comment.createdAt}</span>
          <div>
            <img src={replyIcon} alt="replyicon" />
            <span>Reply</span>
          </div>
        </header>
        <p>{comment.content}</p>
      </section>
    </div>
  );
}
