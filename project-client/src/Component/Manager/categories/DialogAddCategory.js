import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useFormik } from "formik";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

export default function DialogAddCategory(props) {
//   const [visible, setVisible] = useState(false);
  const toast = useRef(null);
  //   const [value, setValue] = useState();
  const charityOptions = [{ name: "yes" }, { name: "no" }];

  const show = () => {
    toast.current.show({
      severity: "success",
      summary: "Form Submitted",
      detail: formik.values.value,
    });
  };
  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "error Submitted",
      detail: formik.values.value,
    });
  };
  const formik = useFormik({
    initialValues: {
      CategoryName: "",
      Charity: "",
      namedReplace: "",
    },
    validate: (data) => {
      let errors = {};
      if (!data.CategoryName) {
        errors.CategoryName = "CategoryName is required.";
      }
      if (!data.Charity) {
        errors.Charity = "Charity is required.";
      }
      return errors;
    },
    onSubmit: async (data) => {},
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
        onHide={() => props.setVisible(false)}
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
                  name="CategoryName"
                  value={formik.values.CategoryName}
                  onChange={(e) => {
                    formik.setFieldValue("CategoryName", e.target.value);
                  }}
                />
                <label htmlFor="input_value">categoryName</label>
              </span>
              <br />
              <br />
              <span className="p-float-label">
                <Dropdown
                  id="charity"
                  name="Charity"
                  value={formik.values.Charity}
                  onChange={(e) =>
                    formik.setFieldValue("Charity", e.target.value)
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
                <InputText
                  id="namedReplace"
                  name="namedReplace"
                  value={formik.values.namedReplace}
                  onChange={(e) => {
                    formik.setFieldValue("namedReplace", e.target.value);
                  }}
                />
                {/* multy select with props.names */}
                <label htmlFor="input_value">namesReplace separated by ,</label>
              </span>
              <br />
              <br />
              {getFormErrorMessage("CategoryName")}
              {getFormErrorMessage("Charity")}
              <Button type="submit" label="create" />
            </form>
          </Card>
        </div>
      </Dialog>
    </div>
  );
}
