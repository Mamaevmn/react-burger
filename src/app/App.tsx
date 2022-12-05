import { useEffect } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';

import Header from '../components/header/header';
import Main from '../pages/main/main';
import Login from '../pages/login/login';
import Registration from '../pages/registration/registration';
import RecoveryPassword from '../pages/recovery-password/recovery-password';
import ResetPassword from '../pages/reset-password/reset-password';
import Profile from '../pages/profile/profile';
import NotFound from '../pages/not-found/not-found';
import Ingredients from '../pages/ingredients/ingredients';
import Orders from '../pages/orders/orders';
import { getIngredients } from '../services/actions/ingredients';
import Modal from '../components/modal/modal';
import IngredientDetails from '../components/modal-ingredient-details/modal-ingredient-details';
import { CLOSE_MODAL, OPEN_MODAL, WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../services/constants';
import { ILocation } from '../utils/types';
import ProtectedRoute from '../protected-route/protected-route';
import OrderInfo from "../pages/order-info/order-info";
import Feed from "../pages/feed/feed";
import {useDispatch, useSelector} from "../services/hooks";
import ModalOrderInfo from "../components/modal-order-info/modal-order-info";

function App() {
  const dispatch = useDispatch();
  const location = useLocation<ILocation | Location | any>();
  const history = useHistory();
  const background = location.state && location.state.background;
  const modalVisible = useSelector(store => store.modals.visible);
    
  useEffect(() => {
    if (background) dispatch({ type: OPEN_MODAL })
  }, [dispatch, modalVisible, background])

  useEffect(() => { dispatch(getIngredients()) }, [dispatch]);

  useEffect(() => {    
    if (location.pathname.includes('orders') || location.pathname.includes('feed')) dispatch({ type: WS_CONNECTION_START })
    else dispatch({ type: WS_CONNECTION_CLOSED })
  }, [location, dispatch])

  const handleModalClose = () => {    
    history.goBack()
    dispatch({ type: CLOSE_MODAL })
  }

  return (
    <>
      <Header />
      <Switch location={background || location}>
        <Route path="/" exact component={ Main } />
        <Route path="/login" exact component={ Login } />
        <Route path="/registration" exact component={ Registration } />
        <Route path="/recovery-password" exact component={ RecoveryPassword } />
        <Route path="/reset-password" exact component={ ResetPassword } />
        <Route path="/ingredients/:id" exact component={ Ingredients } />
        <ProtectedRoute path="/profile" exact component={Profile} /> 
        <ProtectedRoute path="/profile/orders" exact component={Orders} /> 
        <ProtectedRoute path="/profile/orders/:id" exact component={ OrderInfo } /> 
        <Route path="/feed/" exact component={ Feed } />
        <Route path="/feed/:id" exact component={ OrderInfo } />
        <Route component={ NotFound } />
      </Switch>

      {background && 
        <Switch>
          <Route 
            path='/ingredients/:id'
            children={
              <Modal onClose={handleModalClose}>
                <IngredientDetails /> 
              </Modal>
              }
          />
          <Route
              path='/feed/:id'
              children={
                <Modal onClose={handleModalClose}>
                  <ModalOrderInfo />
                </Modal>
              }
          />
          <Route
              path='/profile/orders/:id'
              children={
                <Modal onClose={handleModalClose}>
                  <ModalOrderInfo />
                </Modal>
              }
          />
        </Switch>
      }
    </>
  );
}

export default App;
