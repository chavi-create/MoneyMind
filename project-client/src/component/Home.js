import React, { useContext, useEffect } from "react";
import ItemsButton from './home/ItemsButton'
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import UserContext from "./user/UserContext";
import { Button } from "primereact/button";
// import SimpleButton from './home/SimpleButton';
import UseAxiosGet from '../hooks/UseAxiosGet';
import UsersPermissions from './permissions/UsersPermissions';
import PermissionsTable from './permissions/PermissionsTable'

function Home() {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const items1 = [
    { label: "permissions", icon: <i class="pi pi-lock-open"></i>, command: () => navigate('/usersPermissions') },
  ];
  const items2 = [
    { label: "view expenses", icon: <i class="pi pi-arrow-circle-up"></i>, command: () => navigate('/expensesView') },
    { label: "view incomes", icon: <i class="pi pi-arrow-circle-down"></i>, command: () => navigate('/incomesTable') },
  ];

  return (
    <>
      <h1>Hello {user?.familyName} family</h1>
      <h2>You can do many operations:</h2>
      <div
        className="card flex justify-content-center"
        // style={{ padding: "200px" }}
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
          <ItemsButton label="view details" items={items2} onClick={() => {
            navigate('/CurrentWatch');
          }}/>
          <br />
          <br />
          <br />
          <Button label="add income" onClick={() => {
            navigate('/CameraIncome');
          }}/>
          <br />
          <br />
          <br />
          <Button label="add expense" onClick={() => {
            navigate('/CameraExpense');
          }}/>
          <br />
          <br />
          <br />
          <Button label="charity" onClick={() => {
            navigate('/Charity');
          }} />
          <br />
          <br />
          <br />
        </Card>
      </div>
    </>
  );
}

      export default Home;
