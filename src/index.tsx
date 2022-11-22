import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import './index.css';

import App from './app/App';
import reportWebVitals from './reportWebVitals';
import { rootReducer } from './services/reducers';

const enhancer = composeWithDevTools(
  applyMiddleware(thunk),
);

const store = createStore(rootReducer, enhancer);

// export type RootState = ReturnType<typeof store.getState>

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

reportWebVitals();