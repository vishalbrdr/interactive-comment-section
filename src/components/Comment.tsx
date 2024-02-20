import { Comment as Cmt } from "../assets/types/Comment";
import replyIcon from "../assets/icons/icon-reply.svg";
import editIcon from "../assets/icons/icon-edit.svg";
import deleteIcon from "../assets/icons/icon-delete.svg";
import CommentScore from "./CommentScore";
import { User } from "../assets/types/User";
import { useUserContext } from "../context/UserContext/useUserContext";

type CommentProps = {
  comment: Cmt;
};

export default function Comment({ comment }: CommentProps) {
  return (
    <div>
      <div className="flex rounded-md bg-neutral-white gap-5 items-start p-5">
        <div>
          <CommentScore cmtId={comment.id} score={comment.score} />
        </div>
        <section>
          <div className="space-y-3">
            <Header user={comment.user} createdAt={comment.createdAt} />
            <p>{comment.content}</p>
          </div>
        </section>
      </div>
      <div className="border-l-2 ml-9 space-y-5 border-neutral-lightGray">
        {comment.replies.map((reply) => (
          <div className="flex rounded-md my-5 p-5 bg-neutral-white ml-9 gap-4">
            <div>
              <CommentScore cmtId={comment.id} score={reply.score} />
            </div>
            <div className="mt-2 space-y-3">
              <Header user={reply.user} createdAt={reply.createdAt} />
              <p>
                <span className="text-primary-blue font-bold">
                  @{reply.replyingTo}
                </span>{" "}
                {reply.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Header({ user, createdAt }: { user: User; createdAt: string }) {
  const { username } = useUserContext();
  const renderOptions = () => {
    if (user.username === username) {
      return (
        <div className="flex gap-4 ml-auto">
          <div className="flex items-baseline ml-auto gap-1">
            <img src={deleteIcon} alt="deleteIcon" />
            <span>Delete</span>
          </div>
          <div className="flex items-baseline ml-auto gap-1">
            <img src={editIcon} alt="editIcon" />
            <span>Edit</span>
          </div>
        </div>
      );
    }
    return (
      <div className="flex items-baseline ml-auto gap-1">
        <img src={replyIcon} alt="replyicon" />
        <span>Reply</span>
      </div>
    );
  };
  return (
    <header className="flex w-full gap-3">
      <img className="w-8 h-8" src={user.image.png} alt="user" />
      <span className="font-bold text-neutral-darkblue">{user.username}</span>
      <span className="text-neutral-grayishBlue">{createdAt}</span>
      {renderOptions()}
    </header>
  );
}
