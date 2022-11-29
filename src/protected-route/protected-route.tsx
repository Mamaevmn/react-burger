import { useEffect, FC } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import { getUser } from "../services/actions/user";

type TProtectedRoute = { children: React.ReactNode }
type TStore = { user: { auth: boolean } }

const ProtectedRoute: FC<TProtectedRoute> = ({ children }: any) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const userAuth: any = useSelector<TStore>(store => store.user.auth);

    useEffect(() => {
        if (!userAuth) dispatch<any>(getUser());
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
