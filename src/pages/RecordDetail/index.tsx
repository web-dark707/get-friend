import React, { FC, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { getQueryString } from '@/utils/tools';
import './styles.scss';
import { getRecordDetail } from '@/api/record';
import Datalist from '@/components/DataList';
import NavBar from '@/components/NavBar';
import { formatLabel } from '@/common/format';
import { orderStatus } from '@/common/options/record';

const Home: FC = () => {
    const navigate = useNavigate();
    const id = getQueryString('id');
    const [visible, setVisible] = useState(false);
    const {
        mutateAsync: mutateRecordDetail,
        data,
        isLoading,
    } = useMutation(getRecordDetail);

    useEffect(() => {
        mutateRecordDetail({ datingId: id });
    }, [id, mutateRecordDetail]);

    return (
        <Datalist isLoading={isLoading} noData={!data?.data}>
            <div className="my">
                <NavBar title="約會記錄詳情" />
                <div className="bg-[#521933] h-[30px] text-[16px] font-bold leading-[30px] pl-[12px] text-[#fff]">
                    約會內容
                </div>
                <div className="px-[12px] py-[8px] relative">
                    <div>女生：{data?.data.girlName}</div>
                    <div>
                        基本服務：
                        {data?.data?.serviceItems.map((it, i) => (
                            <span key={i}>{it.name}</span>
                        ))}
                    </div>
                    <div>
                        日期：{data?.data.timeslot} 時間:{data?.data?.hour}
                    </div>
                </div>
                <div className="bg-[#FD6298] h-[30px] text-[16px] font-bold leading-[30px] pl-[12px] text-[#fff]">
                    聯絡方式
                </div>
                <div className="px-[12px] py-[8px] relative">
                    <div>手機:{data?.data?.tel}</div>
                    <div>tg:{data?.data?.tg}</div>
                    <div>地址:{data?.data?.address}</div>
                </div>
                <div className="asset">
                    <p className="title">支付訊息</p>
                    <div className="detail">
                        <p>優惠價:{data?.data.realPayPrice}P</p>
                        <p>優惠券:1000P</p>
                        <p>應付款項: 7000P</p>
                    </div>
                </div>
                <div className="asset-4">
                    <p className="title">支付方式</p>
                    <div className="detail">
                        <p>USDT trc20</p>
                        <p>位址:{data?.data.usdtAddress}</p>
                        <p>實際支付: {data?.data.usdtPrice} U</p>
                        <p>即時匯率: {data?.data.usdtToPhpRate}</p>
                        <p>
                            支付狀態:
                            {formatLabel(orderStatus, data?.data.status)}
                        </p>
                        <p>到款時間: 2024-09-12 12:44:23</p>
                        <p>支付特權: 先享後付</p>
                        <article>
                            注意：此地址只接收trc20協議的USDT，充入其它幣種無法到賬，且無法找回，支付金額需等於上面所示實際支付金額，少充無法到賬，多充無法補回，由操作失誤導致的資金問題平台概不付責
                        </article>
                    </div>
                </div>
                <div className="boon">
                    <span></span>
                    <span
                        className="show-more"
                        onClick={() => setVisible(true)}
                    >
                        我要投訴
                    </span>
                </div>
                <div className="remark">
                    <p className="bold">投诉内容</p>
                    <p>投诉时间: 2024-09-10 12:44:12</p>
                    <p>态度不好，未满三小时</p>
                    <p className="bold">处理结果</p>
                    <p>回复时间: 2024-09-10 12:44:12</p>
                    <p>经调查属实，补偿相应金额1000P优惠券到会员账户</p>
                </div>
                <div className="footer">
                    <img src={require('@/assets/images/home/my-logo.jpg')} />
                </div>
            </div>
        </Datalist>
    );
};

export default Home;
