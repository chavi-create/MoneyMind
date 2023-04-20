import React, { useEffect } from 'react';   
import SimpleButton from './home/SimpleButton';
import ItemsButton from './home/ItemsButton';
import UseAxiosGet from '../hooks/UseAxiosGet';
import {useNavigate} from 'react-router-dom';
import UsersPermissions from './permissions/UsersPermissions';
import PermissionsTable from './permissions/PermissionsTable'

function Home() {
  const{data,loading,refetch,error}=UseAxiosGet('users/');
  useEffect(()=>{console.log('data',data);},[data])
  const navigate = useNavigate();
  const onClick1 = ()=>{navigate('/UpdateDetails')};
    const items1 = [{label:'permissions',icon:<i class="pi pi-lock-open"></i>}];
    const items2 = [{label:'view expenses',icon:<i class="pi pi-arrow-circle-up"></i>},
                    {label:'view incomes',icon:<i class="pi pi-arrow-circle-down"></i>}];
    const family = "Halbershtam"
    return (
      <>
      <h1>Hello {family} family</h1>
      <h2>You can do many operations:</h2>
      <div className="card flex justify-content-center" style={{padding:'200px'}}>
      <ItemsButton label = "update details" items = {items1} onClick={onClick1}/><br/><br/><br/>
      <ItemsButton label = "view details" items = {items2}/><br/><br/><br/>
      <SimpleButton label = "add income" /><br/><br/><br/>
      <SimpleButton label = "add expense" /><br/><br/><br/>
      <SimpleButton label = "charity"/><br/><br/><br/>
      </div>
      </>
    );
  }
  
  export default Home;
  