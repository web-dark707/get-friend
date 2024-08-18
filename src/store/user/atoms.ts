import { atom } from 'recoil';
import { getStorage } from '@/utils/storage';
import { UserInfoType, UserBalanceType } from './types';

// 用户信息
export const userInfoState = atom<UserInfoType>({
    key: 'userInfoState',
    default: (getStorage('userInfo') || {}) as UserInfoType,
});

// 用户是否修改过密码
export const userIsChangePwdState = atom<boolean>({
    key: 'userIsChangePwdState',
    default: getStorage('isChangePwdState') || undefined,
});

// 用户余额
export const userBalance = atom<UserBalanceType[]>({
    key: 'userBalance',
    default: [],
});

// 用户单个币种余额信息
export const userSingleBalance = atom<UserBalanceType>({
    key: 'userSingleBalance',
    default: undefined,
});
