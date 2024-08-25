import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { Button } from '@/components/vip-ui';
import { PreConfirmDatingResult } from '@/types/api/home';
import { confirmDating } from '@/api/home';
import { handleClipboard } from '@/utils/clipboard';
import NavBar from '@/components/NavBar';
import { selectorDict } from '@/store/common/selectors';

const StartDating = () => {
    const location = useLocation();
    const { depositMoney } = useRecoilValue(selectorDict);
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
                <div>
                    <div>{state.paymentInfo?.paymentMethod}</div>
                    <div className="whitespace-pre mt-[8px]">地址:</div>
                    <div className="flex justify-between items-center">
                        <span className="bg-[#444] px-[8px] py-[4px] rounded-[8px] text-[#fff]">
                            {state.paymentInfo.address}
                        </span>
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
                    <div className="flex justify-between items-center mt-[8px]">
                        <span>實際支付：{state.paymentInfo.amount} U</span>
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
                    <div className="text-[18px] font-bold text-error">
                        定金：{depositMoney}U
                    </div>
                    {state.paymentInfo?.paymentPrivilege && (
                        <div>
                            支付特權：{state.paymentInfo.paymentPrivilege}
                        </div>
                    )}
                </div>
                <div className="text-error">
                    註：為避免惡意提單，請提單後於10分鐘內支付10U訂金鎖定女生約會檔期，女生收到訂金後會進行檔期確認，若檔期衝突，將返還定金。若女生檔期確認後爽約，將賠償共20U給會員。若確認檔期後會員爽約，定金不退。請依10U訂金支付，少於或多於此金額將無法確認到賬，資金無法退還。定金的退還將以優惠券形式發放。
                </div>
                <div className="text-error mt-[8px]">
                    注意：請誤惡作劇提單，發現無故提單狀況，一律取消會員資格，餘額不退
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
