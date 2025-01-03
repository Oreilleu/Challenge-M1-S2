export interface PaginateResponse<T> {
    success: boolean,
    data: T[],
    page: number,
    limit: number,
    total: number,
}