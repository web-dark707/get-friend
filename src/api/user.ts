import {
    UserLoginParams,
    UserLoginResult,
    UserInfoResult,
    UserBalance,
    CenterAuthorizer,
    UpdatePasswordParams,
    MemberCommissionParams,
    MemberCommissionResult,
    CodeParams,
    UpdatePayPasswordParams,
    SmsSwitchParams,
    GoogleCodeParams,
    GoogleCodeResult,
    ShowGoogleCodeParams,
    IsOpenGoogleParams,
} from '@/types/api/user';
import { deffHttp } from '@/utils/axios';

enum Api {
    APP_USER_LOGIN = '/api/pwa/app/login',
    APP_USER_LOGINOUT = '/api/pwa/app/loginOut',
    APP_USER_INFO = '/api/pwa/app/info',
    APP_USER_BALANCE = '/api/pwa/wallet/balance/list',
    APP_USER_AUTHORIZER = '/api/pwa/member/center/authorizer',
    APP_USER_UPDATE_PASSWORD = '/api/pwa/app/updatePwd',
    APP_USER_RESERVE_COMMISSION = '/api/pwa/reserve/queryMemberCommission',
    APP_USER_CAPTCHA = '/api/pwa/app/captcha',
    APP_USER_UPDATE_PAY_PASSWORD = '/api/pwa/app/update/payPwd',
    APP_USER_UPDATE_SWITCH_STATUS = '/api/pwa/app/messageSwitch',
    APP_USER_UPDATE_SWITCH_GOOGLE = '/api/pwa/member/center/opt/switch',
    APP_USER_SHOW_GOOGLE_CODE = '/api/pwa/member/center/opt/url',
    APP_USER_IS_OPEN_OPT = '/api/wallet_h5/isOpenOpt',
}

// 用户登录
export const userLogin = (params?: UserLoginParams) =>
    deffHttp.post<UserLoginResult>(
        { url: Api.APP_USER_LOGIN, data: params },
        { withToken: false },
    );

// 用户退出
export const userLoginOut = () =>
    deffHttp.post({ url: Api.APP_USER_LOGINOUT }, { withToken: true });

// 获取用户信息
export const getUserInfo = () =>
    deffHttp.post<UserInfoResult>(
        { url: Api.APP_USER_INFO, data: {} },
        { withToken: true },
    );

// 获取户口余额
export const getUserBalance = () =>
    deffHttp.post<UserBalance[]>(
        { url: Api.APP_USER_BALANCE },
        { withToken: true },
    );

// 我的授权人
export const getCenterAuthorizer = () =>
    deffHttp.post<CenterAuthorizer[]>(
        { url: Api.APP_USER_AUTHORIZER },
        { withToken: true },
    );

//修改登录密码
export const updatePassword = (params: UpdatePasswordParams) =>
    deffHttp.post<null>(
        { url: Api.APP_USER_UPDATE_PASSWORD, data: params },
        { withToken: true },
    );
// 修改支付密码

export const updatePayPassword = (params: UpdatePayPasswordParams) =>
    deffHttp.post<null>(
        { url: Api.APP_USER_UPDATE_PAY_PASSWORD, data: params },
        { withToken: true },
    );
// 获取用户占成
export const getMemberCommission = (params: MemberCommissionParams) =>
    deffHttp.post<MemberCommissionResult[]>(
        { url: Api.APP_USER_RESERVE_COMMISSION, data: params },
        { withToken: true },
    );

// 获取验证码
export const getCode = (data: CodeParams) =>
    deffHttp.post({ url: Api.APP_USER_CAPTCHA, data }, { withToken: false });

// 用户中心-开关状态
export const updateSwitch = (params: SmsSwitchParams) =>
    deffHttp.get<null>(
        { url: Api.APP_USER_UPDATE_SWITCH_STATUS, params: params },
        { withToken: true },
    );

// 开关google验证
export const updateGoogleCode = (data: GoogleCodeParams) =>
    deffHttp.post<null>(
        { url: Api.APP_USER_UPDATE_SWITCH_GOOGLE, data },
        { withToken: true },
    );

//查看绑定的google二维码
export const showGoogleCode = (data: ShowGoogleCodeParams) =>
    deffHttp.post<GoogleCodeResult>(
        { url: Api.APP_USER_SHOW_GOOGLE_CODE, data },
        { withToken: true },
    );

//查看户口是否开启google验证
export const getIsOpenGoogle = (data: IsOpenGoogleParams) =>
    deffHttp.post<number>({ url: Api.APP_USER_IS_OPEN_OPT, data });
