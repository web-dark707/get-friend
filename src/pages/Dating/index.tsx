import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCards } from 'swiper';
import { Button } from '@/components/vip-ui';
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
        </div>
    );
};

export default Dating;
