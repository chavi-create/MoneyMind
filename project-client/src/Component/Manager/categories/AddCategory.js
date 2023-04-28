import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
// import { ProductService } from './service/ProductService';
import UseAxiosGet from '../../../hooks/UseAxiosGet';

export default function AddCategory() {
    // const [products, setProducts] = useState([]);

    const [categories, setCategories] = useState(null);

    const { data, loading, refetch, error } = UseAxiosGet('manager/categories/another');
    // const perUser = { identity: null, firstName: '', permission: "" };
    useEffect(() => {
        console.log('data', data);
        if (data) {
            setCategories(Object.entries(data).map(([categoryName, number]) => ({ categoryName, number })))
        }
    }, [data])

    // useEffect(() => {
    //     if (categories) {
    //         console.log("categories", categories);
    //         const parsedCategories = Object.entries(categories).map(([categoryName, number]) => ({ categoryName, number }))
    //         console.log({ parsedCategories });
    //         const _keys = Object.keys(categories);
    //         const _values = Object.values(categories);
    //         console.log("keys ", _keys);
    //         console.log("values ", _values);
    //         // const ccc=categories.map((k,v)=>{"categoryName"=k,"number"=v});
    //         // console.log("ccc",ccc);
    //     }
    // }, [categories]);

    // const array1 = ['a', 'b', 'c'];
    // const iterator = array1.keys();

    // for (const key of iterator) {
    //   console.log(key);
    // }

    function addCategory() {
        
    }




    return (
        <div className="card">

            <DataTable value={categories} tableStyle={{ minWidth: '50rem' }}>
                <Column field="categoryName" header="categoryName"></Column>
                <Column field="number" header="number"></Column>
            </DataTable>
            <div className="card flex justify-content-center">
                        <Button label="add category" onClick={addCategory}/>
                    </div>
        </div>
    );
}