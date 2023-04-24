import React, { useState, useEffect } from "react";
import axios from 'axios'

export const UseAxiosPost = async (url, details) => {
    console.log(details);
    try {
        const res = await axios.post(`http://localhost:8000/${url}`, details);
        console.log(res);
        return res;
    }
    catch (err) {
        console.error(`error😒 ${err}`);
    }
}