import useAxios from 'axios-hooks'
import { useEffect } from 'react'

const UseAxiosById = (url,id) => {
    const [{ data, loading, error }, refetch] = useAxios(
        `http://localhost:8000/${url}/${id}`
    )

    useEffect(() => { console.log('error:😢', error) }, [error]);
    return { data, loading, refetch, error }
}

export default UseAxiosById;