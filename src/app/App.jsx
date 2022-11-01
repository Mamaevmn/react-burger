import { useEffect } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

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
import { CLOSE_MODAL } from '../services/actions/modals';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  let background = location.state && location.state.background;
  const modalVisible = useSelector(store => store.modals.visible);
    

  useEffect(() => { dispatch(getIngredients()) }, [dispatch]);

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
        <Route path="/profile" exact component={ Profile } />
        <Route path="/profile/orders" exact component={ Orders } />
        <Route path="/ingredients/:id" exact component={ Ingredients } />
        <Route component={ NotFound } />
      </Switch>

      {background && modalVisible && 
        <Switch>
          <Route 
            path='/ingredients/:id'
            children={
              <Modal onClose={handleModalClose}>
                <IngredientDetails /> 
              </Modal>
              }
          />
        </Switch>
      }
    </>
  );
}

export default App;
