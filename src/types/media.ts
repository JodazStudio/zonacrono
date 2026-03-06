// src/types/media.ts
export interface MediaFile {
  key: string;
  name: string;
  size: number;
  lastModified: string;
  url: string;
  downloadUrl?: string;
  type: string;
}

export interface Pagination {
  page: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextCursor: string | null;
}

export type { MediaFile as IMediaFile, Pagination as IPagination };
