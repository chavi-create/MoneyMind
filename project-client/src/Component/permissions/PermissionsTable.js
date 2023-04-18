import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { CustomerService } from './service';
import UseAxiosGet from '../../hooks/UseAxiosGet';

export default function PermissionsTable() {
  const [customers, setCustomers] = useState([]);
  
  const{data,loading,refetch,error}=UseAxiosGet('permissions_processes/');
  useEffect(()=>{console.log('data',data);},[data])

  useEffect(() => {
    CustomerService.getCustomersMedium().then((data) => setCustomers(data));
  }, []);

  const headerTemplate = (data) => {
    return (
      <div className="flex align-items-center gap-2">
        <span className="font-bold">{data.representative.name}</span>
      </div>
    );
  };

  return (
    <div className="card">
      <DataTable
        value={customers}
        rowGroupMode="subheader"
        groupRowsBy="representative.name"
        sortMode="single"
        sortField="representative.name"
        sortOrder={1}
        scrollable
        scrollHeight="400px"
        rowGroupHeaderTemplate={headerTemplate}
        tableStyle={{ minWidth: '20rem' }}
      >
        <Column field="id" header="Permission name"></Column>
        <Column field="name" header="Process description"></Column>
      </DataTable>
    </div>
  );
}
