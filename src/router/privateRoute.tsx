import React from 'react';
import { Navigate } from 'react-router-dom';
import UserToken from '@/common/token';
import { usePollingVerify } from '@/common/polling_ws';

const PrivateRoute = (props: any) => {
    usePollingVerify();
    const token = UserToken.getToken();
    return token ? props.element : <Navigate to={'/login'} replace />;
};

export default PrivateRoute;
