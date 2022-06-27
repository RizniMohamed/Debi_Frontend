
import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://localhost:44316/APIs/';

const useAxios = (endpoint, method, body = {}, manual = false) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);

    const fetchData = () => {
        axios
            .post(`${endpoint}.asmx/${method}`, body, {
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
        if (!manual)
            fetchData();
    }, []);

    // custom hook returns value
    return {
        response,
        error,
        loading,
        axios,
        path: `${endpoint}.asmx/${method}`,
        headers: {
            headers: {
                'Access-Control-Allow-Origin': true
            }
        }
    };
};

export default useAxios;
