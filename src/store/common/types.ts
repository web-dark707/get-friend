import { LocaleEnum } from '@/enums/appEnum';
import {
    AllHallResult,
    ConfigResult,
    CurrencyListItem,
} from '@/types/api/common';

export interface LocaleStateType {
    locale: LocaleEnum;
}

export interface CurrencyItem extends CurrencyListItem {
    icon: string;
    label: string;
    value: number;
}
export interface HallItem extends AllHallResult {
    label: string;
    value: number;
}

export interface ConfigStateType extends ConfigResult {}

export interface IframeStateType {
    isShowIframe: boolean;
    url: string;
}
