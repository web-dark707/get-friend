export interface UserLoginParams {
    account: string;
    password?: string;
}
export interface UserLoginResult {
    member_name: string;
    name: string;
    member_code: string;
    token: string;
    parent_code: string;
    hall: number;
    hall_name: string;
    agent: string;
    create_time: number;
    r: string;
}

export interface UserInfoResult {
    member_name: string;
    name: string;
    member_code: string;
    token: string;
    parent_code: string;
    hall: number;
    hall_name: string;
    agent: string;
    create_time: number;
    r: string;
    pass_state: number;
    allow_a_reserve: number;
    allow_b_reserve: number;
    allow_m_reserve: number;
    allow_pay_password: number; // 是否允许修改支付密码: 1允许 2不允许
    err_num: number;
    member_type: number;
    message_switch: number; // 是否允许接收短信消息
    opt_switch: number; // 是否开启google验证码
    is_bind_opt: number; // 1已绑定 2未绑定
    is_open_opt: number;
    xing_num: number;
    continuous_num: number;
    is_qian_dao: boolean;
    qian_dao_info: {
        now_jiangli: {
            xing_bi: number;
            num: number;
        };
        next_jiangli: {
            xing_bi: number;
            num: number;
        };
    };
    vip_grade: string;
    xing_expired_time: number;
}

export interface UserBalance {
    currency: string; //币种
    balance: number; //总余额
    frozen: number; //冻结
    available: number; //可用
}

export interface CenterAuthorizer {
    authorizer_name: string;
    permission: string;
    telephone: null | string[];
}

// 修改登录密码参数
export interface UpdatePasswordParams {
    new_pwd: string;
    pwd: string;
    old_pwd: string;
}
// 修改登录密码参数
export interface UpdatePayPasswordParams {
    pwd: string;
    new_pwd: string;
}
// 用户占成参数
export interface MemberCommissionParams {
    currency: number; // 币种
    start_type: number; // 传1
    principal_type: string; // 本金类型C M
    code_type: string; // 出码类型 A B
}

// 用户占成
export interface MemberCommissionResult {
    principal_type: string;
    shares_rate: string; // 可用占成
    param_name: string;
}

// 获取登录验证码
export interface CodeParams {
    member_code: string;
    telephone: string;
}

// 短信开关请求
export interface SmsSwitchParams {
    switch: number;
}

export interface GoogleCodeParams {
    is_open: 1 | 2;
    opt_code: string;
    opt_secret?: string;
}

export interface ShowGoogleCodeParams {
    pwd: string;
}
export interface GoogleCodeResult {
    url: string;
    name: string;
    secret: string;
}

export interface IsOpenGoogleParams {
    member_code: string;
}
