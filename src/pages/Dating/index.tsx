import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCards } from 'swiper';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/vip-ui';
import { getDatingGirl, getDatingGirls } from '@/api/home';
import { isEmpty } from '@/utils/tools';
import { DatingGirlsResult } from '@/types/api/home';
import { useSetHasOpen } from '@/store/common/hooks';
import Header from './components/Header';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';
import Details from './components/Details';
const Dating: FC = () => {
    const [girlData, setGirlData] = useState<DatingGirlsResult>();
    const swiperRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isShowDetails, setIsShowDetails] = useState(false);
    const setHasOpen = useSetHasOpen();
    const {
        mutateAsync: mutateDatingGirls,
        data: girlList,
        isLoading,
    } = useMutation(getDatingGirls, {
        onSuccess: (res) => {
            setGirlData(res.data[activeIndex]);
        },
    });
    const { mutateAsync: mutateDatingGirl } = useMutation(getDatingGirl, {
        onSuccess: (res) => {
            if (res.data) {
                setGirlData(res.data);
            }
        },
    });
    // 搜索
    const handleSearch = useCallback(
        (filters) => {
            mutateDatingGirls({
                filters,
            });
        },
        [mutateDatingGirls],
    );

    const handleNext = useCallback(() => {
        mutateDatingGirl({ girlId: girlData.id });
        setActiveIndex((prevIndex) => {
            const index = (prevIndex + 1) % girlList?.data.length;
            setGirlData(girlList?.data[index]);
            return index;
        });
        swiperRef.current.swiper.slideTo(0);
    }, [girlData?.id, girlList?.data, mutateDatingGirl]);

    const handlePrev = useCallback(() => {
        mutateDatingGirl({ girlId: girlData.id });
        setActiveIndex((prevIndex) => {
            const index =
                prevIndex === 0 ? girlList?.data.length - 1 : prevIndex - 1;
            setGirlData(girlList?.data[index]);
            return index;
        });
        swiperRef.current.swiper.slideTo(0);
    }, [girlData?.id, girlList?.data, mutateDatingGirl]);

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

    const handelShowDetails = () => {
        setIsShowDetails(!isShowDetails);
        setHasOpen(!isShowDetails);
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
                    {girlData?.pics.split(',').map((it) => (
                        <SwiperSlide className="w-full h-full" key={it}>
                            <img
                                className="w-full h-full"
                                src={'https://img.sakuraclubjp.com/' + it}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                {!isShowDetails && !isLoading && (
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
                {/* 底部信息 */}
                {!isEmpty(girlData) && (
                    <div className="w-full text-[#fff] bg-[#000] absolute bottom-0 left-0 z-9 py-[12px] px-[8px]">
                        <div className="">
                            <div className="text-[20px]">
                                <span>{girlData?.name}&nbsp;</span>
                                <span>{girlData?.age}&nbsp;</span>
                                <span className="text-[14px]">
                                    {girlData?.validTimeslots && '有档期'}
                                </span>
                                <span className="text-[14px] ml-[12px]">
                                    点击图片显示下一张
                                </span>
                            </div>
                            <div className="flex items-center">
                                <div className="flex mt-[12px] flex-1 flex flex-wrap">
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
                                    loading={isLoading}
                                    className="w-[70px] rounded-[8px] h-[34px] flex-shrink-0"
                                    onClick={handelShowDetails}
                                >
                                    {isShowDetails
                                        ? '返回'
                                        : isEmpty(girlData?.validTimeslots)
                                        ? '详情'
                                        : '约会'}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* 详情 */}
            {isShowDetails && <Details girlData={girlData} />}
        </div>
    );
};

export default Dating;
