import './App.scss';
import Nav from './components/navigation/Nav';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import _ from "lodash";
import AppRoutes from './routes/AppRoutes';

function App() {
  const [account, setAccount] = useState({});
  useEffect(() => {
    let session = sessionStorage.getItem('account');
    if (session) {
      setAccount(JSON.parse(session));
    }
  }, [])

  return (
    <>
      <Router>
        <div className="app-header">
          <Nav />
        </div>

        <div className="App-container">
          <AppRoutes />
        </div>
      </Router>

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
    </>


  );
}

export default App;
