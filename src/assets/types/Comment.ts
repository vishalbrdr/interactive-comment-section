import { User } from "./User";

export class Comment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies: Reply[];

  constructor(id: number, content: string, user: User) {
    this.id = id;
    this.content = content;
    this.createdAt = "just now";
    this.score = 0;
    this.user = user;
    this.replies = [];
  }
}

export type Reply = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replyingTo: string;
  user: User;
};
