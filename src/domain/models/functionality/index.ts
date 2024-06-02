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
  messageNotFound?: string;
  from?: string;
  regex?: string;
  messageOnFind?: string;
  subject?: string[];
  text?: string[];
  indexToGet?: number[];
  textToReplace?: string[][];
  active?: boolean;
  _count: {
    actions: number;
  };
  favoriteUserFunctionality: {
    id: number;
  }[];
  inputProps: InputProps[];
  finishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UseFindFunctionalityQuery extends Pagination {
  content: Functionality[];
}

export interface UseFindFavoriteFunctionalityQuery extends Pagination {
  content: { functionality: Functionality }[];
}
