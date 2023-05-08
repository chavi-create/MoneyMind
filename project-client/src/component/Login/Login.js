import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Password } from "primereact/password";
import UseAxiosGet from "../../hooks/UseAxiosGet";
import UseAxiosById from "../../hooks/UseAxiosById";
import axios from "axios";

const Login = (props) => {
  const navigate = useNavigate();
  const toast = useRef(null);
  const [value, setValue] = useState();
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
      Id: "",
      Password: "",
    },
    validate: (data) => {
      let errors = {};
      if (!data.Id) {
        errors.Id = "Identity is required.";
      }
      if (!data.Password) {
        errors.Password = "Password is required.";
      }
      return errors;
    },
    onSubmit: async (data) => {
      try {
        const result = await axios.get(
          `http://localhost:8000/users/login/${data.Id}`,
          { params: { password: data.Password } }
        );
        // console.log({result});
        props.setUserId(result.data.identity);
        data && show(data);
        navigate("/");
      } catch {
        data && showError(data);
        formik.resetForm();
      }
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

  return (
    <div className="card flex justify-content-center">
      <Card className="md:w-25rem">
        <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
          <Toast ref={toast} />
          {/* <span className="p-float-label">           
            <InputText
              id="value"
              name="value"
              value={value}
              onChange={(e) => {
                setValue(e.value);
              }}
            />
            <label htmlFor="input_value">Name</label>
          </span>          <br /> */}
          <span className="p-float-label">
            <InputNumber
              inputId="withoutgrouping"
              id="number-input"
              name="Id"
              value={formik.values.Id}
              onValueChange={(e) => {
                formik.setFieldValue("Id", e.target.value);
              }}
              useGrouping={false}
            />
            <label htmlFor="number-input">Identity</label>
          </span>
          <br />
          <span className="p-float-label">
            <Password
              id="Password"
              name="Password"
              value={formik.values.Password}
              onChange={(e) => formik.setFieldValue("Password", e.target.value)}
              toggleMask
            />
            <label htmlFor="password">Password</label>
          </span>
          <br /><br /><br />         
          {/* <div className="card flex justify-content-center">
            <Button type="new family" label="new family" onClick={() => { props.setNewFamily(true) }} />
          </div> */}
          <br /><br /><br />          
          {/* {getFormErrorMessage('value')} */}
          {getFormErrorMessage("Id")}
          {getFormErrorMessage("Password")}
          <Button type="submit" label="Login" />
        </form>
        <div className="card flex justify-content-center">
          <Button
            type="new family"
            label="new family"
            onClick={() => {
              props.setNewFamily();
            }}
          />
        </div>
      </Card>
    </div>
  );
};

export default Login;
