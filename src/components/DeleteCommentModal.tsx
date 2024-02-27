import { useCommentContext } from "../context/CommentContext/useCommentContext";

type DeleteCommentModalProps = {
  dialogRef: React.RefObject<HTMLDialogElement>;
  cmtId: number[];
};

function DeleteCommentModal({ dialogRef, cmtId }: DeleteCommentModalProps) {
  const { deleteComment } = useCommentContext();
  const closeModal = () => {
    if (!dialogRef.current) return;
    dialogRef.current.close();
  };

  const handleDeleteComment = () => {
    deleteComment(cmtId);
    closeModal();
  };

  return (
    <dialog
      ref={dialogRef}
      className="w-[22rem] backdrop:bg-neutral-darkblue backdrop:opacity-60 cursor-auto text-neutral-darkblue space-y-3 text-left p-8 rounded-lg"
    >
      <h2 className=" text-lg font-medium">Delete Comment</h2>
      <p className="font-normal">
        You are about to delete this comment? This will remove the comment and
        can't be undone
      </p>
      <div className="flex text-neutral-white justify-between">
        <button
          className="bg-neutral-grayishBlue hover:opacity-50 btn"
          onClick={closeModal}
        >
          No, Cancel
        </button>
        <button
          onClick={handleDeleteComment}
          className="bg-primary-red hover:bg-primary-paleRed btn"
        >
          Yes, Delete
        </button>
      </div>
    </dialog>
  );
}

export default DeleteCommentModal;
