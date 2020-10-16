import React from 'react';
// import axios from 'axios';
import { Switch, Route, NavLink, Redirect, BrowserRouter} from "react-router-dom";
import User from './containers/User';
import UserList from './containers/UserList';
import { Provider } from "react-redux";
import store from './store'


const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path={"/"} exact component={UserList} />
            <Route path={"/user/:id"} exact component={User} />
            <Redirect to={"/"} />
          </Switch>
        </div>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
