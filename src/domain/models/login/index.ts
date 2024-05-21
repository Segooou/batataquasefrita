export enum Role {
  common = 'common',
  admin = 'admin'
}

export interface UserProps {
  id: string;
  username: string;
  role: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserProps;
}
