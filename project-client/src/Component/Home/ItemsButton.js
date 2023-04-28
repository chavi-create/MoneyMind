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
          // if(e.command)
          // items.push({label:e.label,icon:e.icon,command:e.command})
          // else
            items.push({label:e.label,icon:e.icon,command: () => { toast.current.show()}})            
        });
    return (
      <>
        <div >
            <Toast ref={toast}></Toast>
            <SplitButton label={props.label}  model={items} onClick={props.onClick}/>
        </div>
      </>
    );}
    export default ItemsButton;