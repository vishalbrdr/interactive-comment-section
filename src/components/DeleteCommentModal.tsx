import { useEffect, useRef } from "react";

function DeleteCommentModal() {
  const dialog = useRef<null | HTMLDialogElement>(null);

  useEffect(() => {
    if (!dialog.current) return;
    dialog.current.showModal();
  });

  return (
    <dialog
      ref={dialog}
      className="w-[22rem]  text-neutral-darkblue space-y-3 text-left p-8 rounded-lg"
    >
      <h2 className=" text-lg font-medium">Delete Comment</h2>
      <p className="font-normal">
        You are about to delete this comment? This will remove the comment and
        can't be undone
      </p>
      <div className="flex text-neutral-white justify-between">
        <button className="bg-neutral-grayishBlue btn">No, Cancel</button>
        <button className="bg-primary-red btn"> Yes, Delete</button>
      </div>
    </dialog>
  );
}

export default DeleteCommentModal;
