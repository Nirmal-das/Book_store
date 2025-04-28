export type IApiResponse<T = any | null> = {
    data?: T,
    statusCode: number,
    status: string,
    message?: string,
};