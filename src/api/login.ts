import { deffHttp } from '@/utils/axios';
import { LoginParams, RegisterParams } from '@/types/api/login';

enum Api {
    LOGIN_LOGIN = '/api/login/login',
    LOGIN_REGISTER = '/api/login/register',
}

export const login = (params: LoginParams) =>
    deffHttp.post<string>(
        { url: Api.LOGIN_LOGIN, data: params },
        { withToken: false },
    );

export const register = (params: RegisterParams) =>
    deffHttp.post<string>(
        { url: Api.LOGIN_REGISTER, data: params },
        { withToken: false },
    );
