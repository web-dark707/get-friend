import { UserInfoResult } from '@/types/api/user';
import { deffHttp } from '@/utils/axios';

enum Api {
    APP_USER_INFO = '/api/pwa/app/info',
}

// 获取用户信息
export const getUserInfo = () =>
    deffHttp.post<UserInfoResult>(
        { url: Api.APP_USER_INFO, data: {} },
        { withToken: true },
    );
