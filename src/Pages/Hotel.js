import React, { useState, useEffect } from 'react'
import { Box } from '@mui/system'
import SearchFilter from '../Components/SearchFilter/SearchFilter'
import useAxios from '../Axios/useAxios'
import HotelCard from '../Components/HotelCard'

const Hotel = () => {
    const [hotels, setHotels] = useState([])
    const [filter, setFilter] = useState([])
    const [countries, setCountries] = useState([])
    const [cities, setCities] = useState([])
    const { response: res_hotels, error: err_hotels } = useAxios("Hotel","get_hotels")
    const { response: res_cities, error: err_cities } = useAxios("Hotel","get_cities")
    const { response: res_countries, error: err_countries } = useAxios("Hotel","get_countries")

    const Filter_options = [
        {
            name: "None",
            values: [
                {
                    name: "None",
                    value: ""
                }
            ]
        },
        {
            name: "Country",
            values: [
                {
                    name: "None",
                    value: ""
                },
                ...countries
            ]
        },
        {
            name: "City",
            values: [
                {
                    name: "None",
                    value: ""
                },
                ...cities
            ]
        },
    ]

    useEffect(() => {
        try {
            if (res_hotels != null && res_countries != null && res_cities != null) {
                setHotels(res_hotels)
                setFilter(res_hotels)
                setCountries(
                    res_countries.map(data => {
                        data = {
                            name: data,
                            value: data
                        }
                        return data
                    })
                )
                setCities(
                    res_cities.map(data => {
                        data = {
                            name: data,
                            value: data
                        }
                        return data
                    })
                )
            }
        } catch (error) {
            console.log(error);
        }

    }, [res_hotels, res_cities, res_countries])

    console.log(hotels);

    return (
        <>
            <Box p={8}>
                <Box pb={2}>
                    <SearchFilter options={Filter_options} list={hotels} setData={setFilter} searchBy={"Name"} />
                </Box>
                <Box display="flex" flexWrap="wrap">
                    {
                        [1, 2, 3, 4, 5].map(e => {
                            return filter.map(({ Address, City, Country, HotelID, Image, Name }, index) =>
                                <HotelCard key={index} address={Address} city={City} country={Country} id={HotelID} image={Image} name={Name} />
                            )
                        })
                    }
                </Box>
            </Box>
        </>
    )
}

export default Hotel