import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { SplitButton } from 'primereact/splitbutton';
import React from 'react';   
import { useNavigate } from 'react-router-dom';
import ItemsButton from '../home/ItemsButton';

function HomeManeger() {
  const navigate=useNavigate();
    const items1 = [{label:'cities',icon:<i class="pi pi-globe"></i>, command:()=>{navigate('/cityChart')}},
                    {label:'ages (family head)',icon:<i class="pi pi-user"></i>, command:()=>{navigate('/ageChart')}},
                    {label:'categories',icon:<i class="pi pi-chart-bar"></i>, command:()=>{navigate('/categoryChart')}}];
    return (
      <>
      <Card className="md:w-25rem">
      <h1>Hello Manager</h1>
      <Button label="view users"   onClick={()=>{navigate('/customers')}}/>
      <br/><br/><br/>
      <ItemsButton label = "statistics details" items = {items1} onClick={()=>{navigate('/charts')}}/><br/><br/><br/> 
      <Button label = "add category" onClick={()=>{navigate('/categories')}}/><br/><br/><br/>
      </Card>
      </>
    );
  }
  
  export default HomeManeger;
  