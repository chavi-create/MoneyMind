import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useFormik } from "formik";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from 'primereact/multiselect';
import axios from "axios";

export default function DialogAddCategory(props) {
  const toast = useRef(null);
  const charityOptions = [{ name: "yes" }, { name: "no" }];

  const show = () => {
    toast.current.show({
      severity: "success",
      summary: "successful",
      detail: formik.values.value,
    });
  };
  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "error",
      detail: formik.values.value,
    });
  };
  const formik = useFormik({
    initialValues: {
      categoryName: "",
      charity: "",
      namesReplace: "",
    },
    validate: (data) => {
      let errors = {};
      if (!data.categoryName) {
        errors.categoryName = "categoryName is required.";
      }
      if (!data.charity) {
        errors.charity = "charity is required.";
      }
      return errors;
    },
    onSubmit: async (data) => {
      // console.log(formik.values.namesReplace);
      data.charity=data.charity.name=='yes'?1:0;
      if(data.namesReplace.length>0)
        data.namesReplace=data.namesReplace.map(x=>x.name);
      console.log({data});    
      try{
        await axios.post(`http://localhost:8000/categories/`,data);
        data&&show(data);
      }
      catch{
        data&&showError(data);
      }
      formik.resetForm();
      // props.setVisible(false);
     },
  });

  const isFormFieldInvalid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? (
      <small className="p-error">{formik.errors[name]}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };


      const panelFooterTemplate = () => {
        const length = props.names ? props.names.length : 0;
        return (
            <div className="py-2 px-3">
                <b>{length}</b> item{length > 1 ? 's' : ''} selected.
            </div>
        );
    };
    
  //   const footerContent = (
  //     <div>
  //       <Button
  //         label="No"
  //         icon="pi pi-times"
  //         onClick={() => setVisible(false)}
  //         className="p-button-text"
  //       />
  //       <Button
  //         label="Yes"
  //         icon="pi pi-check"
  //         onClick={() => setVisible(false)}
  //         autoFocus
  //       />
  //     </div>
  //   );footer={footerContent}

  return (
    <div className="card flex justify-content-center">
      {/* <Button
        label="Show"
        icon="pi pi-external-link"
        onClick={() => setVisible(true)}
      /> */}
      <Dialog
        header="New category"
        visible={props.visible}
        style={{ width: "50vw" }}
        onHide={() => { props.setVisible(false); formik.resetForm(); }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <div className="card flex justify-content-center">
          <Card className="md:w-25rem">
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-column gap-2"
            >
              <Toast ref={toast} />
              <span className="p-float-label">
                <InputText
                  id="categoryName"
                  name="categoryName"
                  value={formik.values.categoryName}
                  onChange={(e) => {
                    formik.setFieldValue("categoryName", e.target.value);
                  }}
                />
                <label htmlFor="input_value">categoryName</label>
              </span>
              <br />
              <br />
              <span className="p-float-label">
                <Dropdown
                  id="charity"
                  name="charity"
                  value={formik.values.charity}
                  onChange={(e) =>
                    formik.setFieldValue("charity", e.target.value)
                  }
                  options={charityOptions}
                  optionLabel="name"
                  placeholder=""
                  className="w-full md:w-14rem"
                />

                <label htmlFor="input_value">charity</label>
              </span>
              <br />
              <br />
              {/* <label>names replace separate by ,</label> */}
              <span className="p-float-label">
                {/* <InputText
                  id="namesReplace"
                  name="namesReplace"
                  value={formik.values.namesReplace}
                  onChange={(e) => {
                    formik.setFieldValue("namesReplace", e.target.value);
                  }}
                /> */}
                <MultiSelect id="namesReplace"
                  name="namesReplace" value={formik.values.namesReplace}
                  onChange={(e) => {
                    formik.setFieldValue("namesReplace", e.target.value);
                  }} options={props.names} optionLabel="name" 
                filter placeholder="" maxSelectedLabels={2}  display="chip" panelFooterTemplate={panelFooterTemplate} className="w-full md:w-20rem" />
                {/* multy select with props.names */}
                <label htmlFor="input_value">namesReplace</label>
              </span>
              <br />
              <br />
              {getFormErrorMessage("categoryName")}
              {getFormErrorMessage("charity")}
              <Button type="submit" label="create" />
            </form>
          </Card>
        </div>
      </Dialog>
    </div>
  );
}