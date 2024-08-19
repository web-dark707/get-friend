export interface DatingGirlsResult {
    id: int64;
    name: string;
    code;
    int32;
    age;
    int32;
    height;
    int32;
    weight;
    int32;
    chest;
    int32;
    physicalExamTime: string;
    physicalExamReport: string;
    tags: string;
    intro: string;
    validTimeslots: string;
    serviceItemInfos: {
        girlId: int64;
        name: string;
        oriPrice: number;
        promotionPrice: number;
        extraInfo: string;
    }[];
    pic1: string;
    pic2: string;
    pic3: string;
    pic4: string;
    pic5: string;
    pic6: string;
}

export interface DatingGirlsParams {
    filters: {
        [key: string]: string;
    };
}

export interface DictResult {
    filterCondition: {
        conditionItems: {
            checkboxItems: {
                canSelect: boolean;
                checked: boolean;
                text: string;
                value: string;
            }[];
            text: string;
            value: string;
        }[];
    };
    usdtToPhpRate: number; //USDT 转换 PHP 汇率
    promotionStr: string; //活动文字内容
}
