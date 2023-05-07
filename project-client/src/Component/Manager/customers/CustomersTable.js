import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import UseAxiosGet from "../../../hooks/UseAxiosGet";
import UseAxiosById from "../../../hooks/UseAxiosById";
import axios from "axios";

export default function CustomersTable() {
  const [headUsers, setHeadUsers] = useState([]);
  const [expandedRows, setExpandedRows] = useState(null);
  const [id, setId] = useState(null);
  const [users, setUsers] = useState([]);
  const toast = useRef(null);

  const { data, loading, refetch, error } = UseAxiosGet("manager/headusers/");
  useEffect(() => {
    console.log("data", data);
    if (data) setHeadUsers(data);
  }, [data]);

  useEffect(() => {
    if (id !== null) {
      let fData = [];
      const fetchd = async () => {
        fData = await axios.get(
          `http://localhost:8000/manager/headusers/users/${id}`
        );
        setUsers(fData.data);
      };
      fetchd();
      console.log("fdata ", fData);
      console.log("users ", users);
    }
  }, [id]);

  const onRowExpand = (event) => {
    toast.current.show({
      severity: "info",
      summary: "Product Expanded",
      detail: event.data.name,
      life: 3000,
    });
  };

  const onRowCollapse = (event) => {
    toast.current.show({
      severity: "success",
      summary: "Product Collapsed",
      detail: event.data.name,
      life: 3000,
    });
  };

  const expandAll = () => {
    let _expandedRows = {};
    console.log("headUsers ", headUsers);
    console.log("ExpandedRows ", expandedRows);

    headUsers.forEach((head) => (_expandedRows[`${head.id}`] = true));
    console.log("__ExpandedRows ", _expandedRows);

    setExpandedRows(_expandedRows);
  };

  const collapseAll = () => {
    setExpandedRows(null);
  };

  const allowExpansion = (rowData) => {
    // return users.length > 0;
    return true;
  };

  const rowExpansionTemplate = (data) => {
    console.log({ data });
    setId(data.id);

    return (
      <div className="p-3">
        {users.length > 0 && (
          <>
            <h5>users for {data.familyName}</h5>
             <DataTable value={users}> {/*????????????????expandAll open users from the last family*/}
              <Column field="firstName" header="firstName"></Column>
              <Column field="age" header="age"></Column>
            </DataTable>
          </>
        )}
      </div>
    );
  };
  const header = (
    <div className="flex flex-wrap justify-content-end gap-2">
      <Button icon="pi pi-plus" label="Expand All" onClick={expandAll} text />
      <Button
        icon="pi pi-minus"
        label="Collapse All"
        onClick={collapseAll}
        text
      />
    </div>
  );

  return (
    <div className="card">
      <Toast ref={toast} />
      <DataTable
        value={headUsers}
        expandedRows={expandedRows}
        onRowToggle={(e) => {
            console.log({e});
            setExpandedRows(e.data)
        }}
        onRowExpand={onRowExpand}
        onRowCollapse={onRowCollapse}
        rowExpansionTemplate={rowExpansionTemplate}
        dataKey="id"
        header={header}
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column expander={allowExpansion} style={{ width: "5rem" }} />
        <Column field="familyName" header="familyName" />
        <Column field="city" header="city" />
        <Column field="pelephone" header="pelephone" />
        <Column field="email" header="email" />
      </DataTable>
    </div>
  );
}
