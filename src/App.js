import './App.scss';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Nav from './components/navigation/Nav';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Nav /> */}
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
          <Route path="/" exact>Home</Route>
          <Route path="*">404 Not Found</Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
