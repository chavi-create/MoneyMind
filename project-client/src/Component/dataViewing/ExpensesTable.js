import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useLocation } from 'react-router-dom';


export default function ExpensesTable() {
    const {state} = useLocation();
    useEffect(()=>{if(state)console.log({state});},[state])

    return (
        <div className="card">
            <DataTable value={state} tableStyle={{ minWidth: '20rem' }}>
                <Column field="productName" header="productName"></Column>
                <Column field="price" header="price"></Column>
                <Column field="generalDescription" header="generalDescription"></Column>
            </DataTable>
        </div>
    );
}