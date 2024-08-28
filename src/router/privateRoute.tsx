import React from 'react';
import { Navigate } from 'react-router-dom';
import UserToken from '@/common/token';

const PrivateRoute = (props: any) => {
    const token = UserToken.getToken();

    return token ? (
        props.element
    ) : (
        <Navigate
            to={{ pathname: '/login' }}
            state={{
                pathname: location.pathname,
                search: location.search,
            }}
            replace
        />
    );
};

export default PrivateRoute;
