import { UserInfo } from '@/types/api/user';
import { deffHttp } from '@/utils/axios';

enum Api {
    USER_INFO = '/api/my/info',
}

export const getUserInfo = () =>
    deffHttp.get<UserInfo>({ url: Api.USER_INFO }, { withToken: true });
