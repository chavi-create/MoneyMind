import { useEffect } from "react";

const RowExpansionTemplate =async (data) => {
    useEffect(()=>{
        const fData = await axios.get(`http://localhost:8000/manager/headusers/users/${data.idfamily}`);
    },[])
    
    console.log(fData.data);
    return (
        <div className="p-3">
            <h5>Orders for {data.familyName}</h5>
            <DataTable value={fData.data}>
                 <Column field="firstName" header="firstName" ></Column>
                 <Column field="age" header="age"></Column>
            </DataTable>
        </div>
    );
};

export default RowExpansionTemplate