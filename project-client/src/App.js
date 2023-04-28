import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import SignUp from './component/login/SignUp';
import Login from './component/login/Login';
import Home from './component/Home';
import HomeManager from './component/manager/HomeManager'
import UpdateDetails from './component/userDetails/UpdateDetails';
import UsersPermissions from './component/permissions/UsersPermissions';
import PermissionsTable from './component/permissions/PermissionsTable';
import CustomersTable from './component/manager/customers/CustomersTable';


function App() {
  return (
    <>  
        <Routes>
          <Route exact path='/signup' element={<SignUp />}></Route>
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/homeManager' element={<HomeManager />}></Route>
          <Route exact path='/customers' element={<CustomersTable />}></Route>
          <Route exact path='/updateDetails' element={<UpdateDetails />}></Route>
          <Route exact path='/usersPermissions' element={<UsersPermissions />}></Route>
          <Route exact path='/permissionsTable' element={<PermissionsTable />}></Route>
        </Routes>    
    </>
  );
}

export default App;
