import React from 'react';   

const Login=()=> {

    return (
      <>

      </>
    );
  }
  
  export default Login;




//   import React, { useRef } from "react";
//   import { useState } from "react";
//   import { useFormik } from 'formik';
//   import { InputText } from "primereact/inputtext";
//   import { Button } from 'primereact/button';
//   import { Toast } from 'primereact/toast';
//   import { classNames } from 'primereact/utils';
//   import { InputNumber } from 'primereact/inputnumber';
//   import { Password } from 'primereact/password';
  
//   export default function FormikDoc() {
//       const toast = useRef(null);
//       const [value, setValue] = useState();
  
//       const show = () => {
//           toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: formik.values.value });
//       };
  
//       const formik = useFormik({
//           initialValues: {
//               Id: '',
//               Password:''
//           },
//           validate: (data) => {
//               let errors = {};
  
//               if (!data.Id) {
//                   errors.Id = 'Identity is required.';
//               }
//               if (!data.Password) {
//                   errors.Password = 'Password is required.';
//               }
  
//               return errors;
//           },
//           onSubmit: (data) => {
//               data && show(data);
//               formik.resetForm();
//           }
//       });
  
//       const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);
  
//       const getFormErrorMessage = (name) => {
//           return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
//       };
  
//       return (
//           <>
//           <div className="card flex justify-content-center">
//               <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
//                   <span className="p-float-label">
//                       <Toast ref={toast} />
//                       <InputText
//                           id="value"
//                           name="value"
//                           value={formik.values.value}
//                           onChange={(e) => {
//                               formik.setFieldValue('value', e.target.value);
//                           }}
//                       />
//                       <label htmlFor="input_value">Name</label>
//                   </span>
//                   <br/>
  
//                   <span className="p-float-label">
//                   <InputNumber inputId="withoutgrouping" id="number-input" value={value} onValueChange={(e) => setValue(e.value)} useGrouping={false}/>
//                   <label htmlFor="number-input">Identity</label>
//               </span>
//               <br/>
  
//               <span className="p-float-label">
//               <Password value={value} onChange={(e) => setValue(e.target.value)} toggleMask />
//               <label htmlFor="password">Password</label>
//               </span><br/><br/><br/>
//               {/* <div>
//                   <h3>new family?</h3>
//               </div> */}
//               <div className="card flex justify-content-center">
//               <Button label="new family" />
//               </div>
//               <br/><br/><br/>
//                   {/* {getFormErrorMessage('value')} */}
//                   {getFormErrorMessage('Id')}
//                   {getFormErrorMessage('Password')}
//                   <Button type="submit" label="Login" />
//               </form>
//           </div>
              
//           </>
//       )
//   }