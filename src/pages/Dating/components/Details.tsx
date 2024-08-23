import React, { useState, useEffect, useMemo } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Big from 'big.js';
import { DatingGirlsResult, PreConfirmDatingParams } from '@/types/api/home';
import { Button, Picker, Toast } from '@/components/vip-ui';
import { getMyCoupons, preConfirmDating } from '@/api/home';
import { isEmpty } from '@/utils/tools';
import { selectorDict } from '@/store/common/selectors';
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
    const { mainPayTip, usdtToPhpRate, datingHours, defaultDatingHour } =
        useRecoilValue(selectorDict);
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
    const handleStart = async () => {
        // 校验
        if (isEmpty(params.serviceItemIds)) {
            return Toast.error('请选择基本服务');
        } else if (isEmpty(params.timeslot)) {
            return Toast.error('请选择档期');
        } else if (isEmpty(params.addressInfo)) {
            return Toast.error('请填写地址');
        }
        const res = await mutatePreConfirmDating(params);
        navigate('/dating/startDating', { state: res.data });
    };

    useEffect(() => {
        mutateMyCoupons();
    }, [mutateMyCoupons]);

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
                <MedicalReportModal url={girlData?.physicalExamReport} />
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
                <div className="flex justify-end items-center">
                    <span className="mr-[4px]">時間:</span>
                    <Picker
                        title="請選擇約會時間"
                        placeholder="請選擇約會時間"
                        pickerValue={defaultDatingHour}
                        downIcon={
                            <img
                                className="w-[16px]"
                                src={require('@/assets/images/icon/form/selectArrow.png')}
                            />
                        }
                        triggerClass="border border-solid border-[#ccc] px-[12px]"
                        items={datingHours
                            .split(',')
                            .map((it) => ({ value: it, label: it }))}
                        onChange={(val) => handleChangeParams('hour', val)}
                    />
                </div>
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
            <div className="px-[12px] py-[8px] relative flex justify-between">
                {params?.addressInfo ? (
                    <div>
                        <div>手機:{params?.addressInfo.tel}</div>
                        <div>tg:{params?.addressInfo.tg}</div>
                        <div>地址:{params?.addressInfo.address}</div>
                    </div>
                ) : (
                    <span>暂无联络方式</span>
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
                    <div>地址: 平台與您確認後顯示</div>
                    <div>
                        實際支付：
                        {new Big(price).div(usdtToPhpRate).toNumber()} U
                    </div>
                    <div>即時匯率：{usdtToPhpRate}</div>
                    <div></div>
                </div>

                <div className="text-error">
                    注意：此地址只接收trc20協議的USDT，充入其它幣種無法到賬，且無法找回，支付金額需等於上面所示實際支付金額，少充無法到賬，多充無法補回，由操作失誤導致的資金問題平台概不付責
                </div>
                <div>{mainPayTip}</div>
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
