import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import UseAxiosGet from '../../../hooks/UseAxiosGet';

export default function AddCategory() {

    const [categories, setCategories] = useState(null);

    const { data, loading, refetch, error } = UseAxiosGet('manager/categories/another');
    useEffect(() => {
        console.log('data', data);
        if (data) {
            setCategories(Object.entries(data).map(([categoryName, number]) => ({ categoryName, number })))
        }
    }, [data])

    function addCategory() {
        
    }




    return (
        <div className="card">

            <DataTable value={categories} tableStyle={{ minWidth: '20rem' }}>
                <Column field="categoryName" header="categoryName"></Column>
                <Column field="number" header="number"></Column>
            </DataTable>
            <div className="card flex justify-content-center">
                        <Button label="add category" onClick={addCategory}/>
                    </div>
        </div>
    );
}