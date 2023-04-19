import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { ProductService } from './service/ProductService';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import UseAxiosGet from '../../../hooks/UseAxiosGet'
import UseAxiosById from '../../../hooks/UseAxiosById';

export default function CustomersTable() {
    const [products, setProducts] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);
    const toast = useRef(null);

    const { data, loading, refetch, error } = UseAxiosGet('manager/headusers/');
    useEffect(() => {
        console.log('data', data);
        if (data) 
            setProducts(data)
    }, [data])
    // useEffect(() => {
    //     ProductService.getProductsWithOrdersSmall().then((data) => setProducts(data));
    // }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onRowExpand = (event) => {
        toast.current.show({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000 });
    };

    const onRowCollapse = (event) => {
        toast.current.show({ severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000 });
    };

    const expandAll = () => {
        let _expandedRows = {};

        products.forEach((p) => (_expandedRows[`${p.id}`] = true));

        setExpandedRows(_expandedRows);
    };

    const collapseAll = () => {
        setExpandedRows(null);
    };

    // const formatCurrency = (value) => {
    //     return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    // };

    // const amountBodyTemplate = (rowData) => {
    //     return formatCurrency(rowData.amount);
    // };

    // const statusOrderBodyTemplate = (rowData) => {
    //     return <Tag value={rowData.status.toLowerCase()} severity={getOrderSeverity(rowData)}></Tag>;
    // };

    // const searchBodyTemplate = () => {
    //     return <Button icon="pi pi-search" />;
    // };

    // const imageBodyTemplate = (rowData) => {
    //     return <img src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`} alt={rowData.image} width="64px" className="shadow-4" />;
    // };

    // const priceBodyTemplate = (rowData) => {
    //     return formatCurrency(rowData.price);
    // };

    // const ratingBodyTemplate = (rowData) => {
    //     return <Rating value={rowData.rating} readOnly cancel={false} />;
    // };

    // const statusBodyTemplate = (rowData) => {
    //     return <Tag value={rowData.inventoryStatus} severity={getProductSeverity(rowData)}></Tag>;
    // };

    // const getProductSeverity = (product) => {
    //     switch (product.inventoryStatus) {
    //         case 'INSTOCK':
    //             return 'success';

    //         case 'LOWSTOCK':
    //             return 'warning';

    //         case 'OUTOFSTOCK':
    //             return 'danger';

    //         default:
    //             return null;
    //     }
    // };

    // const getOrderSeverity = (order) => {
    //     switch (order.status) {
    //         case 'DELIVERED':
    //             return 'success';

    //         case 'CANCELLED':
    //             return 'danger';

    //         case 'PENDING':
    //             return 'warning';

    //         case 'RETURNED':
    //             return 'info';

    //         default:
    //             return null;
    //     }
    // };

    const allowExpansion = (rowData) => {
        // return rowData.orders.length > 0;
        return true;
    };

    const rowExpansionTemplate = (data) => {
        const familyUsers = UseAxiosById('manager/headusers/users',data.idfamily);
        // useEffect(() => {
        //     console.log('data', data);
        //     if (familyUsers.data) 
        //         setProducts(familyUsers.data)
        // }, [familyUsers.data])
        return (
            <div className="p-3">
                <h5>family {data.familyName}</h5>
                <DataTable value={familyUsers.data}>
                    <Column field="firstName" header="firstName" ></Column>
                    <Column field="age" header="age"></Column>
                    {/* <Column field="date" header="Date"></Column> */}
                    {/* <Column field="amount" header="Amount" body={amountBodyTemplate}></Column> */}
                    {/* <Column field="status" header="Status" body={statusOrderBodyTemplate}></Column> */}
                    {/* <Column headerStyle={{ width: '4rem' }} body={searchBodyTemplate}></Column> */}
                </DataTable>
            </div>
        );
    };

    const header = (
        <div className="flex flex-wrap justify-content-end gap-2">
            <Button icon="pi pi-plus" label="Expand All" onClick={expandAll} text />
            <Button icon="pi pi-minus" label="Collapse All" onClick={collapseAll} text />
        </div>
    );

    return (
        <div className="card">
            <Toast ref={toast} />
            <DataTable value={products} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                    onRowExpand={onRowExpand} onRowCollapse={onRowCollapse} rowExpansionTemplate={rowExpansionTemplate}
                    dataKey="id" header={header} tableStyle={{ minWidth: '60rem' }}>
                <Column expander={allowExpansion} style={{ width: '5rem' }} />
                <Column field="idfamily" header="idfamily"/>
                {/* <Column header="Image" body={imageBodyTemplate} /> */}
                 <Column field="familyName" header="familyName"  />{/*body={priceBodyTemplate} */}
                <Column field="city" header="city"/>
                <Column field="pelephone" header="pelephone" />{/* body={ratingBodyTemplate}  */}
                <Column field="email" header="email" />{/* body={statusBodyTemplate} */}
            </DataTable>
        </div>
    );
}
