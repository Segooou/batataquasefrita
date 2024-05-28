export enum Role {
  common = 'common',
  admin = 'admin'
}

export interface UserProps {
  id: number;
  username: string;
  role: Role;
  avatar: string | null;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserProps;
}
