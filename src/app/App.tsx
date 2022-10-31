import { BrowserRouter, Switch, Route } from 'react-router-dom';

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

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
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
    </BrowserRouter>
  );
}

export default App;
