import React, { FC, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import { Pagination, EffectCards } from 'swiper';
import { Button } from '@/components/vip-ui';
import Search from './components/Search';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';
const Home: FC = () => {
    const navigate = useNavigate();

    const [activeIndex, setActiveIndex] = useState(0);
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
    const items = ['学生', 'nice', 'absc'];

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
        // setActiveIndex((prevIndex) => (prevIndex + 1) % imageList.length);
    };

    return (
        <div className="w-full h-full overflow-hidden">
            <Search />
            <div className="relative w-full h-full overflow-hidden">
                <Swiper
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

export default Home;
