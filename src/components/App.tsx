import appStyles from './App.module.css';
import AppHeader from './app-header/app-header';
import data from './../utils/data';
import AppMain from './app-main/app-main';

function App() {
  return (
    <div className={appStyles.App}>
      <AppHeader />
      <AppMain data={data}/>
    </div>
  );
}

export default App;
