import './App.scss';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Nav from './components/navigation/Nav';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UsersPage from './components/user/Users';
import { useEffect, useState } from 'react';
import _ from "lodash";

function App() {
  const [account, setAccount] = useState({});
  useEffect(() => {
    let session = sessionStorage.getItem('account');
    if (session) {
      setAccount(JSON.parse(session));
    }
  }, [])

  return (
    <Router>
      <div className="App">
        {account && !_.isEmpty(account) && account.isAuthenticated &&
          <Nav />
        }
        <Switch>
          <Route path="/news">News</Route>
          <Route path="/about">About</Route>
          <Route path="/contact">Contact</Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/users">
            <UsersPage />
          </Route>
          <Route path="/" exact>Home</Route>
          <Route path="*">404 Not Found</Route>
        </Switch>
      </div>

      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Router>

  );
}

export default App;
