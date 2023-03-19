import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import SignUp from './Component/Login/SignUp';
import Login from './Component/Login/Login';
import Home from './Component/Home';
import HomeManager from './Component/Manager/HomeManager'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/signup' element={<SignUp />}></Route>
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/HomeManager' element={<HomeManager />}></Route>
        </Routes>
      </Router>

      {/* <Home/>
    <HomeManeger/> */}
    </>
  );
}

export default App;
