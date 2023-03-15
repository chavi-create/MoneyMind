import React from 'react';   
import SimpleButton from './Home/SimpleButton';
import ItemsButton from './Home/ItemsButton';

function Home() {
    const items1 = [{label:'permissions',icon:<i class="pi pi-lock-open"></i>}];
    const items2 = [{label:'view expenses',icon:<i class="pi pi-arrow-circle-up"></i>},
                    {label:'view incomes',icon:<i class="pi pi-arrow-circle-down"></i>}];
    const family = "Halbershtam"
    return (
      <>
      <h1>Hello {family} family</h1>
      <h2>You can do many operations:</h2>
      <ItemsButton label = "update details" items = {items1}/><br/><br/><br/>
      <ItemsButton label = "view details" items = {items2}/><br/><br/><br/>
      <SimpleButton label = "add income" /><br/><br/><br/>
      <SimpleButton label = "add expense" /><br/><br/><br/>
      <SimpleButton label = "charity"/><br/><br/><br/>
      </>
    );
  }
  
  export default Home;
  