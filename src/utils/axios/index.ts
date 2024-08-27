// import { isString } from 'lodash';
import { ContentTypeEnum } from '@/enums/httpEnum';
import log from '@/utils/log';
import { Toast } from '@/components/vip-ui';
import UserToken from '@/common/token';
import { Recordable } from '@/types/common/global';
import type { AxiosInterceptor, CreateAxiosOptions } from './axiosConfig';
import { iAxios } from './iAxios';
import { errorData } from './errorConfig';

/**
 * @description:拦截器配置
 */
const interceptor: AxiosInterceptor = {
    /**
     * @description: 处理请求数据。如果数据不是预期格式，可直接抛出错误
     */
    requestHook: (res, options) => {
        /**
         *对请求回来的数据进行处理
         */
        if (res.status === 200) {
            return Promise.resolve({
                data: res.data,
                code: undefined,
                message: undefined,
            });
        } else {
            Toast.error({
                content: res.data.message || options.errorMessage,
            });
            return Promise.resolve(errorData(res));
        }
    },

    /**
     * @description: 请求失败的错误处理
     */
    requestCatchHook: (e, _options) => {
        return Promise.reject(e);
    },

    /**
     * @description: 请求之前处理config
     */
    beforeRequestHook: (config, options) => {
        const baseURL = 'https://api.sakuraclubjp.com';
        const textDomain = sessionStorage.getItem('text-url');
        if (process.env.NODE_ENV === 'production') {
            // @ts-ignore
            config.url = textDomain
                ? `${textDomain}${config.url}`
                : `${window.myConfig.domain}${config.url}`;
        } else {
            config.url = baseURL + config.url;
        }
        return config;
    },

    /**
     * @description: 请求拦截器处理
     */
    requestInterceptors: (config) => {
        const { requestOptions } = config;
        if (requestOptions?.withToken) {
            (config as Recordable).headers['Authorization'] =
                UserToken.getToken();
            if (requestOptions?.specialToken)
                (config as Recordable).headers['Authorization'] =
                    requestOptions?.specialToken;
        }
        config.headers['L'] = localStorage.getItem('i18nextLng');
        return config;
    },

    /**
     * @description: 请求拦截器错误处理
     */
    requestInterceptorsCatch: (error) => {
        log.error('请求拦截错误', error.message);
        return Promise.reject(error);
    },

    /**
     * @description: 响应拦截器处理
     */
    responseInterceptors: (res) => {
        return res;
    },

    /**
     * @description: 响应拦截器错误处理
     */
    responseInterceptorsCatch: (error: any) => {
        // log.error('响应拦截错误', error);
        const { response } = error || {};
        console.log(response);

        if (response?.data?.message) {
            Toast.error(response?.data?.message);
        }
        if (response?.data?.code === 'JWT_INVALID') {
            UserToken.clearToken();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    },
};

function createAxios(options?: Partial<CreateAxiosOptions>) {
    return new iAxios({
        ...{
            // 请求时间
            timeout: 15 * 1000,
            // (拦截器)数据处理方式
            interceptor,
            headers: { 'Content-Type': ContentTypeEnum.JSON },
            // 配置项（需要在拦截器中做的处理），下面的选项都可以在独立的接口请求中覆盖
            requestOptions: {
                withToken: true,
            },
        },
        ...(options || {}),
    });
}
export const deffHttp = createAxios();
