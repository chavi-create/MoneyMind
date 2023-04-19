
import React, { useState, useRef } from "react";
import { Camera } from "react-camera-pro";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";

import 'primeicons/primeicons.css';
const AddIncome = () => {
    const camera = useRef(null);
    const [image, setImage] = useState(null);

    const header = (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" style={{ "width": "98%", "height": "50px" }} />
    );
    const footer = (
        <div className="flex flex-wrap justify-content-end gap-2">

        </div>
    );
    // const navigate = useNavigate();

    return (
        <Card title="Welcome!" footer={footer} header={header} className="md:w-25rem" style={{ overflowY: "auto", "margin": "2%", "width": "95%", "height": "95%" }}>
            <p className="m-0">
                <h4>Please take a picture of the store sign to your right:</h4>
                {/* <iframe src="https://example.com/camera-pro-iframe" allow="camera;"/> */}

                {!image ? <><Camera ref={camera} aspectRatio={8 / 5} />
                    <br />
                    <Button label="take a picture" icon="pi-camera" onClick={() => {

                        setImage(camera.current.takePhoto())

                    }} />
                </> 
               : <>

                    <img src={image} alt='Taken photo' style={{ "width": "70%" }} />

                    <h4>you are near:  XXXX </h4>

                    <span className="p-buttonset">

                        <Button label="Yes!" icon="pi pi-check" onClick={() => console.log("popp")}//navigate("/visitor/presentLocation")
                        />
                        <br /><br />

                        <Button label="Canceling and reshooting" icon="pi pi-times" onClick={() => {

                            setImage("")

                        }} />
                    </span>
                    </>
                }
            </p>
        </Card>

    );
}

export default AddIncome;

