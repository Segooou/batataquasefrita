import type { Pagination } from 'domain/protocol';

export interface Platform {
  id: number;
  name: string;
  keyword: string;
  image: string;
  description: string | null;
  finishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UseFindPlatformQuery extends Pagination {
  content: Platform[];
}
