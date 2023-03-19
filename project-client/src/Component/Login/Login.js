import React from 'react';   

const Login=()=> {

    return (
      <>

      </>
    );
  }
  
  export default Login;
  // import React from 'react'; 
  // import { Card } from 'primereact/card';
  // import { Button } from 'primereact/button';
  
  // import React, { useRef } from "react";
  // import { useState } from "react";
  // import { useFormik } from 'formik';
  // import { InputText } from "primereact/inputtext";
  // import { Button } from 'primereact/button';
  // import { Toast } from 'primereact/toast';
  // import { classNames } from 'primereact/utils';
  // import { InputNumber } from 'primereact/inputnumber';
  // import { Password } from 'primereact/password';
  
  // export default function AdvancedDemo() {
  //         const toast = useRef(null);
  //         const [value, setValue] = useState();
        
  //         const show = () => {
  //             toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: formik.values.value });
  //         };
        
  //         const formik = useFormik({
  //             initialValues: {
  //                 Id: '',
  //                 Password:''
  //             },
  //             validate: (data) => {
  //                 let errors = {};    
  //                 if (!data.Id) {
  //                     errors.Id = 'Identity is required.';
  //                 }
  //                 if (!data.Password) {
  //                     errors.Password = 'Password is required.';
  //                 }  
  //                 return errors;
  //             },
  //             onSubmit: (data) => {
  //                 data && show(data);
  //                 formik.resetForm();
  //             }
  //         });
        
  //           const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);
        
  //           const getFormErrorMessage = (name) => {
  //               return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
  //           };
  //     // const header = (
  //     //     <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
  //     // );
  //     // const footer = (
  //     //     <div className="flex flex-wrap justify-content-end gap-2">
  //     //         <Button label="Save" icon="pi pi-check" />
  //     //         <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-secondary" />
  //     //     </div>
  //     // );
  
  //     return (
  //         <div className="card flex justify-content-center">
  //             <Card className="md:w-25rem">
  //                <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
  //                    <span className="p-float-label">
  //                       <Toast ref={toast} />
  //                        <InputText
  //                           id="value"
  //                           name="value"
  //                           value={value}
  //                           onChange={(e) => {
  //                               setValue(e.value);
  //                           }}
  //                       />
  //                       <label htmlFor="input_value">Name</label>
  //                   </span>
    
  //                   <br/>
    
  //                   <span className="p-float-label">
  //                   <InputNumber inputId="withoutgrouping" id="number-input" name="Id" value={formik.values.Id} onValueChange={(e) => formik.setFieldValue('Id', e.target.value)} useGrouping={false}/>
  //                   <label htmlFor="number-input">Identity</label>
  //               </span>
  //               <br/>
    
  //               <span className="p-float-label">
  //               <Password id="Password" name="Password" value={formik.values.Password} onChange={(e) => formik.setFieldValue('Password', e.target.value)} toggleMask />
  //               <label htmlFor="password">Password</label>
  //               </span>
  //               <br/><br/><br/>
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
  //                 {/* <p className="m-0"> title="Title" subTitle="Subtitle" footer={footer} header={header}
  //                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
  //                     numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
  //                 </p> */}
  //             </Card>
  //         </div>
  //     )
  // }