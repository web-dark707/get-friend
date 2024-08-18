import React from 'react';
import ReactDOM from 'react-dom/client';
import { AliveScope } from 'react-activation';
import * as Sentry from '@sentry/react';
import VConsole from 'vconsole';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { ENV_TYPE, sendError } from './config/error';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { getSessionStorage, setSessionStorage } from './utils/storage';
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

//错误监控
Sentry.init({
    dsn: 'https://742164db3632f59dc50fc24386c30ba5@o4505403829059584.ingest.sentry.io/4505703085113344',
    integrations: [
        new Sentry.BrowserTracing({
            tracePropagationTargets: ['localhost', ...Object.keys(ENV_TYPE)],
        }),
        new Sentry.Replay(),
    ],
    beforeSend(event, hint) {
        const errorContent =
            event.exception?.values
                ?.map((item, index) => `${index + 1}. ${item.value}\n`)
                .join(',') ?? '';

        sendError({
            detail: errorContent,
        });
        return event;
    },
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
});

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
root.render(
    <AliveScope>
        <App />
    </AliveScope>,
);

// pwa 杀掉进程 重新启动后 需要刷新来激活摄像头
if (!getSessionStorage('refreshCamera')) {
    setSessionStorage('refreshCamera', true);
    location.reload();
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
