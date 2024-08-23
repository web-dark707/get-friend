import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/vip-ui';
import { PreConfirmDatingResult } from '@/types/api/home';
import { confirmDating } from '@/api/home';
import { handleClipboard } from '@/utils/clipboard';
import NavBar from '@/components/NavBar';

const StartDating = () => {
    const location = useLocation();
    const { state } = location as { state: PreConfirmDatingResult };
    const { mutateAsync: mutateConfirmDating } = useMutation(confirmDating);
    const navigate = useNavigate();

    const handleConfirm = () => {
        mutateConfirmDating({ datingId: state.datingId }).then(() => {
            navigate('/dating', {
                replace: true,
            });
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
                <div>女生：{state.girlName}</div>
                <div>
                    基本服務：
                    {state?.serviceItems.map((it, i) => (
                        <div key={i}>{it}</div>
                    ))}
                </div>
                <div>
                    日期：{state.timeslot} 時間:{state?.hour}
                </div>
            </div>
            <div className="bg-[#FD6298] h-[30px] text-[16px] font-bold leading-[30px] pl-[12px] text-[#fff]">
                聯絡方式
            </div>
            <div className="px-[12px] py-[8px] relative">
                <div>手機:{state?.addressInfo.tel}</div>
                <div>tg:{state?.addressInfo.tg}</div>
                <div>地址:{state?.addressInfo.address}</div>
                <div className="text-error">
                    注意：請保持聯絡方式暢通，您的專屬經紀人將與您確認約會。確認後會提供付款地址。
                </div>
            </div>
            <div className="bg-[#521933] h-[30px] text-[16px] font-bold leading-[30px] pl-[12px] text-[#fff]">
                支付方式
            </div>
            <div className="px-[12px] py-[8px]">
                <div className=" relative">
                    <div>{state.paymentInfo?.paymentMethod}</div>
                    <div>
                        地址: {state.paymentInfo.address}
                        <Button
                            className=""
                            width="w-[80px]"
                            onClick={(e) =>
                                handleClipboard(state.paymentInfo.address, e)
                            }
                        >
                            複製地址
                        </Button>
                    </div>
                    <div>
                        實際支付：
                        {state.paymentInfo.amount} U
                        <Button
                            className=""
                            width="w-[80px]"
                            onClick={(e) =>
                                handleClipboard(
                                    String(state.paymentInfo.amount),
                                    e,
                                )
                            }
                        >
                            複製金額
                        </Button>
                    </div>
                    <div>即時匯率：{state.paymentInfo.rate}</div>
                    {state.paymentInfo?.paymentPrivilege && (
                        <div>
                            支付特權：{state.paymentInfo.paymentPrivilege}
                        </div>
                    )}
                </div>
                <div className="text-error">
                    注意：請誤惡作劇提單，發現無故提單狀況，一律取消會員資格，餘額不退{' '}
                </div>
            </div>
            <div className="flex justify-end p-[12px]">
                <Button width="px-[16px]" onClick={handleConfirm}>
                    開始約會訊息確認無誤，開始約會
                </Button>
            </div>
        </div>
    );
};

export default StartDating;
