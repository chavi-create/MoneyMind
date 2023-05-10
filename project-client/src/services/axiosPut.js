import axios from "axios";

export default async function axiosPut(url,id, data) {
    try {
        const res = await axios.put(`http://localhost:8000/${url}/${id}`, data);
        return res;
    }
    catch {
        console.log("error put");
    }
}