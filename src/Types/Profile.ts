export interface UserType {
  _id: string;
  id: string;
  name: string;
  username: string;
  email: string;
  gender: "male" | "female" | string;
  photo: string;
  cover: string;
  dateOfBirth: string;
  createdAt: string;
  bookmarks: string[];        // أو نوع الكائن لو بترجع عناصر كاملة مستقبلاً
  bookmarksCount: number;
  followers: string[];        // أو User[] لو بيرجع بيانات المتابعين
  followersCount: number;
  following: string[];        // أو User[] لو بيرجع بيانات المتابَعين
  followingCount: number;
}

export interface UserResponse {
  message: string;
  success: boolean;
  data?: {
    user: UserType;
  };
  user?: UserType;
}