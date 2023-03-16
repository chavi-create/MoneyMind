// import React, { useState } from "react";
// import { Calendar } from 'primereact/calendar';

// export default function BasicDemo() {
//     const [date, setDate] = useState(null);

//     return (
//         <div className="card flex justify-content-center">
//             <Calendar value={date} onChange={(e) => setDate(e.value)} mask="99/99/9999" placeholder="99/99/9999" slotChar="mm/dd/yyyy" />
//         </div>
//     )
// }


// export default function FloatLabelDemo() {
//     const [value, setValue] = useState('');
//     const [date, setDate] = useState(null);
//     const phone = 'phone'

//     return (
//         <>
//         <div className="card flex justify-content-center">
//             <span className="p-float-label">
//                 <InputText id="username" value={value} onChange={(e) => setValue(e.target.value)} />
//                 <label htmlFor="username">Username</label>
//             </span>
//         </div>
//         <br/>
//         <div className="card flex justify-content-center">
//             <span className="p-float-label">
//                 <InputText id="username" value={value} onChange={(e) => setValue(e.target.value)} />
//                 <label htmlFor="username">Username</label>
//             </span>
//         </div>




//         <br/>
//         <div className="card flex justify-content-center">
//             <Calendar value={date} onChange={(e) => setDate(e.value)} mask="99/99/9999" placeholder="99/99/9999" slotChar="mm/dd/yyyy" />
//         </div>
//         <br/>
//         <div className="card flex justify-content-center">
//             <InputMask value={value} onChange={(e) => setValue(e.target.value)} mask={phone=='phone'?"99-9999999":"999-999-9999" }placeholder="99-999999"/>
//         </div>

//         </>
//     )
// }