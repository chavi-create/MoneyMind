import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { SplitButton } from 'primereact/splitbutton';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';  

const SimpleButton=(props)=> {
    return (
        <>
        <div >
            <Button label={props.label}/>
        </div>
        </>
    );
}
export default SimpleButton;
