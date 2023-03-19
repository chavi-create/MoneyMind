import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { ProductService } from './service/ProductService';
import { Dropdown } from 'primereact/dropdown';

export default function CellEditingDemo() {

    const [selectedCity, setSelectedCity] = useState(null);
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    const [products, setProducts] = useState(null);

    const columns = [
        // { field: 'code', header: 'Code' },
        { field: 'name', header: 'First name' },
        { field: 'identity', header: 'Identity' },
        { field: 'permission', header: 'Permission' }
    ];

    useEffect(() => {
        ProductService.getProductsMini().then((data) => setProducts(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const isPositiveInteger = (val) => {
        let str = String(val);

        str = str.trim();

        if (!str) {
            return false;
        }

        str = str.replace(/^0+/, '') || '0';
        let n = Math.floor(Number(str));

        return n !== Infinity && String(n) === str && n >= 0;
    };

    const onCellEditComplete = (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;

        switch (field) {
            case 'identity':
            case 'permission':
                if (isPositiveInteger(newValue)) rowData[field] = newValue;
                else event.preventDefault();
                break;

            default:
                if (newValue.trim().length > 0) rowData[field] = newValue;
                else event.preventDefault();
                break;
        }
    };

    const cellEditor = (options) => {
        if (options.field === 'permission') return permissionEditor(options);
        else return textEditor(options);
    };

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };

    const permissionEditor = (options) => {
        return <InputNumber value={options.value} onValueChange={(e) => options.editorCallback(e.value)}/>;
    };
    // mode="currency" currency="USD" locale="en-US" 

    const permissionBodyTemplate = (rowData) => {
        return <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                showClear placeholder="Select a City" className="w-full md:w-14rem" />
    //     return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(rowData.permission);
    };

    return (
        <div className="card p-fluid">
            <DataTable value={products} editMode="cell" tableStyle={{ minWidth: '30rem' }}>
                {columns.map(({ field, header }) => {1
                    return <Column key={field} field={field} header={header} style={{ width: '25%' }} body={field === 'permission' && permissionBodyTemplate} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} />;
                    // return <Column key={field} field={field} header={header} style={{ width: '25%' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} />; 
                })}
            </DataTable>
        </div>
    );
}
