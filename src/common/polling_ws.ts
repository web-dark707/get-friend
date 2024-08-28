//轮询请求
import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import Polling from '@/utils/polling';
import UserToken from '@/common/token';
import { getDict } from '@/api/home';
import { useSetDict } from '@/store/common/hooks';

export const polling = new Polling();

export const useGetDict = () => {
    const setDict = useSetDict();

    const { mutateAsync: mutateDict } = useMutation(getDict);

    return async () => {
        const res = await mutateDict();
        if (res.code === 10000) {
            setDict(res.data);
        }
    };
};

export const usePollingVerify = () => {
    const getDict = useGetDict();
    useEffect(() => {
        // 登录成功后轮询
        if (UserToken.getToken()) {
            polling.start(getDict);
            return () => {
                polling.stop();
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
