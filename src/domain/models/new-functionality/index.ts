import type { Pagination } from 'domain/protocol';
import type { Platform, UserProps } from '..';

export interface NewFunctionality {
  id: number;
  name: string;
  description: string;
  wasRaised: boolean;
  user: UserProps;
  platform: Platform;
  finishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UseFindNewFunctionalityQuery extends Pagination {
  content: NewFunctionality[];
}
