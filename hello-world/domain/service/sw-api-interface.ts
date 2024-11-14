export interface SwApiService {
    callGetApi(
        baseURL: string,
        path: string,
        
    ): Promise<unknown>
}