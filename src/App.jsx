import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Router } from 'react-router-dom';
import Routers from './routing';
import history from './utils/history';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  render() {
    const { store, persistor } = this.props;
    return (
      <Provider store={store}>
        {/* loading can be null */}
        <PersistGate loading={null} persistor={persistor}>
          <Router history={history}>
              <>
                <div className="App">
                  <Routers />
                </div>
              </>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}
export default App;
