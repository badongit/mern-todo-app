
import React from 'react';
import { useSelector } from 'react-redux';
import Loading from 'components/Loading';
import { Redirect } from 'react-router-dom';

function ProtectedRoute(WrappedComponent) {
    function HOC(props) {
        const auth = useSelector(state => state.auth);
        const { isAuthenticated, authLoading } = auth; 

        if(authLoading) 
            return <Loading />
        else if(isAuthenticated)
            return (
                <WrappedComponent {...props} />
            )
        else 
            return <Redirect to='/login' />
    };

    return HOC;
}

export default ProtectedRoute;