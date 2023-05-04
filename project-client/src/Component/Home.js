import React, { useContext, useEffect } from "react";
import ItemsButton from "./home/ItemsButton";
import UseAxiosGet from "../hooks/UseAxiosGet";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import UserContext from "./user/UserContext";
import { Button } from "primereact/button";

function Home() {
  // const{data,loading,refetch,error}=UseAxiosGet('users/');
  // useEffect(()=>{console.log('data',data);},[data])
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const items1 = [
    { label: "permissions", icon: <i class="pi pi-lock-open"></i> },
  ];
  const items2 = [
    { label: "view expenses", icon: <i class="pi pi-arrow-circle-up"></i> },
    { label: "view incomes", icon: <i class="pi pi-arrow-circle-down"></i> },
  ];
  const family = "Halbershtam";
  console.log({ user });
  return (
    <>
      <h1>Hello {user?.familyName} family</h1>
      <h2>You can do many operations:</h2>
      <div
        className="card flex justify-content-center"
        style={{ padding: "200px" }}
      >
        <Card className="md:w-25rem">
          <ItemsButton
            label="update details"
            items={items1}
            onClick={() => {
              navigate("/UpdateDetails");
            }}
          />
          <br />
          <br />
          <br />
          <ItemsButton label="view details" items={items2} />
          <br />
          <br />
          <br />
          <Button label="add income" />
          <br />
          <br />
          <br />
          <Button label="add expense" />
          <br />
          <br />
          <br />
          <Button label="charity" />
          <br />
          <br />
          <br />
        </Card>
      </div>
    </>
  );
}

export default Home;
