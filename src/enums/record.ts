export enum StatusType {
    NORMAL = 'NORMAL',
    DISABLE = 'DISABLE',
    USED = 'USED',
    WAIT_RECEIVE_DEPOSIT_MONEY = 'WAIT_RECEIVE_DEPOSIT_MONEY',
    WAIT_PLATFORM_ACK = 'WAIT_PLATFORM_ACK',
    FINISH = 'FINISH',
    WAIT_PAY = 'WAIT_PAY',
    NO_TIMESLOT = 'NO_TIMESLOT',
}

export enum PaymentType {
    NOT_PAY = 'NOT_PAY',
    PAID = 'PAID',
}

export enum DisputeType {
    NONE = 'NONE',
    ONGOING = 'ONGOING',
    END = 'END',
}
