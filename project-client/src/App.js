import logo from './logo.svg';
import './App.css';
import Home from './Component/Home';
import HomeManager from './Component/Manager/HomeManager'
import {BrowserRouter as Router, Routes, Route,Link} from 'react-router-dom'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route exact path = '/' element={<Home/>}></Route>
        <Route exact path = '/HomeManager' element={<HomeManager/>}></Route>
      </Routes>
    </Router>

    {/* <Home/>
    <HomeManeger/> */}
    </>
  );
}

export default App;
