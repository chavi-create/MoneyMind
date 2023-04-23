import React, { useEffect, useState } from "react";
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';

const ManuallyIncome = () => {
    const [value1, setValue1] = useState();
    const [value, setValue] = useState('');
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
            return (
                <div className="flex align-items-center">
                    {/* <img
                alt={option.name}           
                className={`mr-2 flag flag-${option.code.toLowerCase()}`}
                // style={{ width: '18px' }}
              /> */}
                    <div>{option.name}</div>
                </div>
            );
        }
        return <span>{props.placeholder}</span>;
    };

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


    return (
        <>
            <div className="card flex flex-wrap gap-3 p-fluid">
                <Card title="Manual entry 🤞🤘👍👌" style={{ width: '350px' }}>
                    <p className="m-0">
                        <form className="flex flex-column gap-2">
                            <span className="flex-auto">
                                <label htmlFor="locale-user" className="font-bold block mb-2">amount of income</label>
                                <InputNumber inputId="locale-user" value={value1} onValueChange={(e) => setValue1(e.value)} minFractionDigits={2} />
                            </span>
                            <br />
                            <span className="fp-float-label">
                                <label htmlFor="locale-user" className="font-bold block mb-2">type of income</label>
                                <Dropdown
                                    style={{ width: '180px' }}
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.value)}
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
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                />
                                <label htmlFor="username">source</label>
                            </span>
                            <br />
                            <label htmlFor="locale-user" className="font-bold block mb-2">מוטב of income</label>
                            <span className="p-float-label">
                                <InputText
                                    value={value2}
                                    onChange={(e) => setValue2(e.target.value)}
                                />
                                <label htmlFor="username">מוטב</label>
                            </span>
                            <br />
                            <label htmlFor="locale-user" className="font-bold block mb-2">date of income</label>
                            <Calendar
                                style={{ width: '180px' }}
                                value={date}
                                onChange={(e) => setDate(e.value)}
                                mask="99/99/9999"
                                placeholder="00/00/0000"
                                slotChar="mm/dd/yyyy"
                            />
                            <br />
                            <span className="card flex justify-content-center">
                                <Button label="Send" style={{ width: '180px' }} />
                            </span>
                        </form>
                    </p>
                </Card>

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