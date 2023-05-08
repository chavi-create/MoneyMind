import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { InputNumber } from 'primereact/inputnumber';
import { Messages } from 'primereact/messages';
// import UseAxiosById from '../hooks/UseAxiosById';
import axios from 'axios'

export default function Charity() {

  const [value, setValue] = useState('0');
  const [totalc, setTotalc] = useState(null);
  const [charity, setCharity] = useState(null);
  const [incomes, setIncomes] = useState(null);

  // useEffect(() => {
  //   columns().then(data => setCharity(data));
  // }, []);

  const msgs = useRef(null);

  async function getData() {
    try {
      var dt = new Date();
      console.log(dt);
      console.log(dt.getMonth() + 1);
      console.log(dt.getFullYear());

      const res = await axios.get('http://localhost:8000/expenses/charity/1', {
        params: {
          month: 1,//dt.getMonth(),
          year: dt.getFullYear()
        }

      });
      const incomes = await axios.get('http://localhost:8000/incomes/totalsum/1', {
        params: {
          month: 1,//dt.getMonth(),
          year: dt.getFullYear()
        }

      });

      console.log("res", res.data);
      setTotalc((res.data)[res.data.length - 1].totalCharity);
      setCharity(res.data);

      console.log("incomes", incomes.data);
      setIncomes(incomes.data.totalSum);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getData();
    if (incomes <= totalc * 10) {
      msgs.current.show([
        {
          sticky: true,
          severity: 'success',
          detail: 'Great! You paid charity',
          closable: false,
        }
      ]);
    }
    if (incomes > totalc * 10) {
      msgs.current.show([
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
        }]);
    }
  }, []);

  return (
    <div className="card">
      <Card title="Charity 💰💲" style={{ width: '370px' }}>
        <br /> <br />
        <DataTable value={charity}>
          <Column field="price" header="Price"></Column>
          <Column field="categoryName" header="Charitable institution"></Column>
          <Column field="description" header="Description"></Column>
        </DataTable>

        <div className="flex-auto">
          <label htmlFor="currency-us" className="font-bold block mb-2"><br /><br /><br /> Total price <br /></label>
          <InputNumber
            inputId="currency-us"
            value={totalc}
            // onValueChange={(e) => setValue(e.value)}
            mode="currency"
            currency="USD"
            locale="en-US"
          />
        </div>
        <br /><br />
        <Messages ref={msgs} />
      </Card>
    </div>
  );
}
