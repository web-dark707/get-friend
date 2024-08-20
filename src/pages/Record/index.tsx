import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import './styles.scss';
const Home: FC = () => {
    const navigate = useNavigate();
    return (
        <div className="my">
            <header className="header">
                <div className="left-wrap">
                    <span>約會記錄</span>
                </div>
                <div className="right-wrap">所有</div>
            </header>
            <ul className="orders">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
                    return (
                        <li
                            className="item"
                            key={item}
                            onClick={() => navigate('/recordDetail')}
                        >
                            <p>
                                編號:103354405779327385
                                <span className="status-1">投诉处理中</span>
                            </p>
                            <p className="bold">
                                日期:09-07
                                <span className="status-2">可付款</span>
                            </p>
                            <p className="bold">姓名:Bella 19</p>
                            <p className="bold">
                                价格:150U
                                <span className="status-3">已结束</span>
                            </p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Home;
