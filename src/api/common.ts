import { deffHttp } from '@/utils/axios';
enum Api {
    APP_COMMON_UPLOAD_PHOTO = '/api/pwa/app/uploadIdPhoto',
}

// 上传图片
export const uploadPhoto = (data: FormData) =>
    deffHttp.post<string>({ url: Api.APP_COMMON_UPLOAD_PHOTO, data });
