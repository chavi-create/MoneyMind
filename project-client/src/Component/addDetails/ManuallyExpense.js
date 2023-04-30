import React, { useRef, useEffect, useState } from "react";
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import axios from 'axios'
import { Field, useFormik } from 'formik';
// import { Toast } from "primereact/toast";
// import { UseAxiosPost } from "../../hooks/UseAxiosPost";
// import { useForm, Controller } from 'react-hook-form';

const ManuallyExpense = () => {
    const [value, setValue] = useState();
    // const [value1, setValue1] = useState();
    const [value2, setValue2] = useState('');
    const [date, setDate] = useState(null);
    const [selectedType, setSelectedType] = useState(null);

    // const types = [
    //     { name: 'Salary' },
    //     { name: 'Scholarship' },
    //     { name: 'Bonus' },
    //     { name: 'Other' },
    // ];

    // const selectType = (option, props) => {
    //     if (option) {
    //         return (<div className="flex align-items-center"> {option.name}</div>);
    //     }
    //     return <span>{props.placeholder}</span>;
    // };

    const toast = useRef(null);

    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: formik.values.value });
    };

    let newDate = new Date();
    
    const formik = useFormik({
        initialValues: {
            familyId: 100,
            month: newDate.getMonth() + 1,
            year: newDate.getFullYear(),
            purchaseDate: newDate.getDate(),
            paymentNumber: 0,
            mainPayment: 0,
            categoryId: 0,
            productName: '',
            price: 0,
            generalDescription: ''
        },
        validate: (data) => {
            let errors = {};
            if (!data.paymentNumber) {

                errors.paymentNumber = 'paymentNumber is required.';
            }
            if (!data.mainPayment) {
                errors.mainPayment = 'mainPayment is required.';
            }
            if (!data.categoryId) {
                errors.categoryId = 'categoryId is required.';
            }
            if (!data.productName) {
                errors.productName = 'productName is required.';
            }
            if (!data.price) {
                errors.price = 'price is required.';
            }
            return errors;
        },
        onSubmit: async (data) => {
            console.log('data', data);
            // debugger
            var obj = {
                familyId: 1,
                month: data.month,
                year: data.year,
                purchaseDate: data.purchaseDate,
                paymentNumber: data.paymentNumber,
                mainPayment: 100,
                categoryId: data.categoryId,
                productName: data.productName,
                price: data.price,
                generalDescription: data.generalDescription
            }
            console.log(obj);
            await axios.post(`http://localhost:8000/expenses/`, obj);
            console.log("the post workkkkk😁")
            data && show(data);
            formik.resetForm();
        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };


    return (
        <>
            <div className="card flex flex-wrap gap-3 p-fluid">
                <Card title="Expenses- Manual entry 🤞🤘👍👌" style={{ width: '350px' }}>
                    <p className="m-0">
                        <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
                            <label htmlFor="locale-user" className="font-bold block mb-2">product name</label>
                            <span className="p-float-label">
                                <InputText
                                    id="productName"
                                    name="productName"
                                    value={formik.values.productName}
                                    onChange={(e) => formik.setFieldValue("productName", e.target.value)}
                                />
                                <label htmlFor="username">productName</label>
                            </span>
                            <br />
                            <span className="flex-auto">
                                <label htmlFor="locale-user" className="font-bold block mb-2">price of expense</label>
                                {/* <Toast ref={toast} /> */}
                                <InputNumber inputId="locale-user" id="price" name="price"
                                    value={formik.values.price}
                                    onChange={(e) => formik.setFieldValue("price", e.value)}
                                    minFractionDigits={2} />
                            </span>
                            <br /><br />
                            <label htmlFor="locale-user" className="font-bold block mb-2">purchase date</label>
                            <Calendar
                                id="purchaseDate"
                                name="purchaseDate"
                                style={{ width: '180px' }}
                                value={formik.values.date}
                                onChange={(e) => formik.setFieldValue("purchaseDate", e.target.value)}
                                mask="99/99/9999"
                                placeholder="00/00/0000"
                                slotChar="mm/dd/yyyy"
                            />
                            <br />
                            <span className="flex-auto">
                                <label htmlFor="locale-user" className="font-bold block mb-2">payment number</label>
                                {/* <Toast ref={toast} /> */}
                                <InputNumber inputId="locale-user" id="paymentNumber" name="paymentNumber"
                                    value={formik.values.paymentNumber}
                                    onChange={(e) => formik.setFieldValue("paymentNumber", e.value)}
                                />
                            </span>
                            <br /><br />
                            <span className="flex-auto">
                                <label htmlFor="locale-user" className="font-bold block mb-2">category id</label>
                                <InputNumber inputId="locale-user" id="categoryId" name="categoryId"
                                    value={formik.values.categoryId}
                                    onChange={(e) => formik.setFieldValue("categoryId", e.value)}
                                />
                            </span>                            
                            <br /><br />
                            <label htmlFor="locale-user" className="font-bold block mb-2">general description</label>
                            <span className="p-float-label">
                                <InputText
                                    id="generalDescription"
                                    name="generalDescription"
                                    value={formik.values.generalDescription}
                                    onChange={(e) => formik.setFieldValue("generalDescription", e.target.value)}
                                />
                                <label htmlFor="username">generalDescription</label>
                            </span>
                            <br />
                            <span className="card flex justify-content-center">

                                {getFormErrorMessage("productName")}
                                {/* {getFormErrorMessage("price")} */}
                                <Button type="submit" label="Send" style={{ width: '180px' }} />
                            </span>
                        </form>
                    </p>
                </Card>
            </div>
        </>
    )
}
export default ManuallyExpense;


//primereact
/*
import React, { useRef, useEffect, useState } from "react";
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import axios from 'axios'
import { Field, useFormik } from 'formik';

const ManuallyExpense = () => {
    const [value, setValue] = useState();
    // const [value1, setValue1] = useState();
    const [value2, setValue2] = useState('');
    const [date, setDate] = useState(null);
    const [selectedType, setSelectedType] = useState(null);

    const types = [
        { name: 'Salary' },
        { name: 'Scholarship' },
        { name: 'Bonus' },
        { name: 'Other' },
    ];
    const selectType = (option, props) => {
        if (option) {
            return (<div className="flex align-items-center"> {option.name}</div>);
        }
        return <span>{props.placeholder}</span>;
    };

    

    let newDate = new Date()
    



    return (
        <>
            <div className="card flex flex-wrap gap-3 p-fluid">
                <Card title="Expenses- Manual entry 🤞🤘👍👌" style={{ width: '350px' }}>
                    <p className="m-0">
                        <form className="flex flex-column gap-2">
                            <span className="flex-auto">
                                <label htmlFor="locale-user" className="font-bold block mb-2">product name</label>
                                
                                <InputNumber inputId="locale-user" id="sumOfMoney" name="sumOfMoney"
                                    // value={formik.values.sumOfMoney}
                                    // onChange={(e) => formik.setFieldValue("sumOfMoney", e.value)}
                                    minFractionDigits={2} />
                            </span>
                            <br />
                            <span className="fp-float-label">
                                <label htmlFor="locale-user" className="font-bold block mb-2">category id</label>
                                <Dropdown
                                    id="type"
                                    name="type"
                                   
                                    options={types}
                                    optionLabel="name"
                                    placeholder="choose"
                                    filter
                                    valueTemplate={selectType}
                                />
                            </span>
                            <br />
                            <label htmlFor="locale-user" className="font-bold block mb-2">source of income</label>
                            <span className="p-float-label">
                                <InputText
                                    id="source"
                                    name="source"
                                />
                                <label htmlFor="username">source</label>
                            </span>
                            <br />
                            <label htmlFor="locale-user" className="font-bold block mb-2">beneficiary of income</label>
                            <span className="p-float-label">
                                <InputText
                                    id="beneficiary"
                                    name="beneficiary"
                                
                                />
                                <label htmlFor="username">beneficiary</label>
                            </span>
                            <br />
                            <label htmlFor="locale-user" className="font-bold block mb-2">date of income</label>
                            <Calendar
                                id="incomeDate"
                                name="incomeDate"
                                style={{ width: '180px' }}
                                
                                mask="99/99/9999"
                                placeholder="00/00/0000"
                                slotChar="mm/dd/yyyy"
                            />
                            <br />
                            <span className="card flex justify-content-center">
                                <Button type="submit" label="Send" style={{ width: '180px' }} />
                            </span>
                        </form>
                    </p>
                </Card>
                }
            </div>
        </>
    )
}
export default ManuallyExpense;
*/