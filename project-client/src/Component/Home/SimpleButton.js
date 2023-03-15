import React from 'react'; 
import { Button } from 'primereact/button';

const SimpleButton=(props)=> {
    return (
        <div className="card flex justify-content-center">
            <Button label={props.label} />
        </div>
    )
}
export default SimpleButton;