import React, { useContext, useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import 'primeicons/primeicons.css';
import axios from 'axios';
import UseAxiosById from '../../hooks/UseAxiosById';
import dayjs from "dayjs"
import { Country, State, City }  from 'country-state-city';
import UserContext from '../user/UserContext';

export default function UpdateDetails() {
  const user = useContext(UserContext);
  // debugger
  const fData = UseAxiosById('users',user?.identity);
  // let fData;
  // const fetchFunc=async()=>{
  //   // fData = UseAxiosById('users',user.identity);
  //   fData=await axios.get(`http://localhost:8000/users/${user.identity}`);
  //   console.log("fdata: "+fData);
  // }
  // useEffect(()=>{
  //   if(user)
  //   fetchFunc();
  //   fData=await axios.get(`http://localhost:8000/users/${user.identity}`);
  // },[])
  const cities = City.getCitiesOfCountry("IL").map((city)=>{return {"name":city.name}});
    console.log({ cities });

  // useEffect(() => { console.log({ _cities }); }, [_cities])



  const [value, setValue] = useState('');
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');

  const [date, setDate] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    if (fData.data) {
      console.log({fData});
      setValue(fData.data.firstName);
      setValue2(fData.data.identity);
      // setValue3(fData.data.pelephone);
      setTextNum(fData.data.pelephone);
      setValue4(fData.data.email);
      setSelectedCity({ name: fData.data.city });
      setDate(dayjs(fData.data.birthdate).format("DD/MM/YYYY"));
    }
  }, [fData.data])

  useEffect(() => {
    console.log({ date })
  }, [date])

  useEffect(() => {
    console.log({ selectedCity })
  }, [selectedCity])

  const phone = 'phone';

  const update = (data) => {
    console.log("on submit", data);

  }

  const selectedCityTemplate = (option, props) => {
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


  const [textNum, setTextNum] = useState('');

  const handleChange = event => {
    const result = event.target.value.replace(/\D/g, '');

    setTextNum(result);
  };



  return (
    <>
      <div className="card flex justify-content-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card title="Update details" style={{ width: '220px' }}>
          <p className="m-0">
            <form className="flex flex-column gap-2">
              <span className="p-float-label">
                <InputText
                  id="username"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <label htmlFor="username">First name</label>
              </span>
              <br />
              <span className="p-float-label">
                <InputText
                  id="userfamilyname"
                  value={value1}
                  onChange={(e) => setValue1(e.target.value)}
                />
                <label htmlFor="username">Last name</label>
              </span>
              <br />
              <span className="p-float-label">
                <InputNumber
                  inputId="withoutgrouping"
                  value={value2}
                  onValueChange={(e) => setValue2(e.value)}
                  useGrouping={false}
                />
                <label htmlFor="withoutgrouping">Id</label>
              </span>
              <br />
              <Calendar
                style={{ width: '180px' }}
                value={new Date(date)}
                onChange={(e) => setDate(e.value)}
                // mask="99/99/9999"
                // placeholder="00/00/0000"
                slotChar="dd/mm/yyyy"
              />
              <br /><br />
              {/* <InputMask
                style={{ width: '180px' }}
                value={value3}
                onChange={(e) => setValue3(e.target.value)}
                mask={phone == 'phone' ? '99-9999999' : '000-000-0000'}
                placeholder="00-000000"
              /> */}
              <InputText
                style={{ width: '180px' }}
                value={textNum}
                onChange={handleChange}
                mask={phone == 'phone' ? '99-9999999' : '000-000-0000'}
                placeholder="00-000000"
                oninput={() => this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')}
              />
              <br /><br />
              {/* <label>Email</label> */}
              <span className="p-float-label">
                {/* <i class="pi pi-envelope" /> */}
                <InputText
                  id="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                  title="Invalid email address"
                  value={value4}
                  onChange={(e) => setValue4(e.target.value)}
                />
                <label htmlFor="email" icon="pi pi-envelope">
                  Email
                </label>
              </span>
              <br />
              {/* <span className="p-float-label">
                <Dropdown
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.value)}
                  options={cities}
                  optionLabel="name"
                  placeholder="Select a City"
                  className="w-full md:w-14rem"
                />
            //   </span> **:)*/}
              <span className="fp-float-label">
                <Dropdown
                  style={{ width: '180px' }}
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.value)}
                  options={cities}
                  optionLabel="name"
                  placeholder="Select a City"
                  filter
                  valueTemplate={selectedCityTemplate}
                />
              </span>
              <br /><br /><br />
              <span className="card flex justify-content-center">
                <Button label="Submit" onClick={update} />
              </span>
              {/* <div className="card flex justify-content-center">
                <Button label="Managing permissions and children's information" />
              </div> */}
            </form>
          </p>
        </Card>
      </div>
    </>
  );
}