import { useState, useEffect } from "react";
import UseAxiosById from "../../hooks/UseAxiosById";
import UserContext from './UserContext';
//import { getUser } from '../../services/user';


const UserProvider = ({ children, userId }) => {

    const [user, setUser] = useState({});
    const {data,loading,refetch,error}=UseAxiosById('users',userId);
    // useEffect(() => {
    //     if(userId){
    //         console.log('dataUser ',data);
    //         setUser(data);
    //         console.log('user ',user);
    //     }
    // }, [userId]);
    useEffect(() => {
        if(data){
            console.log('dataUser ',data);
            setUser(data);
            console.log('user ',user);
        }
    }, [data]);

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
}
export default UserProvider;