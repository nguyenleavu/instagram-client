import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import routes from '@/config/routes';

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector((state) => state.auth);
    const router = useRouter();

    if (!user) {
        router.push(routes.login);
    }
    
    return children;
};

export default ProtectedRoute;
