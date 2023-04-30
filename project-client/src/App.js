import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import SignUp from './component/login/SignUp';
import Login from './component/login/Login';
import Home from './component/Home';
import HomeManager from './component/manager/HomeManager'
import UpdateDetails from './component/userDetails/UpdateDetails';
import UsersPermissions from './component/permissions/UsersPermissions';
import PermissionsTable from './component/permissions/PermissionsTable';
import CustomersTable from './component/manager/customers/CustomersTable';
import AddCategory from './component/manager/categories/AddCategory';
// import CategoryChart from './component/manager/charts/CategoryChart';
// import CityChart from './component/manager/charts/CityChart';
// import AgeChart from './component/manager/charts/AgeChart';
import StatData from './component/manager/charts/StatData';
import UserProvider from './component/user/UserProvider'


function App() {
  const [userId, setUserId] = useState('');

  const setUserIdCallback = (id) => {
    setUserId(id);
  }
  return (
    <>
      <UserProvider userId={userId}>
        {/* {userId == '' && <Login setUserId={setUserIdCallback}></Login>} */}
        <Routes>
          <Route exact path='/signup' element={<SignUp />}></Route>
          <Route exact path='/login' element={<Login setUserId={setUserIdCallback}/>}></Route>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/homeManager' element={<HomeManager />}></Route>
          <Route exact path='/customers' element={<CustomersTable />}></Route>
          <Route exact path='/updateDetails' element={<UpdateDetails />}></Route>
          <Route exact path='/usersPermissions' element={<UsersPermissions />}></Route>
          <Route exact path='/permissionsTable' element={<PermissionsTable />}></Route>
          <Route exact path='/categories' element={<AddCategory />}></Route>
          {/* <Route exact path='/categoryChart' element={<CategoryChart />}></Route>
          <Route exact path='/cityChart' element={<CityChart />}></Route>
          <Route exact path='/ageChart' element={<AgeChart />}></Route> */}
          <Route exact path='/charts' element={<StatData />}></Route>
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;





