import React from 'react';
import { Button, Overlay } from '@/components/vip-ui';

const MedicalReportModal = () => {
    return (
        <Overlay
            trigger={
                <Button
                    className="absolute right-[12px] bottom-[12px]"
                    width="w-[80px]"
                >
                    使用優惠券
                </Button>
            }
        >
            <div className="bg-[#fff] mx-auto text-[#fff]">
                <div className="bg-[#C95793]  pl-[12px] text-[16px] font-bold">
                    優惠券
                </div>
                <div className="p-[12px]">
                    <div className="bg-[#F74E18] rounded-[16px] px-[12px] py-[8px]">
                        <div className="w-full flex justify-between items-center">
                            <div>1000P</div>
                            <div>
                                <div>系統福利</div>
                                <div>無門檻</div>
                            </div>
                            <Button className="" width="w-[80px]">
                                使用
                            </Button>
                        </div>
                        <div>有效期限: 2024-09-09</div>
                    </div>
                </div>
            </div>
        </Overlay>
    );
};

export default MedicalReportModal;
