import './App.scss';
import Nav from './components/navigation/Nav';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import _ from "lodash";
import AppRoutes from './routes/AppRoutes';
import { Triangle } from 'react-loader-spinner';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';

function App() {
  const { user } = useContext(UserContext)
  return (
    <>
      <Router>
        {user && user.isLoading ?
          <div style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <Triangle
              height="100"
              width="100"
              color='black'
              ariaLabel='Loading'
            />
            <div style={{ fontFamily: "Lexend", fontWeight: 600 }}>Loading...</div>
          </div>

          :
          <>
            <div className="app-header">
              <Nav />
            </div>

            <div className="App-container">
              <AppRoutes />
            </div>
          </>
        }

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
