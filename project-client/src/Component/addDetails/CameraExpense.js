import React, { useState, useRef } from "react";
import { Camera } from "react-camera-pro";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";
import 'primeicons/primeicons.css';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
import { TabView, TabPanel } from 'primereact/tabview';

const CameraExpense = () => {
    const camera = useRef(null);
    const [image, setImage] = useState(null);

    // const navigate = useNavigate();


    //עד הרטורן- קשור להעלת קבצים מהמחשב-זה מלאאא
    const toast = useRef(null);
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef(null);

    const onTemplateSelect = (e) => {
        let _totalSize = totalSize;
        let files = e.files;

        Object.keys(files).forEach((key) => {
            _totalSize += files[key].size || 0;
        });

        setTotalSize(_totalSize);
    };

    const onTemplateUpload = (e) => {
        let _totalSize = 0;

        e.files.forEach((file) => {
            _totalSize += file.size || 0;
        });

        setTotalSize(_totalSize);
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };

    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        callback();
    };

    const onTemplateClear = () => {
        setTotalSize(0);
    };

    const headerTemplate = (options) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize / 10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {uploadButton}
                {cancelButton}
                <div className="flex align-items-center gap-3 ml-auto">
                    <span>{formatedValue} / 1 MB</span>
                    <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
                </div>
            </div>
        );
    };

    const itemTemplate = (file, props) => {
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{ width: '40%' }}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        );
    };

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
                    Drag and Drop Image Here
                </span>
            </div>
        );
    };

    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };

    return (
        <Card title="Take a picture of the expense 📸" style={{ width: '350px' }}>
            <TabView>
                <TabPanel header="By camera" leftIcon="pi pi-camera">
                    <p className="m-0">
                        {/* <iframe src="https://example.com/camera-pro-iframe" allow="camera;"/> */}
                        {!image ? <><Camera ref={camera} aspectRatio={8 / 5} />
                            <br />
                            <Button label="take a picture" icon="pi pi-camera" onClick={() => { setImage(camera.current.takePhoto()) }} />
                        </> : <>
                            <img src={image} alt='Taken photo' style={{ "width": "70%" }} />
                            <br /><br />
                            <span className="p-buttonset">
                                <Button label="Yes!" icon="pi pi-check" onClick={() => console.log("photo")}//navigate("/visitor/presentLocation")
                                />
                                <br /><br />
                                <Button label="Canceling and reshooting" icon="pi pi-times" onClick={() => { setImage("") }} />
                            </span>
                        </>
                        }
                    </p>
                </TabPanel>
                <TabPanel header="Upload a file" leftIcon="pi pi-fw pi-images">
                    <p className="m-0">
                        <Toast ref={toast}></Toast>
                        <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
                        <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
                        <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

                        <FileUpload ref={fileUploadRef} name="demo[]" url="/api/upload" multiple accept="image/*" maxFileSize={1000000}
                            onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                            headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                            chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />
                    </p>
                </TabPanel>
            </TabView>
            <h4>פה צריך להיות החלק של הבינה בלה בלה בלה🤓</h4>
        </Card>
    );
}

export default CameraExpense;
