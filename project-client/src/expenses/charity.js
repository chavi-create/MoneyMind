import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { ProductService } from './service/ProductService';
import { Card } from 'primereact/card';
import { InputNumber } from 'primereact/inputnumber';
import { Messages } from 'primereact/messages';
import UseAxiosById from '../hooks/UseAxiosById';
import axios from 'axios'


// async function fetchData() {

// }
// useEffect(() => {
//   fetchData();
// }, []);

export default function Charity() {
  //   const [products, setProducts] = useState([]);
  const columns = [
    { field: 'price', header: 'Price' },
    { field: 'name', header: 'Charitable institution' },
  ];
  const [value, setValue] = useState('0');
  const msgs = useRef(null);
  async function getData() {
    try {
      var dt = new Date();
      console.log(dt);
      console.log(dt.getMonth()+1);
      console.log(dt.getFullYear());
      
      const res = await axios.get('http://localhost:8000/expenses/charity/1', {
        params: {
          month: dt.getMonth(),
          year: dt.getFullYear()
        }
      });
      console.log("res"+res);
    } catch (error) {
      console.log(error);
    }
    //  return res.data;
  };

  // const{data,loading,refetch,error}=UseAxiosById('expenses/charity',"1");
  //   useEffect(()=>{console.log('data',data);},[data])


  // const [permissions] = useState(['edit', 'view', 'non']);

  // const{data,loading,refetch,error}=UseAxiosById('users/permissions',"111111111");
  // useEffect(()=>{console.log('data',data);},[data])


  useEffect(() => {
    //   if(value)
    msgs.current.show([
      {
        sticky: true,
        severity: 'success',
        detail: 'Great! You paid charity',
        closable: false,
      },
      {
        sticky: true,
        severity: 'warn',
        detail: 'Warning You still havent paid charity',
        closable: false,
      },
      {
        sticky: true,
        severity: 'error',
        summary: 'Hey!',
        detail: 'You still havent paid charity',
        closable: false,
      },
    ]);
  }, []);

  return (
    <div className="card">
      <Card title="Charity 💰💲" style={{ width: '350px' }}>
        <br /> <br />
        {/* <label><label/> */}
        <DataTable value={getData()}>
          {columns.map((col, i) => (
            <Column key={col.field} field={col.field} header={col.header} />
          ))}
        </DataTable>
        <div className="flex-auto">
          <label htmlFor="currency-us" className="font-bold block mb-2">
            <br />
            <br />
            <br />
            Total price
          </label>
          <InputNumber
            inputId="currency-us"
            value={value}
            onValueChange={(e) => setValue(e.value)}
            mode="currency"
            currency="USD"
            locale="en-US"
          />
        </div>
        <br />
        <br />
        <Messages ref={msgs} />
      </Card>
    </div>
  );
}

