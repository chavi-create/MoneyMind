const income = async (e) => {
    console.log("onRowEditComplete", e);
    let eData = e.data;
    let newD = e.newData;
    // console.log(!_.isEqual(eData,newD));
    if (eData.identity != null) {
        if (newD.identity != eData.identity)
            if (window.confirm("you want delete user " + eData.identity + " and replace him with new user " + newD.identity)) {
                let aaa = await axios.delete(`http://localhost:8000/users/${eData.identity}`);
                console.log("delete aaa: " + aaa);
            }
        if (newD.identity == eData.identity) {
            let obj = {};
            if (newD.permission != eData.permission) {
                let perId = await getPermissionId(newD.permission);
                obj['permissionId'] = perId;
            }
            if (newD.firstName != eData.firstName) {
                obj['firstName'] = newD.firstName;
            }
            console.log(obj);
            let ccc = await axios.put(`http://localhost:8000/users/${eData.identity}`, obj);
            console.log("put ccc: " + ccc);
        }
    }
    if (eData.identity == null) {
        let perId = await getPermissionId(newD.permission);
        let obj = { identity: newD.identity, firstName: newD.firstName, permission: perId };
        let bbb = await axios.post(`http://localhost:8000/users/${111111111}`, obj);
        console.log("post bbb: " + bbb);
    }}