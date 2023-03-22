import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import UseAxiosById from '../../hooks/UseAxiosById';
import UseAxiosGet from '../../hooks/UseAxiosGet';

import axiosDelete from '../../services/axiosDelete';
import axiosPost from '../../services/axiosPost';
import axiosPut from '../../services/axiosPut';

// import { ProductService } from './service/ProductService';

export default function UsersPermissions() {
    // const [products, setProducts] = useState(null);
    // const [permissions] = useState(['edit', 'view', 'non']);

    const permissions = UseAxiosGet('permissions/');
    useEffect(() => { console.log('dataPermission', permissions.data); }, [permissions.data])

    // const{data,loading,refetch,error}=UseAxiosById('users/permissions',"111111111");
    // useEffect(()=>{console.log('data',data);},[data])


    const user_permission = UseAxiosById('users/permissions', "111111111");
    useEffect(() => {
        if (user_permission.data != undefined)
            user_permission.data.push({ identity: '', firstName: '', permissionName: '' });
        console.log('data', user_permission.data);
    }, [user_permission.data])

    // useEffect(() => {
    //     ProductService.getProductsMini().then((data) => setProducts(data));
    // }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onRowEditComplete = async (e) => {
        console.log("onRowEditComplete", e);
        let { data, index, newData } = e;
        if (data.identity == null) {
            if (newData.identity != null && newData.firstName != '' && newData.permissionName != '') {
                const perId = permissions.data.find((e) => e.permissionName == newData.permissionName)['idpermission']
                const dataObj = {
                    identity: newData.identity,
                    firstName: newData.firstName,
                    permissionId: perId
                }
                const res = await axiosPost("users/111111111", dataObj);
                if (res) console.log(res);
            }
        }
        else {
            if (data.identity != newData.identity) {
                if (window.confirm("You change user")) {
                    let resDel = await axiosDelete("users", data.identity);
                    if (resDel) console.log(resDel);
                }
            }
            else {
                if (data.firstName != newData.firstName || data.permissionName != newData.permissionName) {
                    const perId = permissions.data.find((e) => e.permissionName == newData.permissionName)['idpermission']
                    const dataObj2 = {
                        firstName: newData.firstName,
                        permissionId: perId
                    }
                    let resPut = await axiosPut("users", data.identity, dataObj2);
                    if (resPut) console.log(resPut);
                }
            }
        }


        // let _products = [...products];
        // let { newData, index } = e;

        // _products[index] = newData;

        // setProducts(_products);
    };

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
                options={permissions.data.map(e => e.permissionName)}
                onChange={(e) => options.editorCallback(e.value)}
                placeholder="Permission"
                itemTemplate={(option) => {
                    return <Tag value={option}></Tag>;
                }}
            />
        );
    };

    return (
        <div className="card p-fluid">
            <DataTable value={user_permission.data} editMode="row" dataKey="identity" onRowEditComplete={onRowEditComplete} tableStyle={{ minWidth: '35rem' }}>
                <Column field="identity" header="Id" editor={(options) => idEditor(options)} style={{ width: '30%' }}></Column>
                <Column field="firstName" header="First Name" editor={(options) => textEditor(options)} style={{ width: '30%' }}></Column>
                <Column field="permissionName" header="Permission" editor={(options) => permissionEditor(options)} style={{ width: '30%' }}></Column>
                <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
            </DataTable>
        </div>
    );
}
