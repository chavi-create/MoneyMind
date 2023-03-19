import useAxios from 'axios-hooks'
import { useEffect } from 'react'

const UseAxiosGet = (url) => {
    const [{ data, loading, error }, refetch] = useAxios(
        `http://localhost:8000/${url}`
    )

    useEffect(() => { console.log('error:😢', error) }, [error]);
    return { data, loading, refetch, error }
}

export default UseAxiosGet;