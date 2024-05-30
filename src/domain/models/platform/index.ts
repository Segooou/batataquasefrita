import type { Pagination } from 'domain/protocol';

export interface Platform {
  id: number;
  name: string;
  keyword: string;
  image: string;
  _count: {
    functionalities: number;
  };
  description: string | null;
  finishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UseFindPlatformQuery extends Pagination {
  content: Platform[];
}
