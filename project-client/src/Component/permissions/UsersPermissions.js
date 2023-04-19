import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import UseAxiosById from '../../hooks/UseAxiosById';
import UseAxiosGet from '../../hooks/UseAxiosGet';
import axios from 'axios';
import _ from 'lodash';//isEqual

export default function UsersPermissions() {
    const [perUsers, setPerUsers] = useState(null);

    const { data, loading, refetch, error } = UseAxiosById('users/permissions', "111111111");

    const permissions = UseAxiosGet('permissions/');
    useEffect(() => { console.log('dataPermission', permissions.data); }, [permissions.data])

    const perUser = { identity: null, firstName: '', permission: "" };
    useEffect(() => {
        console.log('data', data);
        if (data) 
            setPerUsers(data)
    }, [data])

    async function getPermissionId(per) {
        console.log(per);
        let perObj = await permissions.data.filter((e) => { return e.permissionName == per })[0];
        console.log("perObj: " + perObj);
        // if(perObj.idpermission)
        return perObj.idpermission;
    }

    function addUser() {
        setPerUsers([...perUsers, perUser]);
    }

    const onRowEditComplete = async (e) => {
        console.log("onRowEditComplete", e);
        let eData = e.data;
        let newD = e.newData;
        // console.log(!_.isEqual(eData,newD));
        if (eData.identity != null) {
            if (newD.identity != eData.identity)
                if (window.confirm("you want delete user " + eData.identity + " and replace him with new user " + newD.identity)) {
                    let aaa = await axios.delete(`http://localhost:8000/users/${eData.identity}`);
                    console.log("delete aaa: " + aaa);
                }
            if (newD.identity == eData.identity) {
                let obj = {};
                if (newD.permission != eData.permission) {
                    let perId = await getPermissionId(newD.permission);
                    obj['permissionId'] = perId;
                }
                if (newD.firstName != eData.firstName) {
                    obj['firstName'] = newD.firstName;
                }
                console.log(obj);
                let ccc = await axios.put(`http://localhost:8000/users/${eData.identity}`, obj);
                console.log("put ccc: " + ccc);
            }
        }
        if (eData.identity == null) {
            let perId = await getPermissionId(newD.permission);
            let obj = { identity: newD.identity, firstName: newD.firstName, permission: perId };
            let bbb = await axios.post(`http://localhost:8000/users/${111111111}`, obj);
            console.log("post bbb: " + bbb);
        }

        refetch();
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
            {loading ? "loading...." : <DataTable value={perUsers} editMode="row" dataKey="pers" onRowEditComplete={onRowEditComplete} tableStyle={{ minWidth: '35rem' }}>
                <Column field="identity" header="Id" editor={(options) => idEditor(options)} style={{ width: '30%' }}></Column>
                <Column field="firstName" header="First Name" editor={(options) => textEditor(options)} style={{ width: '30%' }}></Column>
                <Column field="permission" header="Permission" editor={(options) => permissionEditor(options)} style={{ width: '30%' }}></Column>
                <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
            </DataTable>}
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <button onClick={addUser} >add user</button>
            </div>
        </div>
    );
}
