export interface Page<T> {
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: Pageable;
    size: number;
    sort: Sort;
    totalElements: number;
    totalPages: number;
    content: T[];
}

export interface Pageable{
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
}

export interface Sort{
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}