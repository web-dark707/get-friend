import React, { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button, Overlay } from '@/components/vip-ui';
import { getMyCoupons } from '@/api/home';
import './couponModal.scss';
interface Props {
    visible: boolean;
    onCancel: () => void;
    isShowBtn: boolean;
}
const MedicalReportModal = (props: Props) => {
    const { visible, onCancel, isShowBtn = false } = props;
    const { mutateAsync: mutateMyCoupons, data } = useMutation(getMyCoupons);
    useEffect(() => {
        mutateMyCoupons();
    }, [mutateMyCoupons]);

    return (
        <Overlay visible={visible} onCancel={onCancel}>
            <div className="modal-wrap">
                <header>優惠券</header>
                <div className="content">
                    {data?.data.map((it) => (
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
                                        className=""
                                        width="w-[60px] h-[30px]"
                                    >
                                        使用
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

export default MedicalReportModal;
