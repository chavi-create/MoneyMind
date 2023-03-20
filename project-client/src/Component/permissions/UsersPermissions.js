import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import UseAxiosById from '../../Hooks/UseAxiosById';
// import { ProductService } from './service/ProductService';

export default function UsersPermissions() {
    // const [products, setProducts] = useState(null);
    const [permissions] = useState(['edit', 'view', 'non']);

    const{data,loading,refetch,error}=UseAxiosById('users/permissions',"111111111");
    useEffect(()=>{console.log('data',data);},[data])

    // useEffect(() => {
    //     ProductService.getProductsMini().then((data) => setProducts(data));
    // }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // const onRowEditComplete = (e) => {
    //     let _products = [...products];
    //     let { newData, index } = e;

    //     _products[index] = newData;

    //     setProducts(_products);
    // };

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };

    const idEditor = (options) => {
        return <InputNumber value={options.value} onValueChange={(e) => options.editorCallback(e.value)} useGrouping={false} />;
    };

    const permissionEditor = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={permissions}
                onChange={(e) => options.editorCallback(e.value)}
                placeholder="Permission"
                itemTemplate={(option) => {
                    return <Tag value={option}></Tag>;
                }}
            />
        );
    };
//  onRowEditComplete={onRowEditComplete}
    return ( 
        <div className="card p-fluid">
            <DataTable value={data} editMode="row" dataKey="id" tableStyle={{ minWidth: '35rem' }}>
                <Column field="identity" header="Id" editor={(options) => idEditor(options)} style={{ width: '30%' }}></Column>
                <Column field="firstName" header="First Name" editor={(options) => textEditor(options)} style={{ width: '30%' }}></Column>
                <Column field="permissionName" header="Permission" editor={(options) => permissionEditor(options)} style={{ width: '30%' }}></Column>
                <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
            </DataTable>
        </div>
    );
}