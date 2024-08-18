export interface HomeMenuResult {
    all_menu: HomeMenuListItem[];
    user_menu: HomeMenuListItem[];
}
export interface HomeMenuListItem {
    code: string;
    id: number;
    member_code: string;
    name: string;
    weights: 0;
}

export interface HomeSetMenuParams {
    data: HomeSetMenuListItem[];
}

export interface HomeSetMenuListItem {
    code: string;
    name: string;
    weights: number;
}
