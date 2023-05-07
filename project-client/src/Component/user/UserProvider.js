import axios from "axios";
import { useState, useEffect } from "react";
import UseAxiosById from "../../hooks/UseAxiosById";
import UserContext from "./UserContext";

const UserProvider = ({ children, userId }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:8000/users/${userId}`).then((data) => {
        console.log({ data });
        setUser(data.data);
        data&&localStorage.setItem("user",JSON.stringify(data.data))
      });
    }
  }, [userId]);

  // useEffect(() => {
  //     if(data){
  //         console.log('dataUser ',data);
  //         setUser(data);
  //         console.log('user ',user);
  //     }
  // }, [data]);

//   useEffect(() => {
//     console.log({ userInContext: user });
//   }, [user]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
export default UserProvider;
