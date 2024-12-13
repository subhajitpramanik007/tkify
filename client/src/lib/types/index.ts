export type TUser = {
  _id: string;
  name: string;
  bio: string;
  email: string;
  avatar: string;
  createdAt: string;
};

export type Session = {
  user: TUser | null;
  isAuthenticated: boolean;
  status: "authenticated" | "unauthenticated" | "loading";
};

export type TMessage = {
  _id: string;
  sender: string;
  receiver: string;
  text: string;
  images?: string[];
  isRead?: boolean;
  isEdited?: boolean;
  createdAt: Date;
  updatedAt: Date;
};
