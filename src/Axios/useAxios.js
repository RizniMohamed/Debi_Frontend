
import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://localhost:44316/APIs/';

const useAxios = (api,body = {}) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);

    const fetchData = () => {
        axios
            .post(api,body,{
                headers: {
                    'Access-Control-Allow-Origin': true
                }
            })
            .then((res) => {
                setResponse(res.data.d);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setloading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    // custom hook returns value
    return { response, error, loading };
};

export default useAxios;
