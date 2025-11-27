import type { UserInfo } from "./UserInfo";

export interface Character {
  id: string;
  name: string;
  description: string;
  image: string;
  voice: string;

  userInfo: UserInfo;
  created_at: string;
  updated_at: string;
}
