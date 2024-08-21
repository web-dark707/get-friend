import React from 'react';
import { Button, Empty, Overlay } from '@/components/vip-ui';
import { MyCouponsResult } from '@/types/api/home';
interface Props {
    visible: boolean;
    onCancel: () => void;
    onChange: (key, value) => void;
    couponList: MyCouponsResult[];
}
const CouponModal = (props: Props) => {
    const { visible, onCancel, onChange, couponList } = props;

    const handleClick = (id) => {
        onChange('couponId', id);
        onCancel();
    };

    return (
        <Overlay visible={visible} onCancel={onCancel}>
            <div className="bg-[#fff] mx-auto text-[#fff]">
                <div className="bg-[#C95793]  pl-[12px] text-[16px] font-bold">
                    優惠券
                </div>
                <div className="p-[12px]">
                    {couponList.length === 0 ? (
                        <Empty
                            className="opacity-20 text-[#000]"
                            description="暂无优惠卷"
                        />
                    ) : (
                        <>
                            {couponList.map((it) => (
                                <div
                                    key={it.id}
                                    className="bg-[#F74E18] rounded-[16px] px-[12px] py-[8px]"
                                >
                                    <div className="w-full flex justify-between items-center">
                                        <div>{it.money}P</div>
                                        <div>
                                            <div>{it.category}</div>
                                            <div>{it.useCondition}</div>
                                        </div>
                                        <Button
                                            width="w-[80px]"
                                            onClick={() => handleClick(it.id)}
                                        >
                                            使用
                                        </Button>
                                    </div>
                                    <div>有效期限: {it.expireTime}</div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </Overlay>
    );
};

export default CouponModal;
