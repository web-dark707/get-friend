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
    DATING_GIRLS = '/api/dating/girls',
    DICT_DICTS = '/api/dict/dicts',
    MY_COUPONS = '/api/my/coupons',
    DATING_LAST_ADDRESS = '/api/dating/last-address',
    DATING_PRE_CONFIRM_DATING = '/api/dating/pre-confirm-dating',
    DATING_CONFIRM_DATING = '/api/dating/confirm-dating',
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
