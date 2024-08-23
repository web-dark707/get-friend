import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCards } from 'swiper';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/vip-ui';
import { getDatingGirls } from '@/api/home';
import { DatingGirlsResult } from '@/types/api/home';
import Header from './components/Header';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';
import Details from './components/Details';
const Home: FC = () => {
    const [girlData, setGirlData] = useState<DatingGirlsResult>();
    const swiperRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isShowDetails, setIsShowDetails] = useState(false);

    const { mutateAsync: mutateDatingGirls, data: girlList } = useMutation(
        getDatingGirls,
        {
            onSuccess: (res) => {
                setGirlData(res.data[activeIndex]);
            },
        },
    );

    const handleNext = useCallback(() => {
        setActiveIndex((prevIndex) => {
            const index = (prevIndex + 1) % girlList?.data.length;
            setGirlData(girlList?.data[index]);
            return index;
        });
    }, [girlList?.data]);

    const handlePrev = useCallback(() => {
        setActiveIndex((prevIndex) => {
            const index =
                prevIndex === 0 ? girlList?.data.length - 1 : prevIndex - 1;
            setGirlData(girlList?.data[index]);
            return index;
        });
    }, [girlList?.data]);

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
        mutateDatingGirls({
            filters,
        });
    };

    const handelShowDetails = () => {
        setIsShowDetails(!isShowDetails);
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }, 0);
    };

    useEffect(() => {
        mutateDatingGirls({
            filters: {},
        });
    }, [mutateDatingGirls]);

    return (
        <div className="w-full h-full">
            <Header
                isShowDetails={isShowDetails}
                girlData={girlData}
                onSelected={handleSearch}
            />
            <div className="relative w-full h-[calc(100%-50px)] overflow-hidden">
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
                    {girlData?.pics.split(',').map((it, i) => (
                        <SwiperSlide className="w-full h-full" key={i}>
                            <img className="w-full h-full" src={it} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                {!isShowDetails && (
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
                )}
                <div className="w-full swiper-bottom-bg absolute bottom-0 left-0 z-9 py-[20px]">
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
                                onClick={handelShowDetails}
                            >
                                {isShowDetails ? '返回' : '详情'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {/* 详情 */}
            {isShowDetails && <Details girlData={girlData} />}
        </div>
    );
};

export default Home;
