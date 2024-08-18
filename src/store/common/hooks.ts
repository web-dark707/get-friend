import { useSetRecoilState } from 'recoil';
import { setStorage } from '@/utils/storage';
import {
    isShowCustomerState,
    currencyListState,
    hallListState,
    configState,
    iframeState,
    isShowSwitchLanguageState,
    isShowVerifyPasswordState,
    walletVerificationIdState,
} from './atoms';
import {
    CurrencyItem,
    HallItem,
    ConfigStateType,
    IframeStateType,
} from './types';

export const useSetIsShowCustomer = () => {
    const setValue = useSetRecoilState(isShowCustomerState);
    return (bool: boolean) => {
        setValue(bool);
    };
};

export const useSetIsShowSwitchLanguage = () => {
    const setValue = useSetRecoilState(isShowSwitchLanguageState);
    return (bool: boolean) => {
        setValue(bool);
    };
};

export const useSetWalletVerificationIdState = () => {
    const setValue = useSetRecoilState(walletVerificationIdState);
    return (id: string) => {
        setValue(id);
    };
};

export const useSetIsShowVerifyPasswordState = () => {
    const setValue = useSetRecoilState(isShowVerifyPasswordState);
    return (bool: boolean) => {
        setValue(bool);
    };
};

export const useSetCurrencyList = () => {
    const setValue = useSetRecoilState(currencyListState);
    return (state: CurrencyItem[]) => {
        setValue(state);
        setStorage('currencyList', state);
    };
};

export const useSetHallList = () => {
    const setValue = useSetRecoilState(hallListState);
    return (state: HallItem[]) => {
        setValue(state);
        setStorage('hallList', state);
    };
};

export const useSetConfig = () => {
    const setValue = useSetRecoilState(configState);
    return (state: ConfigStateType) => {
        setValue(state);
        setStorage('config', state);
    };
};

export const useSetIframe = () => {
    const setValue = useSetRecoilState(iframeState);
    return (state: Optional<IframeStateType>) => {
        setValue((prev) => ({
            ...prev,
            ...state,
        }));
    };
};
