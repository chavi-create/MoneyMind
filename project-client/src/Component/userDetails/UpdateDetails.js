import React, { useContext, useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputMask } from "primereact/inputmask";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import "primeicons/primeicons.css";
import axios from "axios";
import UseAxiosById from "../../hooks/UseAxiosById";
import dayjs from "dayjs";
import { Country, State, City } from "country-state-city";
import UserContext from "../user/UserContext";

export default function UpdateDetails() {
  const {user,setUser} = useContext(UserContext);

  const cities = City.getCitiesOfCountry("IL").map((city) => {
    return { name: city.name };
  });
  console.log({ cities });

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [identity, setIdentity] = useState("");
  const [date, setDate] = useState(null);
  const [pele, setPele] = useState("");
  const [email, setEmail] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    if (user) {
      console.log({ user });
      setFName(user.firstName);
      setLName(user.familyName);
      setIdentity(user.identity);
      setPele(user.pelephone);
      setEmail(user.email);
      setSelectedCity({ name: user.city });
      setDate(dayjs(user.birthdate).format("DD/MM/YYYY"));
    }
  }, [user]);

  useEffect(() => {
    console.log({ date });
  }, [date]);

  useEffect(() => {
    console.log({ selectedCity });
  }, [selectedCity]);

  const phone = "phone";

  const update = (data) => {
    console.log("on submit", data);
    const obj = {
      identity: identity ? identity : user.identity,
      firstName: fName ? fName : user.firstName,
      // familyName: lName ? lName : user.familyName,
      birthDate: date ? date : user.birthDate,
      pelephone: pele ? pele : user.pelephone,
      email: email ? email : user.email,
      city: selectedCity.name ? selectedCity.name : user.city,
    };
    try{
        axios.put(`http://localhost:8000/users/${user.identity}`, obj).then(data=>console.log(data));
        setUser(obj);
        localStorage.setItem("user",JSON.stringify(obj));
    }
    catch(err){
      console.log({err});
    }
    
  };

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

  const handleChange = (event) => {
    const result = event.target.value.replace(/\D/g, "");
    setPele(result);
  };

  return (
    <>
      <div
        className="card flex justify-content-center"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card title="Update details" style={{ width: "220px" }}>
          <p className="m-0">
            {/* <form className="flex flex-column gap-2"> */}
            <span className="p-float-label">
              <InputText
                id="username"
                value={fName}
                onChange={(e) => setFName(e.target.value)}
              />
              <label htmlFor="username">First name</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText
                id="userfamilyname"
                value={lName}
                onChange={(e) => setLName(e.target.value)}
              />
              <label htmlFor="username">Last name</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputNumber
                inputId="withoutgrouping"
                value={identity}
                onValueChange={(e) => setIdentity(e.value)}
                useGrouping={false}
              />
              <label htmlFor="withoutgrouping">Id</label>
            </span>
            <br />
            <Calendar
              style={{ width: "180px" }}
              value={new Date(date)}
              onChange={(e) => {console.log(e.value); setDate(e.value)}}
              // mask="99/99/9999"
              // placeholder="00/00/0000"
              slotChar="dd/mm/yyyy"
            />
            <br />
            <br />
            {/* <InputMask
                style={{ width: '180px' }}
                value={value3}
                onChange={(e) => setValue3(e.target.value)}
                mask={phone == 'phone' ? '99-9999999' : '000-000-0000'}
                placeholder="00-000000"
              /> */}
            <InputText
              style={{ width: "180px" }}
              value={pele}
              onChange={handleChange}
              mask={phone == "phone" ? "99-9999999" : "000-000-0000"}
              placeholder="00-000000"
              oninput={() =>
                (this.value = this.value
                  .replace(/[^0-9.]/g, "")
                  .replace(/(\..*)\./g, "$1"))
              }
            />
            <br />
            <br />
            {/* <label>Email</label> */}
            <span className="p-float-label">
              {/* <i class="pi pi-envelope" /> */}
              <InputText
                id="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                title="Invalid email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                style={{ width: "180px" }}
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.value)}
                options={cities}
                optionLabel="name"
                placeholder="Select a City"
                filter
                valueTemplate={selectedCityTemplate}
              />
            </span>
            <br />
            <br />
            <br />
            <span className="card flex justify-content-center">
              <Button label="Submit" onClick={update} />
            </span>
            {/* <div className="card flex justify-content-center">
                <Button label="Managing permissions and children's information" />
              </div> */}
            {/* </form> */}
          </p>
        </Card>
      </div>
    </>
  );
}
