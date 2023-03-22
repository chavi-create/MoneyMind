import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import SignUp from './components/login/SignUp';
import Login from './components/login/Login';
import Home from './components/Home';
import HomeManager from './components/manager/HomeManager'
import UpdateDetails from './components/userDetails/UpdateDetails';
import UsersPermissions from './components/permissions/UsersPermissions';
import PermissionsTable from './components/permissions/PermissionsTable';


function App() {
  return (
    <>
      
        <Routes>
          <Route exact path='/signup' element={<SignUp />}></Route>
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/homeManager' element={<HomeManager />}></Route>
          <Route exact path='/updateDetails' element={<UpdateDetails />}></Route>
          <Route exact path='/usersPermissions' element={<UsersPermissions />}></Route>
          <Route exact path='/permissionsTable' element={<PermissionsTable />}></Route>
        </Routes>
      
    </>
  );
}

export default App;
