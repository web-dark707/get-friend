import { selector } from 'recoil';
import {
    userBalance,
    userInfoState,
    userIsChangePwdState,
    userSingleBalance,
} from './atoms';

export const selectorUserInfo = selector({
    key: 'selectorUserInfo',
    get: ({ get }) => {
        return get(userInfoState);
    },
});

export const selectorIsChangePwdState = selector({
    key: 'selectorIsChangePwdState',
    get: ({ get }) => {
        return get(userIsChangePwdState);
    },
});

export const selectorUserBalance = selector({
    key: 'selectorUserBalance',
    get: ({ get }) => {
        return get(userBalance);
    },
});

export const selectorUserSingleBalance = selector({
    key: 'selectorUserSingleBalance',
    get: ({ get }) => {
        return get(userSingleBalance);
    },
});
