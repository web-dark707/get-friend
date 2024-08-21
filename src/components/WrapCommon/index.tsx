import React, {
    PropsWithChildren,
    ReactElement,
    Fragment,
    useEffect,
} from 'react';
import { useMutation } from '@tanstack/react-query';
import { getDict } from '@/api/home';
import { useSetDict } from '@/store/common/hooks';

type WarpCommonProps = {};

export const WarpCommon = ({
    children,
}: PropsWithChildren<WarpCommonProps>) => {
    //初始化数据
    const setDict = useSetDict();
    const { mutateAsync: mutateDict } = useMutation(getDict, {
        onSuccess(res) {
            setDict(res.data);
        },
    });

    useEffect(() => {
        mutateDict();
    }, [mutateDict]);

    return <Fragment>{children as ReactElement}</Fragment>;
};

export default WarpCommon;
