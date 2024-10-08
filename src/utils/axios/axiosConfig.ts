/**
 * @description axios 数据处理类
 */

import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { RequestOptions } from '@/types/utils/axios';
import { ResponseData } from '@/types/common/global';

export interface CreateAxiosOptions extends AxiosRequestConfig {
    requestOptions?: RequestOptions;
    interceptor?: AxiosInterceptor;
}

export abstract class AxiosInterceptor {
    /**
     * @description: 请求前的配置
     */
    beforeRequestHook?: (
        config: AxiosRequestConfig,
        options: RequestOptions,
    ) => AxiosRequestConfig;

    /**
     * @description: 请求成功的处理
     */
    requestHook?: (
        res: AxiosResponse<ResponseData>,
        options: RequestOptions,
    ) => any;

    /**
     * @description: 请求失败处理
     */
    requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>;

    /**
     * @description: 请求之前的拦截器
     */
    requestInterceptors?: (config: CreateAxiosOptions) => CreateAxiosOptions;

    /**
     * @description: 请求之前的拦截器错误处理
     */
    requestInterceptorsCatch?: (error: Error) => void;

    /**
     * @description: 请求之后的拦截器
     */
    responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;

    /**
     * @description: 请求之后的拦截器错误处理
     */
    responseInterceptorsCatch?: (error: Error) => void;
}
