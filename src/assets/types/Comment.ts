import { User } from "./User";

export class Comment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies: Reply[];
  didUpVoteOrDownVote?: "+" | "-";

  constructor(id: number, content: string, user: User, replies: Reply[] = []) {
    this.id = id;
    this.content = content;
    this.createdAt = "just now";
    this.score = 0;
    this.user = user;
    this.replies = replies;
    this.didUpVoteOrDownVote = undefined;
  }
}

export class Reply {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replyingTo: string;
  user: User;
  constructor(
    id: number,
    content: string,
    user: User,
    replyingTo: string,
    score = 0
  ) {
    this.id = id;
    this.content = content;
    this.createdAt = "just now";
    this.score = score;
    this.user = user;
    this.replyingTo = replyingTo;
  }
}
