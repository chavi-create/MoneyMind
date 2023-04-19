import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import SignUp from './Component/Login/SignUp';
import Login from './Component/Login/Login';
import Home from './Component/Home';
import HomeManager from './Component/Manager/HomeManager'
import UpdateDetails from './Component/userDetails/UpdateDetails';
import UsersPermissions from './Component/permissions/UsersPermissions';
import PermissionsTable from './Component/permissions/PermissionsTable';
import AddIncome from './Component/addDetails/AddIncome';


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
          <Route exact path='/AddIncome' element={<AddIncome />}></Route>
        </Routes>
      
    </>
  );
}

export default App;
