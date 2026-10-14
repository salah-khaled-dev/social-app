export function formatDate(dateString?: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export interface CommentCreator {
  _id: string;
  name: string;
  username?: string;
  photo?: string;
}

export interface CommentType {
  _id: string;
  content: string;
  image?: string;
  commentCreator?: CommentCreator;
  user?: CommentCreator;
  post?: string;
  parentComment?: any;
  likes?: any[];
  createdAt: string;
}
