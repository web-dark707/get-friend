import {
    DatingGirlsParams,
    DatingGirlsResult,
    DictResult,
    LastAddressResult,
    MyCouponsResult,
    PreConfirmDatingParams,
    PreConfirmDatingResult,
} from '@/types/api/home';
import { deffHttp } from '@/utils/axios';

enum Api {
    DATING_GIRLS = 'https://api.sakuraclubjp.com/api/dating/girls',
    DICT_DICTS = 'https://api.sakuraclubjp.com/api/dict/dicts',
    MY_COUPONS = 'https://api.sakuraclubjp.com/api/my/coupons',
    DATING_LAST_ADDRESS = 'https://api.sakuraclubjp.com/api/dating/last-address',
    DATING_PRE_CONFIRM_DATING = 'https://api.sakuraclubjp.com/api/dating/pre-confirm-dating',
    DATING_CONFIRM_DATING = 'https://api.sakuraclubjp.com/api/dating/confirm-dating',
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

// 获取字典配置
export const getMyCoupons = () =>
    deffHttp.get<MyCouponsResult[]>(
        { url: Api.MY_COUPONS },
        { withToken: true },
    );
// 获取上次联系地址
export const getLastAddress = () =>
    deffHttp.get<LastAddressResult>(
        { url: Api.DATING_LAST_ADDRESS },
        { withToken: true },
    );
// 预确认约会
export const preConfirmDating = (params: PreConfirmDatingParams) =>
    deffHttp.post<PreConfirmDatingResult>(
        { url: Api.DATING_PRE_CONFIRM_DATING, data: params },
        { withToken: true },
    );
// 确认约会
export const confirmDating = (params: { datingId: number }) =>
    deffHttp.post<any>(
        { url: Api.DATING_CONFIRM_DATING, data: params },
        { withToken: true },
    );
