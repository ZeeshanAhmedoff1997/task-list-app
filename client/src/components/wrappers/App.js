import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Todo from '../ui/Todo';
import Login from '../ui/Login';
import SignUp from '../ui/SignUp';
import Profile from '../ui/Profile';
import DeleteAccountModal from '../ui/deleteAccountModal';
import About from '../ui/about';
import ForgotPassword from '../ui/forgotPassword';
import UpdatePassword from '../ui/updatePassword';
import ResetPassword from '../ui/resetPassword';

import Header from '../hoc/header';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const App = () => {
  const authToken = localStorage.getItem('token');
  const [token, setToken] = useState(authToken);
  let routes = (
    <Switch>
      <Route exact path="/" render={() => <Login setToken={setToken} />} />
      <Route path="/sign-in" render={() => <Login setToken={setToken} />} />
      <Route path="/sign-up" render={() => <SignUp setToken={setToken} />} />
      <Route path="/about" component={About} />
      <Route path="/password/reset" component={ForgotPassword} />
      {/* <Route path="/user/password/reset/:token" component={ResetPassword} /> */}
      <Route
        path="/user/password/reset/:token"
        render={() => <ResetPassword setToken={setToken} />}
      />
      <Redirect to="/" />
    </Switch>
  );

  if (token) {
    routes = (
      <Switch>
        {/* <Route exact path='/' render={() => <Login setToken={setToken}/>} />
            <Route path="/sign-in" render={() => <Login setToken={setToken}/>} />
            <Route path="/sign-up" render={() => <SignUp setToken={setToken}/>} /> */}
        <Route path="/todo" render={() => <Todo token={token} />} />
        <Route path="/me" render={() => <Profile token={token} />} />
        <Route
          path="/delete"
          render={() => (
            <DeleteAccountModal token={token} setToken={setToken} />
          )}
        />
        <Route path="/about" component={About} />
        <Route
          path="/update-password"
          render={() => <UpdatePassword token={token} setToken={setToken} />}
        />
        <Redirect to="/todo" />
      </Switch>
    );
  }

  return (
    <Router>
      <div className="App">
        <Header token={token} setToken={setToken} />
        <div className="outer">
          {routes}
          <div
            style={{
              position: 'fixed',
              bottom: '0',
              right: '0',
              margin: '0px 40px 30px',
              fontFamily: 'monospace',
            }}
          >
            Try Hack me Technical Assesment
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
