import { selector } from 'recoil';
import {
    localeState,
    isShowCustomerState,
    currencyListState,
    hallListState,
    configState,
    iframeState,
    isShowSwitchLanguageState,
    isShowVerifyPasswordState,
    walletVerificationIdState,
} from './atoms';

export const selectorLocale = selector({
    key: 'selectorLocale',
    get: ({ get }) => {
        const state = get(localeState);
        return state.locale;
    },
});

// 币种列表
export const selectCurrencyList = selector({
    key: 'selectCurrencyList',
    get: ({ get }) => get(currencyListState),
});

// 客服弹窗
export const selectIsShowCustomerState = selector({
    key: 'selectIsShowCustomerState',
    get: ({ get }) => get(isShowCustomerState),
});

// 语言切换弹窗
export const selectIsShowSwitchLanguage = selector({
    key: 'selectIsShowSwitchLanguage',
    get: ({ get }) => get(isShowSwitchLanguageState),
});

// 密码验证弹窗
export const selectIsShowVerifyPasswordState = selector({
    key: 'selectIsShowVerifyPasswordState',
    get: ({ get }) => get(isShowVerifyPasswordState),
});

// 密码验证id
export const selectWalletVerificationIdState = selector({
    key: 'selectWalletVerificationIdState',
    get: ({ get }) => get(walletVerificationIdState),
});

// 获取所有场馆列表
export const selectorHallList = selector({
    key: 'selectorHallList',
    get: ({ get }) => get(hallListState),
});

// 获取配置
export const selectorConfig = selector({
    key: 'selectorConfig',
    get: ({ get }) => get(configState),
});

// iframe 显示/隐藏
export const selectorIframe = selector({
    key: 'selectorIframe',
    get: ({ get }) => get(iframeState),
});
