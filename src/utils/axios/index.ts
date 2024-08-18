import { isString } from 'lodash';
import { t } from 'i18next';
import { ContentTypeEnum } from '@/enums/httpEnum';
import log from '@/utils/log';
import { Toast } from '@/components/vip-ui';
import UserToken from '@/common/token';
import { Recordable } from '@/types/common/global';
import type { AxiosInterceptor, CreateAxiosOptions } from './axiosConfig';
import { iAxios } from './iAxios';
import { checkStatus } from './axiosStatus';
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
        const { data } = res;
        if (data) {
            if (data.code !== 10000) {
                Toast.error({
                    content: data.msg || options.errorMessage,
                });
                return Promise.resolve(errorData(res));
            } else {
                const { code, data: dataInfo, msg } = data;
                const toData = {
                    code,
                    data: dataInfo,
                    msg,
                };
                return Promise.resolve(toData);
            }
        }
        return data;
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
        const { urlPrefix } = options;
        if (urlPrefix && isString(urlPrefix))
            config.url = `${urlPrefix}${config.url}`;
        return config;
    },

    /**
     * @description: 请求拦截器处理
     */
    requestInterceptors: (config) => {
        const { requestOptions } = config;
        if (requestOptions?.withToken) {
            (config as Recordable).headers['t'] = UserToken.getToken();
            if (requestOptions?.specialToken)
                (config as Recordable).headers['t'] =
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
        checkStatus(response ? response?.status : 500);
        if (error.code === 'ECONNABORTED') {
            Toast.error(t('app.message.error.http408'));
        }
        if (response?.status === 401) {
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
