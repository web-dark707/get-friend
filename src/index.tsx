import React from 'react';
import ReactDOM from 'react-dom/client';
import { AliveScope } from 'react-activation';
import VConsole from 'vconsole';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { ENV_TYPE } from './config/error';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@/locales'; //国际化
import 'swiper/swiper.css';
import 'swiper/css/pagination';
import './assets/css/base.css';
import './assets/scss/global.scss';
import './assets/scss/windicss.scss';
import './virtual:windi.css';

if (Object.keys(ENV_TYPE).includes(window.location.host)) {
    const vConsole = new VConsole();
}

// 加载插件
dayjs.extend(utc);
dayjs.extend(timezone);
// 设置全局默认时区为北京时间
dayjs.tz.setDefault('Asia/Shanghai');

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
root.render(
    <AliveScope>
        <App />
    </AliveScope>,
);

reportWebVitals();
