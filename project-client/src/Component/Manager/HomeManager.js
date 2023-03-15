import React from 'react';   
import ItemsButton from '../Home/ItemsButton';
import SimpleButton from '../Home/SimpleButton';

function HomeManeger() {
    const items1 = [{label:'cities',icon:<i class="pi pi-globe"></i>},
                    {label:'ages (family head)',icon:<i class="pi pi-user"></i>},
                    {label:'categories',icon:<i class="pi pi-chart-bar"></i>}];
    return (
      <>
      <h1>Hello Manager</h1>
      <SimpleButton label = "view users" /><br/><br/><br/>
      <ItemsButton label = "statistics details" items = {items1}/><br/><br/><br/> 
      <SimpleButton label = "add category" /><br/><br/><br/>
      </>
    );
  }
  
  export default HomeManeger;
  