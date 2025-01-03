export interface PaginateResponse<T> {
    data: T[],
    page: number,
    limit: number,
    total: number,
}