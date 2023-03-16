import React from 'react'; 
import { Button } from 'primereact/button';

const SimpleButton=(props)=> {
    return (
        <div >
            <Button label={props.label} />
        </div>
    )
}
export default SimpleButton;