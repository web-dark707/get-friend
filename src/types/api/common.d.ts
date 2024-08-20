export interface CurrencyListItem {
    currency_code: string; //币种
    currency_name: string;
    id: number;
}

export interface RateItem {
    from_currency_code: string; //币种
    from_currency_id: number; //
    id: number; //
    rate: number; // 汇率
    symbol: string; // 富豪
    to_currency_code: string; //转换的币种
    to_currency_id: number; //
}
export interface UserInfo {
    code: string;
    activationCode: string;
    customerLevel: string;
    username: string;
    subActivationCode: Array<SubActivationCode>;
}
interface SubActivationCode {
    code: string;
    invitationCopyContent: string;
    invitationWords: string;
    upperOwner: string;
    username: string;
}

export interface AllHallResult {
    hall_name: string;
    code: string;
    id: number;
}

export interface ConfigResult {
    games_website: string; //游戏网
    agent_network: string; //代理网
    service_hotline: {
        en: string;
        kr: string;
        zh: string;
    };
}
