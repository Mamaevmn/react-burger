import { useEffect, FC } from 'react';
import { Redirect, useLocation } from "react-router-dom";
import { getUser } from "../services/actions/user";
import {useDispatch, useSelector} from "../services/hooks";

type TProtectedRoute = { children: React.ReactNode }

const ProtectedRoute: FC<TProtectedRoute> = ({ children }: any) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const userAuth = useSelector(store => store.user.auth);

    useEffect(() => {
        if (!userAuth) dispatch(getUser());
    }, [dispatch, userAuth])

    return userAuth
        ? children
        : <Redirect
            to={{
                pathname: '/login',
                state: {
                    from: location
                }
            }}
        />
};

export default ProtectedRoute;
