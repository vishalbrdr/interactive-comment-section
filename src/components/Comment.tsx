import { Comment as Cmt } from "../assets/types/Comment";

type CommentProps = {
  comment: Cmt;
};

export default function Comment({ comment }: CommentProps) {
  return <div>{comment.id}</div>;
}
