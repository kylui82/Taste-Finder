import store from './redux/store/index';
import { Provider } from 'react-redux';
import Application from "./application/index";

export default function App() {
  return (
  <Provider store={store}>
    <Application/>
  </Provider>
  );
}
