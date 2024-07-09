import type { Pagination } from 'domain/protocol';

export enum Role {
  common = 'common',
  admin = 'admin'
}

export interface UserProps {
  id: number;
  username: string;
  role: Role;
  avatar: string | null;
  userSeeFunctionality: { functionalityId: number }[];
  _count: {
    actions: number;
  };
}

export interface UserFunctionalities {
  functionalityId: number;
  userId: number;
}

export interface UserPlatforms {
  platformId: number;
  userId: number;
}

export interface UseFindUserQuery extends Pagination {
  content: UserProps[];
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserProps;
}
