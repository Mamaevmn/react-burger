import appStyles from './App.module.css';
import AppHeader from './../app-header/app-header';
import AppMain from './../app-main/app-main';

function App() {
  return (
    <div className={appStyles.App}>
      <AppHeader />
      <AppMain />
    </div>
  );
}

export default App;
