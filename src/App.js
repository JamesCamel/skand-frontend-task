import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import User from './containers/User';
import UserList from './containers/UserList';
import EditForm from './containers/EditForm';
import Login from './containers/Login';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/" exact component={UserList} />
            <Route path="/users/:id" exact component={User} />
            <Route path="/users/:id/edit" exact component={EditForm} />
            <Route path="/login" exact component={Login} />
            <Redirect to="/" />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
