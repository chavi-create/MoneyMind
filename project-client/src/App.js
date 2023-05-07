import React, { useEffect } from 'react';
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
import StatData from './component/manager/charts/StatData';
import UserProvider from './component/user/UserProvider'
import LoginSignUp from './component/login/LoginSignUp';
import CategoryChart from './component/manager/charts/CategoryChart';
import CityChart from './component/manager/charts/CityChart';
import AgeChart from './component/manager/charts/AgeChart';
import DialogAddCategory from './component/manager/categories/DialogAddCategory';
import Charity from './component/expenses/charity';
import ExpensesView from './component/dataViewing/ExpensesView';
import ExpensesTable from './component/dataViewing/ExpensesTable';
import IncomesTable from './component/dataViewing/IncomesTable';
import CurrentWatch from './component/watching/CurrentWatch';
import CameraIncome from './component/addDetails/CameraIncome';
import ManuallyIncome from './component/addDetails/ManuallyIncome';
import CameraExpense from './component/addDetails/CameraExpense';
import ManuallyExpense from './component/addDetails/ManuallyExpense';

function App() {
  const [userId, setUserId] = useState('');

  //localStorage:
  useEffect(() => {
    // console.log(localStorage.getItem("user"));
    const userFromLocalStorage = localStorage.getItem("user")
    // console.log({userFromLocalStorage});
    if (!userFromLocalStorage) return;
    const parsedUser = JSON.parse(userFromLocalStorage)
    // console.log({ parsedUser });
    setUserId(parsedUser.identity)
  }, []);


  const setUserIdCallback = (id) => {
    setUserId(id);
  }
  return (
    <>
      <UserProvider userId={userId}>
        {/* {userId == '' && <Login setUserId={setUserIdCallback}></Login>} */}
        {userId ? 
        <Routes>
          {/* <Route exact path='/signup' element={<SignUp />}></Route> */}
          {/* <Route exact path='/login' element={<Login setUserId={setUserIdCallback} />}></Route> */}
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/homeManager' element={<HomeManager />}></Route>
          <Route exact path='/customers' element={<CustomersTable />}></Route>
          <Route exact path='/updateDetails' element={<UpdateDetails />}></Route>
          <Route exact path='/usersPermissions' element={<UsersPermissions />}></Route>
          <Route exact path='/permissionsTable' element={<PermissionsTable />}></Route>
          <Route exact path='/CameraIncome' element={<CameraIncome />}></Route>
          <Route exact path='/ManuallyIncome' element={<ManuallyIncome />}></Route>
          <Route exact path='/CameraExpense' element={<CameraExpense />}></Route>
          <Route exact path='/ManuallyExpense' element={<ManuallyExpense />}></Route>
          <Route exact path='/Charity' element={<Charity />}></Route>
          <Route exact path='/CurrentWatch' element={<CurrentWatch />}></Route>
          <Route exact path='/categories' element={<AddCategory />}></Route>
          <Route exact path='/dialogCategory' element={<DialogAddCategory />}></Route>
          <Route exact path='/categoryChart' element={<CategoryChart />}></Route>
          <Route exact path='/cityChart' element={<CityChart />}></Route>
          <Route exact path='/ageChart' element={<AgeChart />}></Route>
          <Route exact path='/charts' element={<StatData />}></Route>
          <Route exact path='/expensesView' element={<ExpensesView />}></Route>
          <Route exact path='/expensesTable' element={<ExpensesTable />}></Route>
          <Route exact path='/incomesTable' element={<IncomesTable />}></Route>
        </Routes> 
           :
          //  <Login setUserId={setUserIdCallback} />
          <LoginSignUp setUserId={setUserIdCallback}></LoginSignUp>
        }
      </UserProvider>
    </>
  );
}

export default App;





