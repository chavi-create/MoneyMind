import axios from "axios";

export default async function axiosDelete(url,id) {
    try {
        const res = await axios.delete(`http://localhost:8000/${url}/${id}`);
        return res;
    }
    catch {
        console.log("error delete");
    }
};
