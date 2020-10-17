import React from 'react';
// import axios from 'axios';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import User from './containers/User';
import UserList from './containers/UserList';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/" exact component={UserList} />
            <Route path="/users/:id" exact component={User} />
            <Redirect to="/" />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
