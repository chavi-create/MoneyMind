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

const ManuallyIncome = () => {
  const [value, setValue] = useState();
  // const [value1, setValue1] = useState();
  const [value2, setValue2] = useState('');
  const [date, setDate] = useState(new Date());
  const [selectedType, setSelectedType] = useState(null);

  const types = [
    { name: 'Salary' },
    { name: 'Scholarship' },
    { name: 'Bonus' },
    { name: 'Other' },
  ];

  const selectType = (option, props) => {
    if (option) {
      return (<div className="flex align-items-center">{option.name}</div>);}
    return <span>{props.placeholder}</span>;
  };

  const toast = useRef(null);

  const show = () => {
    toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: formik.values.value });
  };

  let newDate = new Date();
  // setDate((newDate))

  const formik = useFormik({
    initialValues: {
      sumOfMoney: 0,
      source: '',
      incomeDate: '',
      bankEntryDate: newDate.getDate(),
      year: newDate.getFullYear(),
      month: newDate.getMonth() + 1,
      familyId: 100
    },
    validate: (data) => {
      let errors = {};
      if (!data.sumOfMoney) {

        errors.sumOfMoney = 'sumOfMoney is required.';
      }
      if (!data.source) {
        errors.source = 'source is required.';
      }
      if (!data.incomeDate) {
        errors.incomeDate = 'incomeDate is required.';
      }
      return errors;
    },
    onSubmit: async (data) => {
      console.log('data', data);
      setDate((formik.values.date));
      // debugger
      var obj = {
        familyId: 1,
        sumOfMoney: data.sumOfMoney,
        source: data.source,
        incomeDate: data.incomeDate,
        bankEntryDate: data.bankEntryDate,
        year: data.year,
        month: data.month,
        type: data.type,
        beneficiary: data.beneficiary
      }
      console.log('obj', obj);
      await axios.post(`http://localhost:8000/incomes/`, obj);
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
        <Card title="Incomes- Manual entry 🤞🤘👌" style={{ width: '350px' }}>
          <p className="m-0">
            <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
              <span className="flex-auto">
                <label htmlFor="locale-user" className="font-bold block mb-2">amount of income</label>
                {/* <Toast ref={toast} /> */}
                <InputNumber inputId="locale-user" id="sumOfMoney" name="sumOfMoney"
                  value={formik.values.sumOfMoney}
                  onChange={(e) => formik.setFieldValue("sumOfMoney", e.value)}
                  minFractionDigits={2} />
              </span>
              {getFormErrorMessage("sumOfMoney")}
              <br />
              <span className="fp-float-label">
                <label htmlFor="locale-user" className="font-bold block mb-2">type of income</label>
                <Dropdown
                  id="type"
                  name="type"
                  // style={{ width: '180px' }}
                  value={formik.values.type}
                  onChange={(e) => formik.setFieldValue("type", e.target.value)}
                  // onChange={(e) => formik.setFieldValue("type", e.target.value.name)}
                  options={types}
                  optionLabel="name"
                  placeholder="choose"
                  filter valueTemplate={selectType}
                />
              </span>
              <br />
              <label htmlFor="locale-user" className="font-bold block mb-2">source of income</label>
              <span className="p-float-label">
                <InputText
                  id="source"
                  name="source"
                  value={formik.values.source}
                  onChange={(e) => formik.setFieldValue("source", e.target.value)}
                />
                <label htmlFor="username">source</label>
              </span>
              {getFormErrorMessage("source")}
              <br />
              <label htmlFor="locale-user" className="font-bold block mb-2">beneficiary of income</label>
              <span className="p-float-label">
                <InputText
                  id="beneficiary"
                  name="beneficiary"
                  value={formik.values.beneficiary}
                  onChange={(p) => formik.setFieldValue("beneficiary", p.target.value)}
                />
                <label htmlFor="username">beneficiary</label>
              </span>
              <br />
              <label htmlFor="locale-user" className="font-bold block mb-2">date of income</label>
              <Calendar
                id="incomeDate"
                name="incomeDate"
                style={{ width: '180px' }}
                // value={formik.values.date}
                value={date}
                onChange={(e) => formik.setFieldValue("incomeDate", e.target.value)}
                mask="99/99/9999"
                placeholder="00/00/0000"
                slotChar="mm/dd/yyyy"
              />
              {getFormErrorMessage("incomeDate")}
              <br /> <br />
              <span className="card flex justify-content-center">

                <Button type="submit" label="Send" style={{ width: '180px' }} />
              </span>
            </form>
          </p>
        </Card>


        {/* //   let api
  //             method: 'POST',
  //             url: apiUrl,
  //             // headers: {
  //             //     'Accept': 'application/json',
  //             //     'Content-Type': 'application/json;charset=UTF-8'
  //             // },
  //             data: {"sumOfMoney": data.sum, "source": data.source, "incomeDate": data.date
  //                 // firstName: 'John',
  //                 // lastName: 'Doe'
  //             }
  //         };
  // let res = await axios(options);
  // if (res && res.status === 200) {
  //     let resData = await res.data;
  // }}
  // ppp()
  // const{data,loading,refetch,error}=UseAxiosById('users/permissions',"111111111");
  //   useEffect(()=>{console.log('data',data);},[data])
//❤
  // async function getIncomeId(per) {
  //   console.log(per);
  //   let perObj = await income.data.filter((e) => { return e.identity == per })[0];
  //   console.log("perObj: " + perObj);
  //   // if(perObj.idpermission)
  //   return perObj.idincome;
  // }
  // const UploadIncome = async (e) => {
  //   console.log("UploadIncome", e);
  //   let eData = e.data;
  //   let newD = e.newData;
  //   if (eData.identity != null) {
  //     if (newD.identity != eData.identity)
  //       if (window.confirm("you want delete income " + eData.identity + " and replace him with new user " + newD.identity)) {
  //         let aaa = await axios.delete(`http://localhost:8000/users/${eData.identity}`);
  //         console.log("delete aaa: " + aaa);
  //       }
  //     if (newD.identity == eData.identity) {
  //       let obj = {};
  //       if (newD.permission != eData.permission) {
  //         let perId = await getIncomeId(newD.permission);
  //         obj['permissionId'] = perId;
  //       }
  //       if (newD.firstName != eData.firstName) {
  //         obj['firstName'] = newD.firstName;
  //       }
  //       console.log(obj);
  //       let ccc = await axios.put(`http://localhost:8000/users/${eData.identity}`, obj);
  //       console.log("put ccc: " + ccc);
  //     }
  //   }
  //   if (eData.identity == null) {
  //     let perId = await getIncomeId(newD.permission);
  //     let obj = { identity: newD.identity, firstName: newD.firstName, permission: perId };
  //     let bbb = await axios.post(`http://localhost:8000/users/${111111111}`, obj);
  //     console.log("post bbb: " + bbb);
  //   }
  // }
  


  // async function getPermissionId(per) {
  //   console.log(per);
  //   let perObj = await permissions.data.filter((e) => { return e.permissionName == per })[0];
  //   console.log("perObj: " + perObj);
  //   // if(perObj.idpermission)
  //   return perObj.idpermission;
  // }
  // const { data, loading, refetch, error } = UseAxiosById('users/permissions', "111111111");
  // useEffect(() => { console.log('data', data); }, [data])
  // const onRowEditComplete = (e) => {
  //   console.log("onRowEditComplete", e);
  //   const onRowEditComplete = async (e) => {
  //     console.log("onRowEditComplete", e);
  //     let eData = e.data;
  //     let newD = e.newData;
  //     if (eData.identity == null) {
  //       let perId = await getPermissionId(newD.permission);
  //       let obj = { identity: newD.identity, firstName: newD.firstName, permission: perId };
  //       let bbb = await axios.post(`http://localhost:8000/users/${111111111}`, obj);
  //       console.log("post bbb: " + bbb);
  //     }
  //   }


  // useEffect(() => {
  //     countryservice.getCountries().then((data) => setCountries(data));
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // const obj={
  //           "sumOfMoney":data.sum,
  //           "source":data.source,
  //           "incomeDate":data.date
  //       }
  //       console.log(obj);



  // const [countries, setCountries] = useState([]);
  // const [showMessage, setShowMessage] = useState(false);
  // const [formData, setFormData] = useState({});
  // const countryservice = new CountryService();
  // const defaultValues = {
  //     sum: '',
  //     type: '',
  //     source: '',
  //     mutav: null,
  //     date: null,
  //     accept: false,
  // };

  // useEffect(() => {
  //     countryservice.getCountries().then((data) => setCountries(data));
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // const {
  //     control,
  //     formState: { errors },
  //     handleSubmit,
  //     reset,
  // } = useForm({ defaultValues });

  // const onSubmit = (data) => {
  //     setFormData(data);
  //     setShowMessage(true);
  //     console.log(data);

  //     const obj={
  //         "sumOfMoney":data.sum,
  //         "source":data.source,
  //         "incomeDate":data.date
  //     }
  //     console.log(obj);


  //     reset();
  // };

  // const getFormErrorMessage = (name) => {
  //     return (
  //       errors[name] && <small className="p-error">{errors[name].message}</small>
  //     );
  //   };

  //   const dialogFooter = (
  //     <div className="flex justify-content-center">
  //       <Button
  //         label="OK"
  //         className="p-button-text"
  //         autoFocus
  //         onClick={() => setShowMessage(false)}
  //       />
  //     </div>
  //   );
  //   const passwordHeader = <h6>Pick a password</h6>;
  //   const passwordFooter = (
  //     <React.Fragment>
  //       <Divider />
  //       <p className="mt-2">Suggestions</p>
  //       <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
  //         <li>At least one lowercase</li>
  //         <li>At least one uppercase</li>
  //         <li>At least one numeric</li>
  //         <li>Minimum 8 characters</li>
  //       </ul>
  //     </React.Fragment>
  //   );


  

        {/* <Dialog
        visible={showMessage}
        onHide={() => setShowMessage(false)}
        position="top"
        footer={dialogFooter}
        showHeader={false}
        breakpoints={{ '960px': '80vw' }}
        style={{ width: '30vw' }}
      >
        <div className="flex justify-content-center flex-column pt-6 px-3">
          <i
            className="pi pi-check-circle"
            style={{ fontSize: '5rem', color: 'var(--green-500)' }}
          ></i>
          <h5>Registration Successful!</h5>
          <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
            Your account is registered under name <b>{formData.name}</b> ; it'll
            be valid next 30 days without activation. Please check{' '}
            <b>{formData.email}</b> for activation instructions.
          </p>
        </div>
      </Dialog>

      <div className="flex justify-content-center">
        <div className="card">
          <h5 className="text-center">Register</h5>
          <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
            <div className="field">
              <span className="p-float-label">
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: 'Name is required.' }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      {...field}
                      autoFocus
                      className={classNames({
                        'p-invalid': fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="name"
                  className={classNames({ 'p-error': errors.name })}
                >
                  Name*
                </label>
              </span>
              {getFormErrorMessage('name')}
            </div>
            <div className="field">
              <span className="p-float-label p-input-icon-right">
                <i className="pi pi-envelope" />
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: 'Email is required.',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: 'Invalid email address. E.g. example@email.com',
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      {...field}
                      className={classNames({
                        'p-invalid': fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="email"
                  className={classNames({ 'p-error': !!errors.email })}
                >
                  Email*
                </label>
              </span>
              {getFormErrorMessage('email')}
            </div>
            <div className="field">
              <span className="p-float-label">
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: 'Password is required.' }}
                  render={({ field, fieldState }) => (
                    <Password
                      id={field.name}
                      {...field}
                      toggleMask
                      className={classNames({
                        'p-invalid': fieldState.invalid,
                      })}
                      header={passwordHeader}
                      footer={passwordFooter}
                    />
                  )}
                />
                <label
                  htmlFor="password"
                  className={classNames({ 'p-error': errors.password })}
                >
                  Password*
                </label>
              </span>
              {getFormErrorMessage('password')}
            </div>
            <div className="field">
              <span className="p-float-label">
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <Calendar
                      id={field.name}
                      value={field.value}
                      onChange={(e) => field.onChange(e.value)}
                      dateFormat="dd/mm/yy"
                      mask="99/99/9999"
                      showIcon
                    />
                  )}
                />
                <label htmlFor="date">Birthday</label>
              </span>
            </div>
            <div className="field">
              <span className="p-float-label">
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      id={field.name}
                      value={field.value}
                      onChange={(e) => field.onChange(e.value)}
                      options={countries}
                      optionLabel="name"
                    />
                  )}
                />
                <label htmlFor="country">Country</label>
              </span>
            </div>
            <div className="field-checkbox">
              <Controller
                name="accept"
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <Checkbox
                    inputId={field.name}
                    onChange={(e) => field.onChange(e.checked)}
                    checked={field.value}
                    className={classNames({ 'p-invalid': fieldState.invalid })}
                  />
                )}
              />
              <label
                htmlFor="accept"
                className={classNames({ 'p-error': errors.accept })}
              >
                I agree to the terms and conditions*
              </label>
            </div>

            <Button type="submit" label="Submit" className="mt-2" />
          </form>
        </div>
      </div> */}
      </div>
    </>
  )
}
export default ManuallyIncome;