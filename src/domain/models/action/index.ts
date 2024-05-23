import type { Functionality, UserProps } from '..';
import type { Pagination } from 'domain/protocol';

export type ActionType = 'copy' | 'none';

export interface Action {
  id: number;
  result: string[];
  data: object | null;
  hasError: boolean;
  action: ActionType;
  user: UserProps;
  functionality: Functionality;
  finishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UseFindActionQuery extends Pagination {
  content: Action[];
}
