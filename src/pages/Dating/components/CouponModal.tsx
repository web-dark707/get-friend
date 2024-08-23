import React from 'react';
import { Button, Overlay } from '@/components/vip-ui';
import './couponModal.scss';
import { MyCouponsResult } from '@/types/api/home';
interface Props {
    visible: boolean;
    onCancel?: () => void;
    isShowBtn?: boolean;
    onChange?: (key, value) => void;
    couponList: MyCouponsResult[];
}
const CouponModal = (props: Props) => {
    const {
        visible,
        onCancel,
        isShowBtn = false,
        couponList,
        onChange,
    } = props;
    const handleClick = (id) => {
        onChange && onChange('couponId', id);
        onCancel && onCancel();
    };
    return (
        <Overlay visible={visible} onCancel={onCancel}>
            <div className="modal-wrap">
                <header>優惠券</header>
                <div className="content">
                    {couponList.map((it) => (
                        <div className="order" key={it.id}>
                            <div className="top">
                                <span className="money">{it.money}P</span>
                                <p className="remark">
                                    <span className="r-1">{it.category}</span>
                                    <span className="r-2">
                                        {it.useCondition}
                                    </span>
                                </p>
                                {isShowBtn && (
                                    <Button
                                        width="w-[80px]"
                                        onClick={() => handleClick(it.id)}
                                        disabled={it.status !== 'NORMAL'}
                                    >
                                        {it.status === 'NORMAL'
                                            ? '使用'
                                            : '无法使用'}
                                    </Button>
                                )}
                            </div>
                            <p className="bottom">有效期限: {it.expireTime}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Overlay>
    );
};

export default CouponModal;
