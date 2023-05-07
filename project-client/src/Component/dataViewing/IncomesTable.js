import React, { useState, useEffect, useContext } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Calendar } from 'primereact/calendar';
import { Card } from 'primereact/card';
import UserContext from '../user/UserContext';


export default function IncomesTable() {
    const user = useContext(UserContext);
    const[incomes,setIncomes]=useState();
    const [date,setDate]=useState(new Date());
    const[totalIncomes,setTotalIncomes]=useState();
    useEffect(() => {
        if(date){
        axios.get(`http://localhost:8000/incomes/${user.familyId}`,
            { params: { month: date.getMonth()+1, year: date.getFullYear() } })
            .then(data => {
                console.log({ data });
                setIncomes(data.data);
            });
            axios.get(`http://localhost:8000/incomes/totalsum/${user.familyId}`,
            { params: { month: date.getMonth()+1, year: date.getFullYear() } })
            .then(data => {
                console.log({ data });
                setTotalIncomes(data.data.totalSum);
            })}
    }, [date]);

    return (
        <Card className="md:w-25rem">
        <div className="card">
            <h2>incomes:</h2>
             <div className="card flex justify-content-center">
            <Calendar value={date} onChange={(e) => setDate(e.value)} view="month" dateFormat="mm/yy" />
            </div>
            {date&&<><DataTable value={incomes} tableStyle={{ minWidth: '20rem' }}>
                <Column field="source" header="source"></Column>
                <Column field="sumOfMoney" header="sumOfMoney"></Column>
            </DataTable>
            <h3>total incomes: {totalIncomes}</h3></>}
        </div>
        </Card>
    );
}