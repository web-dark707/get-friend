import { atom } from 'recoil';
import { initLang } from '@/locales';
import { getStorage } from '@/utils/storage';
import {
    ConfigStateType,
    CurrencyItem,
    HallItem,
    IframeStateType,
    LocaleStateType,
} from './types';

export const localeState = atom<LocaleStateType>({
    key: 'localeState',
    default: {
        locale: initLang,
    },
});

/**
 * 控制客服弹窗显示/隐藏
 */
export const isShowCustomerState = atom<boolean>({
    key: 'isShowCustomerState',
    default: false,
});

/**
 * 控制语言切换弹窗显示/隐藏
 */
export const isShowSwitchLanguageState = atom<boolean>({
    key: 'isShowSwitchLanguageState',
    default: false,
});

/**
 * 控制密码验证id
 */
export const walletVerificationIdState = atom<string>({
    key: 'walletVerificationIdState',
    default: '',
});

/**
 * 控制密码验证弹窗显示/隐藏
 */
export const isShowVerifyPasswordState = atom<boolean>({
    key: 'isShowVerifyPasswordState',
    default: false,
});

/**
 * 币种列表
 */
export const currencyListState = atom<CurrencyItem[]>({
    key: 'currencyListState',
    default: (getStorage('currencyList') || []) as CurrencyItem[],
});
/**
 * 场馆列表
 */
export const hallListState = atom<HallItem[]>({
    key: 'hallListState',
    default: (getStorage('hallList') || []) as HallItem[],
});

/**
 *  配置信息
 */
export const configState = atom<ConfigStateType>({
    key: 'configState',
    default: (getStorage('config') || {}) as ConfigStateType,
});

/**
 *  iframe 显示/隐藏
 */
export const iframeState = atom<IframeStateType>({
    key: 'iframeState',
    default: {
        isShowIframe: false,
        url: '',
    },
});
