import { Comment as Cmt } from "../assets/types/Comment";
import replyIcon from "../assets/icons/icon-reply.svg";
import CommentScore from "./CommentScore";

type CommentProps = {
  comment: Cmt;
};

export default function Comment({ comment }: CommentProps) {
  return (
    <div className="flex gap-5 items-start border max-w-[40rem] p-5">
      <div>
        <CommentScore cmtId={comment.id} score={comment.score} />
      </div>
      <section>
        <header className="flex gap-3">
          <img className="w-8 h-8" src={comment.user.image.png} alt="user" />
          <span className="font-bold text-neutral-darkblue">{comment.user.username}</span>
          <span className="text-neutral-grayishBlue">{comment.createdAt}</span>
          <div className="flex items-center ml-auto">
            <img src={replyIcon} alt="replyicon" />
            <span>Reply</span>
          </div>
        </header>
        <p className="">{comment.content}</p>
      </section>
    </div>
  );
}
