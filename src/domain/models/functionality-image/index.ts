import type { Pagination } from 'domain/protocol';

export interface InputOnImageProps {
  value: string;
  text: string;
  top: number;
  left: number;
  height: number;
  width: number;
  folder?: 'assinatura' | 'homem' | 'mulher';
  size?: string;
  font?: string;
  rotate?: number;
  color?: string;
}

export interface ImagesOnFunctionality {
  createdAt: Date;
  finishedAt: Date | null;
  functionalityId: number;
  url: string;
  id: number;
  inputOnImage: InputOnImageProps[];
  updatedAt: Date;
}
export interface FunctionalityImage {
  createdAt: Date;
  finishedAt: Date | null;
  functionalityId: number;
  id: number;
  active: boolean;
  imagesOnFunctionality: ImagesOnFunctionality[];
  updatedAt: Date;
}

export interface UseFindFunctionalityImageQuery extends Pagination {
  content: FunctionalityImage[];
}
