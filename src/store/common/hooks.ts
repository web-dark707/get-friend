import { useSetRecoilState } from 'recoil';
import { setStorage } from '@/utils/storage';
import { dictState, iframeState } from './atoms';
import { DictStateType, IframeStateType } from './types';

export const useSetDict = () => {
    const setValue = useSetRecoilState(dictState);
    return (state: DictStateType) => {
        setValue(state);
        setStorage('dict', state);
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
