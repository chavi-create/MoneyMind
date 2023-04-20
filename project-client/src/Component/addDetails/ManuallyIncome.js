import React, { useState } from "react";
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
            </div>
        </>
    )
}
export default ManuallyIncome;