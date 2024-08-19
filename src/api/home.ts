import {
    DatingGirlsParams,
    DatingGirlsResult,
    DictResult,
} from '@/types/api/home';
import { deffHttp } from '@/utils/axios';

enum Api {
    DATING_GIRLS = '/api/dating/girls',
    DICT_DICTS = '/api/dict/dicts',
}

//  查找女生信息列表
export const getDatingGirls = (params: DatingGirlsParams) =>
    deffHttp.post<DatingGirlsResult[]>(
        { url: Api.DATING_GIRLS, data: params },
        { withToken: true },
    );
// 获取字典配置
export const getDict = () =>
    deffHttp.get<DictResult>({ url: Api.DICT_DICTS }, { withToken: true });
