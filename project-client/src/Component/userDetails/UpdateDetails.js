import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';

export default function UpdateDetails() {
  const [value, setValue] = useState('');
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');

  const [date, setDate] = useState(null);
  const phone = 'phone';

  const [selectedCountry, setSelectedCountry] = useState(null);
  const countries = [
    { name: 'Australia', code: 'AU' },
    { name: 'Brazil', code: 'BR' },
    { name: 'China', code: 'CN' },
    { name: 'Egypt', code: 'EG' },
    { name: 'Israel', code: 'IL' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'India', code: 'IN' },
    { name: 'Japan', code: 'JP' },
    { name: 'Spain', code: 'ES' },
    { name: 'United States', code: 'US' },
  ];

  const selectedCountryTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <img
            alt={option.name}
            src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
            className={`mr-2 flag flag-${option.code.toLowerCase()}`}
            style={{ width: '18px' }}
          />
          <div>{option.name}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const countryOptionTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <img
          alt={option.name}
          src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
          className={`mr-2 flag flag-${option.code.toLowerCase()}`}
          style={{ width: '18px' }}
        />
        <div>{option.name}</div>
      </div>
    );
  };

  return (
    <>
      <div className="card flex justify-content-center">
        <Card title="Update details">
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
                value={date}
                onChange={(e) => setDate(e.value)}
                mask="99/99/9999"
                placeholder="00/00/0000"
                slotChar="mm/dd/yyyy"
              />
              <br />
              <InputMask
                value={value3}
                onChange={(e) => setValue3(e.target.value)}
                mask={phone == 'phone' ? '99-9999999' : '000-000-0000'}
                placeholder="00-000000"
              />
              <br />
              <span className="p-float-label">
                <i class="pi pi-envelope" />
                <InputText
                  id="email"
                  value={value4}
                  onChange={(e) => setValue4(e.target.value)}
                />
                <label htmlFor="email" icon="pi pi-envelope">Email</label>
              </span>
              <br />
              <span className="card flex justify-content-center">
                <Dropdown
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.value)}
                  options={countries}
                  optionLabel="name"
                  placeholder="Country"
                  filter
                  valueTemplate={selectedCountryTemplate}
                  itemTemplate={countryOptionTemplate}
                  className="w-full md:w-14rem"
                />
              </span>
              <div className="card flex justify-content-center">
                <Button label="Managing permissions and children's information" />
              </div>
            </form>
          </p>
        </Card>
      </div>
    </>
  );
}
