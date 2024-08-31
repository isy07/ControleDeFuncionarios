export class Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;

  constructor(
    currentPage: number = 1,
    itemsPerPage: number = 4,
    totalItems: number = 0,
    totalPages: number = 0
  ) {
    this.currentPage = currentPage;
    this.itemsPerPage = itemsPerPage;
    this.totalItems = totalItems;
    this.totalPages = totalPages;
  }
}

export class PaginatedResult<T> {
  result: T;
  pagination: Pagination;

  constructor(result: T, pagination: Pagination) {
    this.result = result;
    this.pagination = pagination;
  }
}

