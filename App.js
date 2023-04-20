import store from './redux/store/index';
import { Provider } from 'react-redux';
import Application from "./Application/index";

export default function App() {
  return (
  <Provider store={store}>
    <Application/>
  </Provider>
  );
}

