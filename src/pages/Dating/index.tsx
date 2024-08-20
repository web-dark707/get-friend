import React, { FC, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import { Pagination, EffectCards } from 'swiper';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/vip-ui';
import { getDatingGirls, getDict } from '@/api/home';
import { DatingGirlsResult, LastAddressResult } from '@/types/api/home';
import { handleClipboard } from '@/utils/clipboard';
import Search from './components/Search';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';
import ContactDetailsModal from './components/ContactDetailsModal';
import MedicalReportModal from './components/MedicalReportModal';
import CouponModal from './components/CouponModal';
import BasicServicesFilter from './components/BasicServicesFilter';
import SlotFilter from './components/SlotFilter';
const Home: FC = () => {
    const navigate = useNavigate();
    const [girlData, setGirlData] = useState<DatingGirlsResult>();
    const swiperRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isShowCouponModal, setIsShowCouponModal] = useState(false);
    const [addressInfo, setAddressInfo] = useState<LastAddressResult>();
    const { mutateAsync: mutateDict, data: dictData } = useMutation(getDict);
    const { mutateAsync: mutateDatingGirls } = useMutation(getDatingGirls, {
        onSuccess: (res) => {
            setGirlData(res.data[activeIndex]);
        },
    });
    const imageList = [
        [
            'https://via.placeholder.com/800x400?text=Slide+1',
            'https://via.placeholder.com/800x400?text=Slide+2',
            'https://via.placeholder.com/800x400?text=Slide+3',
        ],
        [
            'https://w.wallhaven.cc/full/m3/wallhaven-m35j7k.png',
            'https://w.wallhaven.cc/full/7p/wallhaven-7pv8zv.png',
        ],
        ['https://w.wallhaven.cc/full/85/wallhaven-85vzq2.jpg'],
    ];

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % imageList.length);
    };

    const handlePrev = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? imageList.length - 1 : prevIndex - 1,
        );
    };

    const handleClick = () => {
        // 点击时切换到下一个图片集
        if (swiperRef.current && swiperRef.current.swiper) {
            const swiper = swiperRef.current.swiper;
            if (swiper.activeIndex === swiper.slides.length - 1) {
                swiper.slideTo(0); // Go to the first slide
            } else {
                swiper.slideNext(); // Go to the next slide
            }
        }
    };
    // 搜索
    const handleSearch = (filters) => {
        console.log(filters);
        mutateDatingGirls({
            filters,
        });
    };

    useEffect(() => {
        mutateDatingGirls({
            filters: {},
        });
        mutateDict();
    }, [mutateDatingGirls, mutateDict]);

    return (
        <div className="w-full">
            <Search
                onSelected={handleSearch}
                filtersData={dictData?.data?.filterCondition.conditionItems}
            />
            <div className="relative w-full h-[calc(100vh-100px)] overflow-hidden">
                <Swiper
                    ref={swiperRef}
                    effect={'cards'}
                    grabCursor={true}
                    pagination={{ clickable: true }} // 启用分页器
                    modules={[Pagination, EffectCards]}
                    onClick={handleClick}
                    className="w-full h-full"
                    loop
                >
                    {imageList[activeIndex].map((it, i) => (
                        <SwiperSlide key={i}>
                            <img className="w-full h-full" src={it} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="w-full flex justify-between text-[#fff] px-[12px] absolute bottom-[180px] left-0 z-9">
                    <div
                        onClick={handlePrev}
                        className="border-1 border-solid border-[#fff] px-[12px] py-[8px] bg-[rgba(328,56,79,0.2)] rounded-[16px]"
                    >
                        上一位
                    </div>
                    <div
                        onClick={handleNext}
                        className="border-1 border-solid border-[#fff] px-[12px] py-[8px] bg-[rgba(328,56,79,0.2)] rounded-[16px]"
                    >
                        下一位
                    </div>
                </div>
                <div className="w-full swiper-bottom-bg absolute bottom-[50px] left-0 z-9 py-[20px]">
                    {/* 底部信息 */}
                    <div className=" text-[#fff]">
                        <div className="">
                            <span>{girlData?.name}</span>
                            <span>{girlData?.age}</span>
                            <span>{girlData?.validTimeslots && '有档期'}</span>
                        </div>
                        <div className="flex">
                            <div className="flex mt-[12px] flex-1">
                                {girlData?.tags?.split(',').map((it, i) => (
                                    <div
                                        className="mx-[4px] px-[8px] py-[4px] border-1 border-[#787778] border-solid rounded-[8px] flex-shrink-0"
                                        key={i}
                                    >
                                        {it}
                                    </div>
                                ))}
                            </div>
                            <Button
                                className="w-[60px] rounded-[8px] h-[34px]"
                                onClick={() => navigate('/dating')}
                            >
                                详情
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
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
                <div>身高: {girlData?.height} cm </div>
                <div>體重: {girlData?.weight} kg</div>
                <div>胸圍:{girlData?.chest}</div>
            </div>
            {/* --------------- */}

            <div className="bg-[#521933] h-[30px] text-[16px] font-bold leading-[30px] pl-[12px] text-[#fff]">
                基本服務
            </div>
            <div className="px-[12px] py-[8px]">
                <BasicServicesFilter
                    filterList={girlData?.serviceItemInfos ?? []}
                />
            </div>
            {/* --------------- */}
            <div className="bg-[#FD6298] h-[30px] text-[16px] font-bold leading-[30px] pl-[12px] text-[#fff]">
                檔期
            </div>
            <div className="px-[12px] py-[8px]">
                <SlotFilter
                    filterList={girlData?.validTimeslots?.split(',') ?? []}
                />
            </div>
            {/* --------------- */}
            <div className="bg-[#521933] h-[30px] text-[16px] font-bold leading-[30px] pl-[12px] text-[#fff]">
                約會詳情
            </div>
            <div className="px-[12px] py-[8px] relative">
                <div>基本服務：按摩三小時兩次 8,000P</div>
                <div>日期：9月11日</div>
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
                        isShowBtn
                        onCancel={() => setIsShowCouponModal(false)}
                    />
                )}
            </div>
            {/* --------------- */}
            <div className="bg-[#FD6298] h-[30px] text-[16px] font-bold leading-[30px] pl-[12px] text-[#fff]">
                聯絡方式
            </div>
            <div className="px-[12px] py-[8px] relative">
                {addressInfo && (
                    <>
                        <div>手機:{addressInfo.tel}</div>
                        <div>tg:{addressInfo.tg}</div>
                        <div>地址:{addressInfo.address}</div>
                    </>
                )}
                <ContactDetailsModal
                    handleChange={(values) => setAddressInfo(values)}
                />
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
                <Button
                    width="w-[80px]"
                    onClick={() => navigate('/dating/startDating')}
                >
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

export default Home;
