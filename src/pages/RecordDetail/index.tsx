import React, { FC, useState } from 'react';
import './styles.scss';
import { useNavigate } from 'react-router';

const Home: FC = () => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    return (
        <div className="my">
            <header className="header">
                <div className="left" onClick={() => navigate('/record')}>
                    <img src={require('@/assets/images/icon/other/back.png')} />
                    <span>約會記錄詳情</span>
                </div>
                <div className="right"></div>
            </header>
            <div className="asset">
                <p className="title">約會內容</p>
                <div className="detail">
                    <p>女生: Bella 19</p>
                    <p>基本服務: 三小時兩次</p>
                    <p>日期: 9月11日</p>
                </div>
            </div>
            <div className="asset-2">
                <p className="title">聯絡方式</p>
                <div className="detail">
                    <p>手機:09987633253</p>
                    <p>tg: markZhang123</p>
                    <p>地址: shore A residence, 1213</p>
                </div>
            </div>
            <div className="asset">
                <p className="title">支付訊息</p>
                <div className="detail">
                    <p>優惠價:8000P</p>
                    <p>優惠券:1000P</p>
                    <p>應付款項: 7000P</p>
                </div>
            </div>
            <div className="asset-4">
                <p className="title">支付方式</p>
                <div className="detail">
                    <p>USDT trc20</p>
                    <p>位址:TXPCXCn***Yb4YPwR6</p>
                    <p>實際支付: 140 U</p>
                    <p>即時匯率: 50.7</p>
                    <p>支付狀態: 已支付</p>
                    <p>到款時間: 2024-09-12 12:44:23</p>
                    <p>支付特權: 先享後付</p>
                    <article>
                        注意：此地址只接收trc20協議的USDT，充入其它幣種無法到賬，且無法找回，支付金額需等於上面所示實際支付金額，少充無法到賬，多充無法補回，由操作失誤導致的資金問題平台概不付責
                    </article>
                </div>
            </div>
            <div className="boon">
                <span></span>
                <span className="show-more" onClick={() => setVisible(true)}>
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
    );
};

export default Home;
