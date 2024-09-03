import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { Button } from '@/components/vip-ui';
import { PreConfirmDatingResult } from '@/types/api/home';
import { confirmDating } from '@/api/home';
import NavBar from '@/components/NavBar';
import { selectorDict } from '@/store/common/selectors';

const StartDating = () => {
    const location = useLocation();
    const { depositMoney, mainDepositPayProcessDesc } =
        useRecoilValue(selectorDict);
    const { state } = location as { state: PreConfirmDatingResult };
    const { mutateAsync: mutateConfirmDating } = useMutation(confirmDating);
    const navigate = useNavigate();

    const handleConfirm = () => {
        mutateConfirmDating({ datingId: state.datingId }).then((res: any) => {
            navigate(`/recordDetail?id=${res.data.id}`);
        });
    };

    return (
        <div>
            <NavBar
                title="請確認約會內容"
                onLeftClick={() => navigate('/dating')}
            />
            <div className="bg-[#521933] h-[30px] text-[16px] font-bold leading-[30px] pl-[12px] text-[#fff]">
                約會內容
            </div>
            <div className="px-[12px] py-[8px] relative">
                <div>女生:&nbsp;{state.girlName}</div>
                <div>
                    基本服務:&nbsp;
                    {state?.serviceItems.map((it, i) => (
                        <div key={i}>{it}</div>
                    ))}
                </div>
                <div>
                    日期:&nbsp;{state.timeslot}&nbsp;時間:&nbsp;{state?.hour}
                </div>
            </div>
            <div className="bg-[#FD6298] h-[30px] text-[16px] font-bold leading-[30px] pl-[12px] text-[#fff]">
                聯絡方式
            </div>
            <div className="px-[12px] py-[8px] relative">
                <div>手機:&nbsp;{state?.addressInfo.tel}</div>
                <div>tg:&nbsp;{state?.addressInfo.tg}</div>
                <div>地址:&nbsp;{state?.addressInfo.address}</div>
                <div className="text-error">
                    注意：請保持聯絡方式暢通，您的專屬經紀人將與您確認約會。確認後會提供付款地址。
                </div>
            </div>
            <div className="bg-[#521933] h-[30px] text-[16px] font-bold leading-[30px] pl-[12px] text-[#fff]">
                支付方式
            </div>
            <div className="px-[12px] py-[8px]">
                <div>
                    <div>{state.paymentInfo?.paymentMethod}</div>
                    <div className="whitespace-pre">
                        地址:&nbsp;{state.paymentInfo.address}
                    </div>
                    <div className="flex justify-between items-center mt-[8px]">
                        <span>實際支付:&nbsp;{state.paymentInfo.amount} U</span>
                    </div>
                    <div>即時匯率:&nbsp;{state.paymentInfo.rate}</div>
                    {/* {state.paymentInfo?.paymentPrivilege && (
                        <div>
                            支付特權:&nbsp;{state.paymentInfo.paymentPrivilege}
                        </div>
                    )} */}
                    <div className="text-[24px] font-bold text-error my-[12px]">
                        定金:&nbsp;{depositMoney}&nbsp;U
                    </div>
                </div>
                <div className="text-error whitespace-pre-line">
                    {mainDepositPayProcessDesc}
                </div>
                <div className="text-error mt-[8px]">
                    注意：請誤惡作劇提單，發現無故提單狀況，一律取消會員資格，餘額不退
                </div>
            </div>
            <Button
                width="w-[320px]"
                className="mx-auto h-[60px] text-[18px]"
                onClick={handleConfirm}
            >
                訊息確認無誤，支付訂金開始約會
            </Button>
        </div>
    );
};

export default StartDating;
