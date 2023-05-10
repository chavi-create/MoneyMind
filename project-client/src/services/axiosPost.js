import axios from "axios";

export default async function axiosPost(url, data) {
    try {
        const res = await axios.post(`http://localhost:8000/${url}`, data);
        return res;
    }
    catch {
        console.log("error post");
    }
}


