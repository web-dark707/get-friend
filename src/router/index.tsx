import React, { lazy, FC, useEffect } from 'react';
import { useRoutes, RouteObject } from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { WrapperRouteComponent } from './config';
import Redirect from './Redirect';

NProgress.configure({ showSpinner: false });
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const Record = lazy(() => import('@/pages/Record'));
const RecordDetail = lazy(() => import('@/pages/RecordDetail'));
const Dating = lazy(() => import('@/pages/Dating'));
const UserCenter = lazy(() => import('@/pages/UserCenter'));
const NotAuthority = lazy(() => import('@/components/ResultPage/NotAuthority'));
const NotFound = lazy(() => import('@/components/ResultPage/NotFound'));
const routeList: RouteObject[] = [
    {
        path: '/',
        element: <Redirect to="/dating" />,
    },
    {
        path: '/userCenter',
        element: (
            <WrapperRouteComponent
                element={<UserCenter />}
                isMotion={false}
                tabBar
                navBar={false}
            />
        ),
    },
    {
        path: '/recordDetail',
        element: (
            <WrapperRouteComponent
                element={<RecordDetail />}
                isMotion={false}
                navBar={false}
            />
        ),
    },
    {
        path: '/record',
        element: (
            <WrapperRouteComponent
                element={<Record />}
                isMotion={false}
                tabBar
                navBar={false}
            />
        ),
    },
    {
        path: '/dating',
        element: (
            <WrapperRouteComponent
                element={<Dating />}
                isMotion={false}
                tabBar
                navBar={false}
            />
        ),
    },
    // {
    //     path: '/dating/startDating',
    //     element: (
    //         <WrapperRouteComponent
    //             element={<StartDating />}
    //             isMotion={false}
    //             tabBar
    //             navBar={false}
    //         />
    //     ),
    // },
    {
        path: '/login',
        element: (
            <WrapperRouteComponent
                element={<Login />}
                auth={false}
                navBar={false}
                isMotion={false}
                title="登入"
            />
        ),
    },
    {
        path: '/register',
        element: (
            <WrapperRouteComponent
                element={<Register />}
                auth={false}
                navBar={false}
                isMotion={false}
                title="註冊"
            />
        ),
    },
    {
        path: '*' || '/404',
        element: (
            <WrapperRouteComponent
                element={<NotFound />}
                auth={false}
                navBar={false}
            />
        ),
    },
    {
        path: '/403',
        element: (
            <WrapperRouteComponent
                element={<NotAuthority />}
                auth={false}
                navBar={false}
            />
        ),
    },
];

const RenderRouter: FC = () => {
    useEffect(() => {
        NProgress.done();
        return () => {
            NProgress.start();
        };
    });
    return useRoutes(routeList);
};

export default RenderRouter;
