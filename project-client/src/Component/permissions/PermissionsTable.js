
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { CustomerService } from './service/CustomerService';

export default function SubHeaderRowGroupDemo() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        CustomerService.getCustomersMedium().then((data) => setCustomers(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const headerTemplate = (data) => {
        return (
            <div className="flex align-items-center gap-2">
                <span className="font-bold">{data.representative.name}</span>
            </div>
        );
    };
    // Process
    const ProcessDescription = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <img alt={rowData.country.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`flag flag-${rowData.country.code}`} style={{ width: '24px' }} />
                <span>{rowData.country.name}</span>
            </div>        );
    };


    return (
        <div className="card">
            <DataTable value={customers} rowGroupMode="subheader" groupRowsBy="representative.name" sortMode="single" sortField="representative.name"
                    sortOrder={1} scrollable scrollHeight="400px" rowGroupHeaderTemplate={headerTemplate}  tableStyle={{ minWidth: '20rem' }}>
                <Column field="name" header="Permission name" style={{ minWidth: '10px' }}></Column>
                <Column field="Process" header="Process description" body={ProcessDescription} style={{ minWidth: '200px' }}></Column>
                {/* <Column field="company" header="Company" style={{ minWidth: '200px' }}></Column>
               
                <Column field="date" header="Date" style={{ minWidth: '200px' }}></Column> */}
            </DataTable>
        </div>
    );
}