import React, { PropsWithChildren, ReactElement, Fragment } from 'react';
import Polling from '@/utils/polling';
import { usePollingVerify } from '@/common/polling_ws';

type WarpCommonProps = {};
export const polling = new Polling();

export const WarpCommon = ({
    children,
}: PropsWithChildren<WarpCommonProps>) => {
    usePollingVerify();

    return <Fragment>{children as ReactElement}</Fragment>;
};

export default WarpCommon;
