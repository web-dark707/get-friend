import { deffHttp } from '@/utils/axios';
import { HomeMenuResult, HomeSetMenuParams } from '@/types/api/home';

enum Api {
    CMS_HALL_CACHE = '/api/cms/hall/cache',
    APP_GET_HOME_MENU = '/api/pwa/member/center',
    APP_SET_HOME_MENU = '/api/pwa/member/center/update',
}

// 获取首页菜单
export const getHomeMenu = () =>
    deffHttp.post<HomeMenuResult>(
        { url: Api.APP_GET_HOME_MENU },
        { withToken: true },
    );

// 修改首页菜单
export const setHomeMenu = (params: HomeSetMenuParams) =>
    deffHttp.post<null>(
        { url: Api.APP_SET_HOME_MENU, data: params },
        { withToken: true },
    );
