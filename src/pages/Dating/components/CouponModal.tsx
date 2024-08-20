import React, { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button, Overlay } from '@/components/vip-ui';
import { getMyCoupons } from '@/api/home';
interface Props {
    visible: boolean;
    onCancel: () => void;
}
const MedicalReportModal = (props: Props) => {
    const { visible, onCancel } = props;
    const { mutateAsync: mutateMyCoupons, data } = useMutation(getMyCoupons);
    useEffect(() => {
        mutateMyCoupons();
    }, [mutateMyCoupons]);

    return (
        <Overlay visible={visible} onCancel={onCancel}>
            <div className="bg-[#fff] mx-auto text-[#fff]">
                <div className="bg-[#C95793]  pl-[12px] text-[16px] font-bold">
                    優惠券
                </div>
                <div className="p-[12px]">
                    {data?.data.map((it) => (
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
                                <Button className="" width="w-[80px]">
                                    使用
                                </Button>
                            </div>
                            <div>有效期限: {it.expireTime}</div>
                        </div>
                    ))}
                </div>
            </div>
        </Overlay>
    );
};

export default MedicalReportModal;
