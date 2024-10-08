import React, { FC, Suspense } from 'react';
import { RouteProps } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { localeState } from '@/store/common/atoms';
import { API_URL } from '@/common/constants';
import NavBar from '@/components/NavBar';
import TabBar from '@/components/TabBar';
import { Loading } from '@/components/vip-ui';
import PrivateRoute from './privateRoute';

export type WrapperRouteProps = RouteProps & {
    auth?: boolean; // 是否需要登录
    isMotion?: boolean; // 是否需要动画
    navBar?: boolean; // 是否需要顶部导航
    tabBar?: boolean; // 是否需要底部导航
    pageBg?: string; // 页面背景图
    title?: string; // 页面标题
};

const PublicRoute = (props: any) => {
    return props.element;
};

export const WrapperRouteComponent: FC<WrapperRouteProps> = ({
    title = '',
    auth = true,
    isMotion = true,
    navBar = true,
    tabBar = false,
    pageBg = 'page-bg',
    ...props
}) => {
    const locale = useRecoilValue(localeState);

    const WitchRoute = auth ? PrivateRoute : PublicRoute;
    // 顶部导航返回不显示的页面
    const callPathList = ['/userCenter'];

    return (
        <HelmetProvider>
            <Helmet>
                <html lang={locale.locale} />
                <meta property="og:title" content={title} />
                <title>{title}</title>
                <link rel="canonical" href={API_URL} />
            </Helmet>
            <main
                className={classNames(
                    'flex flex-col w-full h-full text-baseColor text-baseSize break-words',
                    pageBg,
                )}
            >
                {navBar && (
                    <NavBar
                        title={title}
                        type={
                            callPathList.includes(location.pathname)
                                ? 'cell'
                                : 'nav'
                        }
                    />
                )}
                <div
                    className={classNames(
                        'flex-1 overflow-y-auto overflow-x-hidden',
                        {
                            'pb-60px': tabBar,
                        },
                    )}
                >
                    <Suspense
                        fallback={
                            <div className="fixed inset-0 flex-row-center">
                                <Loading size={20} />
                            </div>
                        }
                    >
                        {isMotion ? (
                            <motion.div
                                key={title}
                                initial={{ opacity: 0, y: '20vw' }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                                className="w-full h-full overflow-y-auto overflow-x-hidden"
                            >
                                <WitchRoute {...props} />
                            </motion.div>
                        ) : (
                            <WitchRoute {...props} />
                        )}
                    </Suspense>
                </div>
                {tabBar && <TabBar />}
            </main>
        </HelmetProvider>
    );
};
