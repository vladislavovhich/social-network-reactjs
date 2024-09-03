import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';

interface WithAuthRedirectProps {
  component: React.ComponentType<any>;
  redirectTo: string;
}

const withAuthRedirect = (WrappedComponent: React.ComponentType<any>, redirectTo: string, checkAuthorized = true) => {
    return (props: any) => {
        const navigate = useNavigate();
        const isAuthorized = useSelector((state: RootState) => state.auth.isAuthorized);

        useEffect(() => {
            if (!checkAuthorized && !isAuthorized) {
                navigate(redirectTo)
            }
            
            if (checkAuthorized && isAuthorized) {
                navigate(redirectTo);
            }
        }, [isAuthorized, navigate, redirectTo]);

        return isAuthorized ? <WrappedComponent {...props} /> : null;
    };
};

export default withAuthRedirect;