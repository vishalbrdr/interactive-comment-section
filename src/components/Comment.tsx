import { Comment as Cmt, Reply as Rpy } from "../assets/types/Comment";
import replyIcon from "../assets/icons/icon-reply.svg";
import editIcon from "../assets/icons/icon-edit.svg";
import deleteIcon from "../assets/icons/icon-delete.svg";
import CommentScore from "./CommentScore";
import { User } from "../assets/types/User";
import { useUserContext } from "../context/UserContext/useUserContext";
import DeleteCommentModal from "./DeleteCommentModal";
import { useRef, useState } from "react";
import CommentForm from "./CommentForm";
import { useCommentContext } from "../context/CommentContext/useCommentContext";

type CommentProps = {
  comment: Cmt;
};

export default function Comment({ comment }: CommentProps) {
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { editComment } = useCommentContext();
  const input = useRef<HTMLTextAreaElement>(null);
  const handleEditComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.current) return;
    if (input.current.value.trim() === "") return;
    const newComment = new Cmt(
      comment.id,
      input.current.value,
      comment.user,
      comment.replies
    );
    editComment(newComment);
    setIsEditing(false);
  };

  return (
    <div>
      <div className="flex rounded-md bg-neutral-white gap-5 items-start p-5">
        <div>
          <CommentScore comment={[comment]} />
        </div>
        <section className="grow">
          <div className="space-y-3">
            <Header
              setIsReplying={setIsReplying}
              setIsEditing={setIsEditing}
              user={comment.user}
              createdAt={comment.createdAt}
              cmtId={[comment.id]}
            />
            {isEditing ? (
              <form
                onSubmit={handleEditComment}
                className="flex flex-col items-end gap-2"
              >
                <textarea
                  className="resize-none text-neutral-grayishBlue outline-none p-2 border-2 rounded-md grow border-neutral-lightGray hover:border-primary-blue focus:border-primary-blue transition-colors duration-300 ease-in-out w-full"
                  ref={input}
                  name="comment"
                  rows={3}
                  placeholder={"Add a comment..."}
                >
                  {comment.content}
                </textarea>
                <button
                  type="submit"
                  className="bg-primary-blue hover:bg-primary-grayishBlue focus:bg-primary-grayishBlue text-neutral-white px-4 py-2 uppercase rounded"
                >
                  update
                </button>
              </form>
            ) : (
              <p className="whitespace-pre-line text-neutral-grayishBlue">
                {comment.content}
              </p>
            )}
          </div>
        </section>
      </div>
      {isReplying && (
        <div className="mt-2">
          <CommentForm
            setIsReplying={setIsReplying}
            commentType="reply"
            comment={comment}
          />
        </div>
      )}
      <div className="border-l-[3px] ml-9 space-y-5 border-neutral-lightGray">
        {comment.replies.map((reply) => (
          <Reply reply={reply} key={reply.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}

function Header({
  user,
  createdAt,
  cmtId,
  setIsReplying,
  setIsEditing,
}: {
  user: User;
  createdAt: string;
  cmtId: number[];
  setIsReplying: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { username } = useUserContext();
  const dialog = useRef<null | HTMLDialogElement>(null);
  const openDeleteModal = () => {
    if (!dialog.current) return;
    dialog.current.showModal();
  };

  const renderOptions = () => {
    if (user.username === username) {
      return (
        <div className="flex gap-4 ml-auto">
          <button
            onClick={openDeleteModal}
            className="flex items-baseline ml-auto gap-1"
          >
            <img src={deleteIcon} alt="deleteIcon" />
            <span className="font-bold hover:text-primary-paleRed text-primary-red">
              Delete
            </span>
          </button>
          <DeleteCommentModal dialogRef={dialog} cmtId={cmtId} />
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-baseline ml-auto gap-1"
          >
            <img src={editIcon} alt="editIcon" />
            <span className="font-bold text-primary-blue">Edit</span>
          </button>
        </div>
      );
    }
    return (
      <button
        onClick={() => setIsReplying(true)}
        className="flex items-baseline ml-auto gap-1"
      >
        <img src={replyIcon} alt="replyicon" />
        <span className="font-bold text-primary-blue">Reply</span>
      </button>
    );
  };
  return (
    <header className="flex w-full items-center gap-3">
      <img className="w-8 h-8" src={user.image.png} alt="user" />
      <span className="font-bold text-neutral-darkblue">{user.username}</span>
      {username === user.username && (
        <div className="bg-primary-blue rounded text-neutral-white border flex items-center px-2 pb-[2px]">
          you
        </div>
      )}
      <span className="text-neutral-grayishBlue">{createdAt}</span>
      {renderOptions()}
    </header>
  );
}

function Reply({ reply, comment }: { reply: Rpy; comment: Cmt }) {
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const input = useRef<HTMLTextAreaElement>(null);
  const { editReply } = useCommentContext();
  const handleEditReply = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.current) return;
    if (input.current.value.trim() === "") return;
    const newReply = new Rpy(
      reply.id,
      input.current.value,
      reply.user,
      reply.replyingTo,
      reply.score
    );
    editReply(newReply, comment.id);
    setIsEditing(false);
  };
  return (
    <>
      <div
        key={reply.id}
        className="flex rounded-md my-5 p-5 bg-neutral-white ml-9 gap-4"
      >
        <div>
          <CommentScore comment={[comment, reply]} />
        </div>
        <div className="mt-2 space-y-3 grow">
          <Header
            user={reply.user}
            createdAt={reply.createdAt}
            cmtId={[comment.id, reply.id]}
            setIsReplying={setIsReplying}
            setIsEditing={setIsEditing}
          />
          {isEditing ? (
            <form
              onSubmit={handleEditReply}
              className="flex flex-col items-end gap-2"
            >
              <textarea
                className="resize-none text-neutral-grayishBlue outline-none p-2 border-2 rounded-md grow border-neutral-lightGray hover:border-primary-blue focus:border-primary-blue transition-colors duration-300 ease-in-out w-full"
                ref={input}
                name="comment"
                rows={4}
                placeholder={"Add a comment..."}
              >
                {reply.content}
              </textarea>
              <button
                type="submit"
                className="bg-primary-blue hover:bg-primary-grayishBlue focus:bg-primary-grayishBlue text-neutral-white px-4 py-2 uppercase rounded"
              >
                update
              </button>
            </form>
          ) : (
            <p className="text-neutral-grayishBlue">
              <span className="text-primary-blue font-bold">
                @{reply.replyingTo}
              </span>{" "}
              {reply.content}
            </p>
          )}
        </div>
      </div>
      {isReplying && (
        <div className="mt-2 pl-10">
          <CommentForm
            commentType="reply"
            comment={comment}
            setIsReplying={setIsReplying}
            replyingTo={reply.user.username}
          />
        </div>
      )}
    </>
  );
}
