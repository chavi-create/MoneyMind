import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';


export default function IncomesTable() {
    const[incomes,setIncomes]=useState();
    useEffect(() => {
        axios.get(`http://localhost:8000/incomes/${1}`,
            { params: { month: 1, year: 2023 } })
            .then(data => {
                console.log({ data });
                setIncomes(data.data);
            })
    }, []);

    return (
        <div className="card">
            <DataTable value={incomes} tableStyle={{ minWidth: '20rem' }}>
                <Column field="source" header="source"></Column>
                <Column field="sumOfMoney" header="sumOfMoney"></Column>
            </DataTable>
        </div>
    );
}