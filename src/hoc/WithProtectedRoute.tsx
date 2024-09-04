import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';

interface WithAuthRedirectProps {
  component: React.ComponentType<any>;
  redirectTo: string;
}

const WithProtectedRoute = (WrappedComponent: React.ComponentType<any>) => {
    return (props: any) => {
        const navigate = useNavigate();
        const isAuthorized = useSelector((state: RootState) => state.auth.isAuthorized);

        useEffect(() => {
            if (!isAuthorized) {
                navigate('/login')
            }
        }, [isAuthorized, navigate]);

        return isAuthorized ? <WrappedComponent {...props} /> : null;
    };
};

export default WithProtectedRoute;