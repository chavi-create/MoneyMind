import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { InputText } from "primereact/inputtext";
import { InputNumber } from 'primereact/inputnumber';
import { Password } from 'primereact/password';
import axios from 'axios';

export default function SignUp() {
    const navigate = useNavigate();
    const toast = useRef(null);
    const [value, setValue] = useState();
    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: formik.values.value });
    };
    const showError = (errType) => {
        toast.current.show({ severity: 'error', summary: errType, detail: formik.values.value });
    };
    const formik = useFormik({
        initialValues: {
            Name: '',
            Id: '',
            FamilyName: '',
            Password: ''
        },
        validate: (data) => {
            let errors = {};
            if (!data.Name) {
                errors.Name = 'Name is required.';
            }
            if (!data.Id) {
                errors.Id = 'Identity is required.';
            }
            if (!data.FamilyName) {
                errors.FamilyName = 'FamilyName is required.';
            }
            if (!data.Password) {
                errors.Password = 'Password is required.';
            }
            // if (!data.Name&&!data.Id&&!data.FamilyName&&!data.Password) {
            //     errors.Id = 'all field is required.';
            // }
            return errors;
        },
        onSubmit: async (data) => {
            console.log("data ", data);
            try {
                const result = await axios.post(`http://localhost:8000/families/signup/`, data);
                data && show(data);
                navigate("/");
            }
            catch (err) {
                data && showError(err.response.data['message']);
                formik.resetForm();
            }
        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };
    return (
        <div className="card flex justify-content-center">
            <Card className="md:w-25rem">
                <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
                    <span className="p-float-label">
                        <Toast ref={toast} />
                        <InputText
                            id="Name"
                            name="Name"
                            // value={value}
                            value={formik.values.Name}
                            onChange={(e) => formik.setFieldValue('Name', e.target.value)}
                        // onChange={(e) => {
                        //     setValue(e.value);
                        // }}
                        />
                        <label htmlFor="input_value">Name</label>
                    </span>

                    <br />
                    <span className="p-float-label">
                        <InputNumber inputId="withoutgrouping" id="Id" name="Id" value={formik.values.Id} onValueChange={(e) => formik.setFieldValue('Id', e.target.value)} useGrouping={false} />
                        <label htmlFor="number-input">Identity</label>
                    </span>
                    <br />
                    <span className="p-float-label">
                        <Toast ref={toast} />
                        <InputText
                            id="FamilyName"
                            name="FamilyName"
                            value={formik.values.FamilyName}
                            // onChange={(e) => {
                            //     setValue(e.value);
                            // }}
                            onChange={(e) => formik.setFieldValue('FamilyName', e.target.value)}
                        />
                        <label htmlFor="input_value">FamilyName</label>
                    </span>
                    <br />
                    <span className="p-float-label">
                        <Password id="Password" name="Password" value={formik.values.Password} onChange={(e) => formik.setFieldValue('Password', e.target.value)} toggleMask />
                        <label htmlFor="password">Password</label>
                    </span>
                    <br /><br /><br />
                    {/* <div className="card flex justify-content-center">
                        <Button label="update details" onClick={()=>{navigate('/UpdateDetails')}}/>
                    </div> */}
                    <br /><br /><br />
                    {/* {getFormErrorMessage('value')} */}
                    {getFormErrorMessage('Name')}
                    {getFormErrorMessage('Id')}
                    {getFormErrorMessage('FamilyName')}
                    {getFormErrorMessage('Password')}
                    <Button type="submit" label="Login" />
                </form>
            </Card>
        </div>
    )
}