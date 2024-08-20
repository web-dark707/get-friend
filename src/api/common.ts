import { deffHttp } from '@/utils/axios';
import { UserInfo } from '@/types/api/common';
enum Api {
    APP_COMMON_UPLOAD_PHOTO = '/api/pwa/app/uploadIdPhoto',
    USER_INFO = '/api/my/info',
    RECORD_LIST = '/api/dating-record/search',
}

// 上传图片
export const uploadPhoto = (data: FormData) =>
    deffHttp.post<string>({ url: Api.APP_COMMON_UPLOAD_PHOTO, data });

export const getUserInfo = () =>
    deffHttp.get<UserInfo>({ url: Api.USER_INFO }, { withToken: true });
export const getRecord = () =>
    deffHttp.get<UserInfo>({ url: Api.RECORD_LIST }, { withToken: true });
