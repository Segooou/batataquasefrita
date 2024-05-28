import type { InputProps, Platform } from '..';
import type { Pagination } from 'domain/protocol';

export interface Functionality {
  id: number;
  name: string;
  keyword: string;
  googleSheets: number | null;
  apiRoute: string;
  description: string | null;
  platform: Platform;
  inputProps: InputProps[];
  finishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UseFindFunctionalityQuery extends Pagination {
  content: Functionality[];
}
