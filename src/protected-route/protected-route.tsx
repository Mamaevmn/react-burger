import { useEffect, FC, ReactElement } from 'react';
import { Redirect, Route, useLocation } from "react-router-dom";
import { getUser } from "../services/actions/user";
import {useDispatch, useSelector} from "../services/hooks";

type TProtectedRoute = { 
    path: string;
    exact: boolean;
    component: () => ReactElement
}

const ProtectedRoute: FC<TProtectedRoute> = ({ ...props }) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const userAuth = useSelector(store => store.user.auth);

    useEffect(() => {
        if (!userAuth) dispatch(getUser());
    }, [dispatch, userAuth])

    return userAuth
        ? <Route {...props} />
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
