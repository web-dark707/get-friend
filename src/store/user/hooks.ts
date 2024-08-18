import { useSetRecoilState } from 'recoil';
import { setStorage } from '@/utils/storage';
import { getUserBalance } from '@/api/user';
import {
    userBalance,
    userInfoState,
    userIsChangePwdState,
    userSingleBalance,
} from './atoms';
import { UserInfoType } from './types';

export const useSetUserInfo = () => {
    const setValue = useSetRecoilState(userInfoState);
    return (value: UserInfoType) => {
        setStorage('userInfo', value);
        setValue(value);
    };
};

export const useSetIsChangePwdState = () => {
    const setValue = useSetRecoilState(userIsChangePwdState);
    return (value: boolean) => {
        setStorage('isChangePwdState', value);
        setValue(value);
    };
};

export const useUserBalance = () => {
    const setValue = useSetRecoilState(userBalance);
    return async () => {
        const response = await getUserBalance();
        setValue(response.data ?? []);
        return response.data ?? [];
    };
};

export const useUserBalanceByCurrency = () => {
    const setValue = useSetRecoilState(userSingleBalance);

    return async (currency: string) => {
        const response = await getUserBalance();
        const balanceInfo = (response.data ?? []).find(
            (item) => item.currency === currency,
        );
        setValue(balanceInfo);
        return balanceInfo;
    };
};
