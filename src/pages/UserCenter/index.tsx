import React, { FC } from 'react';
import './styles.scss';
const Home: FC = () => {
    return (
        <div className="my">
            <header className="header">
                <span>我的</span>
                <img src={require('@/assets/images/home/my-logo.jpg')} />
            </header>
            <div className="asset">
                <p className="title">帳號資訊</p>
                <div className="detail">
                    <p>登入帳號: ak345</p>
                    <p>啟用設定: YFNd943c#$</p>
                    <p>會員等級: VIP</p>
                </div>
            </div>
            <div className="boon">
                <span>會員福利</span>
                <span className="show-more">查看優惠券</span>
            </div>
            <div className="content">
                <div className="line-1">推廣福利</div>
                <div className="line-2">
                    平台推出推廣福利，每位會員可以複製邀請連結並發送好友加入俱樂部，新增會員將獲得1000P優惠券，且新增會員第一次消費成功後，推廣會員將獲得價值2000P優惠券
                </div>
                <div className="line-3">
                    本平台為私人俱樂部，不對外開放註冊，均為邀請制，會員資格有限，請珍惜名額
                </div>
                <div className="line-4">
                    <p>
                        <span>名额1:未註冊</span>
                        <span>複製註冊連接</span>
                    </p>
                    <p>
                        <span>名额1:未註冊</span>
                        <span>複製註冊連接</span>
                    </p>
                    <p>
                        <span>名额1:未註冊</span>
                        <span>複製註冊連接</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;
