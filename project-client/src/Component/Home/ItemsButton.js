import React, { useRef } from 'react';   
import { SplitButton } from 'primereact/splitbutton';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
const ItemsButton=(props)=> {
    const toast = useRef(null);
        const items =[];
        props.items.forEach(e => {
            items.push({label:e.label,icon:e.icon,command: () => { toast.current.show()}})            
        });
    return (
      <>
        <div className="card flex justify-content-center">
            <Toast ref={toast}></Toast>
            <SplitButton label={props.label}  model={items} />
        </div>
      </>
    );}
    export default ItemsButton;