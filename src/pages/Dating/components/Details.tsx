import React, { useState, useEffect, useMemo } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { DatingGirlsResult, PreConfirmDatingParams } from '@/types/api/home';
import { Button, Toast } from '@/components/vip-ui';
import { handleClipboard } from '@/utils/clipboard';
import { getMyCoupons, preConfirmDating } from '@/api/home';
import { isEmpty } from '@/utils/tools';
import BasicServicesFilter from './BasicServicesFilter';
import SlotFilter from './SlotFilter';
import CouponModal from './CouponModal';
import ContactDetailsModal from './ContactDetailsModal';
import MedicalReportModal from './MedicalReportModal';
interface Props {
    girlData: DatingGirlsResult;
}
const Details = ({ girlData }: Props) => {
    const navigate = useNavigate();
    const [isShowCouponModal, setIsShowCouponModal] = useState(false);
    const [params, setParams] = useState<PreConfirmDatingParams>({
        girlId: girlData.id,
        serviceItemIds: [],
        couponId: undefined,
        timeslot: undefined,
        hour: undefined, //联系地址
        addressInfo: null,
    });
    const { mutateAsync: mutateMyCoupons, data } = useMutation(getMyCoupons);
    const { mutateAsync: mutatePreConfirmDating } =
        useMutation(preConfirmDating);

    const price = useMemo(
        () =>
            girlData?.serviceItemInfos
                .filter((it) => params.serviceItemIds.includes(it.id))
                .map((it) => it.promotionPrice)
                .reduce((prev, next) => {
                    return prev + next;
                }, 0),
        [girlData?.serviceItemInfos, params.serviceItemIds],
    );
    const handleChangeParams = (key: string, value: any) => {
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            setParams((prev) => ({
                ...prev,
                [key]: { ...value }, // 确保传递的是一个非空对象
            }));
        } else {
            setParams((prev) => ({
                ...prev,
                [key]: value,
            }));
        }
    };
    const handleStart = () => {
        // 校验
        if (isEmpty(params.serviceItemIds)) {
            Toast.error('请选择基本服务');
        } else if (isEmpty(params.timeslot)) {
            Toast.error('请选择档期');
        } else if (isEmpty(params.addressInfo)) {
            Toast.error('请填写地址');
        }
        mutatePreConfirmDating(params);
        // navigate('/dating/startDating');
    };

    useEffect(() => {
        mutateMyCoupons();
    }, [mutateMyCoupons]);

    useEffect(() => {
        console.log(params);
    }, [params]);

    return (
        <div>
            <div className="bg-[#FD6298] h-[30px] text-[16px] font-bold leading-[30px] pl-[12px] text-[#fff]">
                關於我
            </div>
            <div className="px-[12px] py-[8px]">{girlData?.intro}</div>
            {/* --------------- */}
            <div className="bg-[#521933] h-[30px] text-[16px] font-bold leading-[30px] pl-[12px] text-[#fff]">
                體檢報告
            </div>
            <div className="flex justify-between items-center px-[12px] py-[8px]">
                <div>體檢時間:{girlData?.physicalExamTime}</div>
                <MedicalReportModal />
            </div>
            {/* --------------- */}
            <div className="bg-[#FD6298] h-[30px] text-[16px] font-bold leading-[30px] pl-[12px] text-[#fff]">
                基本訊息
            </div>
            <div className="px-[12px] py-[8px]">
                <div>身高: {girlData?.height} cm</div>
                <div>體重: {girlData?.weight} kg</div>
                <div>胸圍: {girlData?.chest}</div>
            </div>
            {/* --------------- */}
            <div className="bg-[#521933] h-[30px] text-[16px] font-bold leading-[30px] pl-[12px] text-[#fff]">
                基本服務
            </div>
            <div className="px-[12px] py-[8px]">
                <BasicServicesFilter
                    onChange={handleChangeParams}
                    filterList={girlData?.serviceItemInfos ?? []}
                />
            </div>
            {/* --------------- */}
            <div className="bg-[#FD6298] h-[30px] text-[16px] font-bold leading-[30px] pl-[12px] text-[#fff]">
                檔期
            </div>
            <div className="px-[12px] py-[8px]">
                <SlotFilter
                    onChange={handleChangeParams}
                    filterList={girlData?.validTimeslots?.split(',') ?? []}
                />
            </div>
            {/* --------------- */}
            <div className="bg-[#521933] h-[30px] text-[16px] font-bold leading-[30px] pl-[12px] text-[#fff]">
                約會詳情
            </div>
            <div className="px-[12px] py-[8px] relative">
                <div>
                    基本服務：
                    {girlData?.serviceItemInfos
                        .filter((it) => params.serviceItemIds.includes(it.id))
                        .map((it) => (
                            <div key={it.id}>{it.name}</div>
                        ))}
                </div>
                {params?.timeslot && <div>日期:{params?.timeslot}</div>}
                <div>售價:{price}P</div>
                {params.couponId && (
                    <>
                        <div>
                            優惠券:
                            {
                                data?.data.find(
                                    (it) => it.id === params.couponId,
                                ).money
                            }
                        </div>
                        <div>
                            優惠後價格:
                            {price -
                                data?.data.find(
                                    (it) => it.id === params.couponId,
                                ).money}
                            P
                        </div>
                    </>
                )}
                <Button
                    className="absolute right-[12px] bottom-[12px]"
                    width="w-[80px]"
                    onClick={() => setIsShowCouponModal(true)}
                >
                    使用優惠券
                </Button>
                {isShowCouponModal && (
                    <CouponModal
                        visible={isShowCouponModal}
                        onChange={handleChangeParams}
                        onCancel={() => setIsShowCouponModal(false)}
                        couponList={data?.data}
                    />
                )}
            </div>
            {/* --------------- */}
            <div className="bg-[#FD6298] h-[30px] text-[16px] font-bold leading-[30px] pl-[12px] text-[#fff]">
                聯絡方式
            </div>
            <div className="px-[12px] py-[8px] relative">
                {params?.addressInfo && (
                    <>
                        <div>手機:{params?.addressInfo.tel}</div>
                        <div>tg:{params?.addressInfo.tg}</div>
                        <div>地址:{params?.addressInfo.address}</div>
                    </>
                )}
                <ContactDetailsModal handleChange={handleChangeParams} />
            </div>
            {/* --------------- */}
            <div className="bg-[#521933] h-[30px] text-[16px] font-bold leading-[30px] pl-[12px] text-[#fff]">
                支付方式
            </div>
            <div className="px-[12px] py-[8px]">
                <div className=" relative">
                    <div>USDT trc20 </div>
                    <div>地址: TXPCXCn***Yb4YPwR6</div>
                    <Button
                        className=" absolute right-[12px] bottom-[0px]"
                        width="w-[80px]"
                        onClick={(e) =>
                            handleClipboard(' TXPCXCn***Yb4YPwR6', e)
                        }
                    >
                        複製地址
                    </Button>
                </div>
                <div className=" relative">
                    <div>實際支付：140 U </div>
                    <div>即時匯率：50.7</div>
                    <Button
                        className=" absolute right-[12px] bottom-[0px]"
                        width="w-[80px]"
                        onClick={(e) =>
                            handleClipboard(' TXPCXCn***Yb4YPwR6', e)
                        }
                    >
                        複製金額
                    </Button>
                </div>
                <div className="text-error">
                    注意：此地址只接收trc20協議的USDT，充入其它幣種無法到賬，且無法找回，支付金額需等於上面所示實際支付金額，少充無法到賬，多充無法補回，由操作失誤導致的資金問題平台概不付責
                </div>
                <div>
                    小提醒:
                    您是尊貴的VIP會員，擁有先享後付特權，可以享受服務後再到訂單管理介面支付
                </div>
            </div>
            {/* --------------- */}
            <div className="flex justify-end bg-[#333333] p-[12px]">
                <Button width="w-[80px]" onClick={handleStart}>
                    開始約會
                </Button>
            </div>
            {/* --------------- */}
            <div className="bg-[#521933] h-[30px] text-[16px] font-bold leading-[30px] pl-[12px] text-[#fff]">
                免責聲明
            </div>
            <div className="px-[12px] py-[8px] relative">
                <div>
                    本平台為私人俱樂部會員提供商務約會陪侍聊天仲介服務。平台對提供服務的女生進行背景調查，健康調查等工作，確保女生身分背景真實性與素質質量，若對約會過程不滿意，可以向平台發起投訴。所有約會陪侍聊天過程中的具體服務由女生自願提供，會員自願接受，與平台無關。約會過程中發生一切法律問題與平台無關，屬於會員與女生之間的自願行為，若對此有異議請誤點擊開始約會按鈕並關閉本頁，若點擊開始約會按鈕則表示理解並接受此聲明
                </div>
                <div>
                    このプラットフォームは、プライベートクラブ会員向けにビジネスデート、エスコート、チャット仲介サービスを提供します。プラットフォームは、サービスを提供する女の子の身元調査と健康診断を実施し、女の子の身元と背景の信頼性と品質を保証します。デートのプロセスに満足できない場合は、プラットフォームに苦情を申し立てることができます。デートやエスコートチャットのプロセスにおけるすべての特定のサービスは、女の子が自発的に提供し、メンバーが自発的に受け入れるものであり、プラットフォームとは何の関係もありません。デートの過程で発生するすべての法的問題は、プラットフォームとは何の関係もありません。これに異議がある場合は、間違ってデートを開始ボタンをクリックしてこのページを閉じてください。
                    「デートを開始」ボタンをクリックすると、この声明を理解し、同意したことになります
                </div>
            </div>
        </div>
    );
};

export default Details;
