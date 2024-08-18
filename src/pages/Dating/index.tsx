import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCards } from 'swiper';
import { Button } from '@/components/vip-ui';
import { handleClipboard } from '@/utils/clipboard';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';

const Dating: FC = () => {
    const imageList = [
        'https://via.placeholder.com/800x400?text=Slide+1',
        'https://via.placeholder.com/800x400?text=Slide+2',
        'https://via.placeholder.com/800x400?text=Slide+3',
    ];
    const items = ['学生', 'nice', 'absc'];

    const navigate = useNavigate();

    return (
        <div className="bg-[#fff] h-full">
            <div className="w-full h-[50px] bg-primaryColor text-[#fff] text-[16px] font-bold leading-[50px] pl-[12px]">
                Name Age
            </div>
            <div className="relative w-full h-[calc(100vh-200px)] overflow-hidden">
                <Swiper
                    effect={'cards'}
                    grabCursor={true}
                    pagination={{ clickable: true }} // 启用分页器
                    modules={[Pagination, EffectCards]}
                    className="w-full h-full"
                    loop
                >
                    {imageList.map((it, i) => (
                        <SwiperSlide key={i}>
                            <img className="w-full h-full" src={it} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="w-full swiper-bottom-bg absolute bottom-0 left-0 z-9 py-[20px]">
                    {/* 底部信息 */}
                    <div className=" text-[#fff]">
                        <div className="">
                            <span>Name</span>
                            <span>Age</span>
                            <span>有档期</span>
                        </div>
                        <div className="flex">
                            <div className="flex mt-[12px] flex-1">
                                {items.map((it, i) => (
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
            <div className="px-[12px] py-[8px]">
                I am shcool girl beatufil girl want to find a good boy friend to
                have happy life, when people chrish I chrish
            </div>
            {/* --------------- */}
            <div className="bg-[#521933] h-[30px] text-[16px] font-bold leading-[30px] pl-[12px] text-[#fff]">
                體檢報告
            </div>
            <div className="flex justify-between items-center px-[12px] py-[8px]">
                <div>體檢時間: 2024-09-09</div>
                <Button width="w-[80px]">查看报告</Button>
            </div>
            {/* --------------- */}

            <div className="bg-[#FD6298] h-[30px] text-[16px] font-bold leading-[30px] pl-[12px] text-[#fff]">
                基本訊息
            </div>
            <div className="px-[12px] py-[8px]">
                身高: 165 cm 體重: 50 kg 胸圍: 32B
            </div>
            {/* --------------- */}

            <div className="bg-[#521933] h-[30px] text-[16px] font-bold leading-[30px] pl-[12px] text-[#fff]">
                基本服務
            </div>
            <div className="px-[12px] py-[8px]">
                <div>按摩三小時兩次 原價:12,000P 活動價:8,000P</div>
                <div>按摩三小時兩次 原價:12,000P 活動價:8,000P</div>
            </div>
            {/* --------------- */}
            <div className="bg-[#FD6298] h-[30px] text-[16px] font-bold leading-[30px] pl-[12px] text-[#fff]">
                檔期
            </div>
            <div className="px-[12px] py-[8px]">9月11日</div>
            {/* --------------- */}
            <div className="bg-[#521933] h-[30px] text-[16px] font-bold leading-[30px] pl-[12px] text-[#fff]">
                約會詳情
            </div>
            <div className="px-[12px] py-[8px] relative">
                <div>基本服務：按摩三小時兩次 8,000P</div>
                <div>日期：9月11日</div>
                <Button
                    className=" absolute right-[12px] bottom-[12px]"
                    width="w-[80px]"
                >
                    使用優惠券
                </Button>
            </div>
            {/* --------------- */}
            <div className="bg-[#FD6298] h-[30px] text-[16px] font-bold leading-[30px] pl-[12px] text-[#fff]">
                聯絡方式
            </div>
            <div className="px-[12px] py-[8px]">
                <div>手機：09987633253</div>
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

export default Dating;
