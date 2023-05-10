import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";

export default function LoginSignUp(props){
    const {newFamily,setNewFamily}=useState(false);

    const setNewFamilyCallback = () => {
        setNewFamily(true);
      }

    return(
        <>
        {!newFamily?<Login setUserId={props.setUserId} setNewFamily={setNewFamilyCallback}></Login>
        :<SignUp></SignUp>}
        </>
    )

}