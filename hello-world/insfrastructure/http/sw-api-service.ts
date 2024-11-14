import { SwApiService } from "../../domain/service/sw-api-interface";
import swApiclient from "./sw-api-client";
import { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class SwApiServiceImpl implements SwApiService{
    
    async callGetApi(baseURL: string, 
        path: string, 
        
    ): Promise<unknown> {            
        try{
            const api = this.buildDataApi(baseURL); 
            const axiosConfig: AxiosRequestConfig = {
                headers: {
                    'Content-Type': 'application/json',
                } as RawAxiosRequestHeaders,
            };
            const {data, headers, status} =  await api.get(path,axiosConfig);
            return <unknown>{ data, headers, status };
        }catch(error:any){
            console.error(error);
            throw error
        }         
    }

    buildDataApi(baseURL:string){
        try{
            swApiclient.defaults.baseURL = baseURL;
            return swApiclient;
        }catch(error:any){
            console.error(error);
            throw error;
        }    
    }

}