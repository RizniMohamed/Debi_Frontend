import React, { useState, useEffect } from 'react'
import { Box } from '@mui/system'
import SearchFilter from '../Components/SearchFilter/SearchFilter'
import useAxios from '../Axios/useAxios'
import HotelCard from '../Components/HotelCard'
import Typography from '@mui/material/Typography'
import { useDispatch } from 'react-redux'
import { dialogActions } from '../Store/dialogSlice'

const Hotel = () => {
    const [hotels, setHotels] = useState([])
    const [filter, setFilter] = useState([])
    const [countries, setCountries] = useState([])
    const [cities, setCities] = useState([])
    const { response: res_hotels, error: err_hotels } = useAxios("Hotel", "get_hotels")
    const { response: res_cities, error: err_cities } = useAxios("Hotel", "get_cities")
    const { response: res_countries, error: err_countries } = useAxios("Hotel", "get_countries")
    const { axiosU, pathU, headersU } = useAxios("User", "post_user", {}, true)
    const { axiosH, pathH, headersH } = useAxios("Hotel", "post_hotel", {}, true)
    const dispatch = useDispatch()

    const uploadUser = async (data) => {
        let response = ""
        axiosU
            .post(pathU, {
                email: data.email,
                password: "root",
                name: data.name,
                image: data.image,
                contact: data.contact,
                address: data.address,
                nic: data.nic,
                roleID: 2,
            }, headersU)
            .then(res => {
                response = res.data.d

                axiosH
                    .post(pathH, {
                        name: data.hotel_name,
                        image: data.hotel_image,
                        contact: data.hotel_contact,
                        city: data.hotel_city,
                        country: data.hotel_country,
                        address: data.hotel_address,
                        userID: response.UserId,

                    }, headersH)
                    .then(res => {
                        response = res.data.d
                        console.log(response);
                    })
                    .catch(e => {
                        console.log(e);
                    })


            })
            .catch(e => {
                console.log(e);
            })
        return response;
    }

    const uploadHotel = async (data, userID) => {
        let response = ""

        return response;
    }
    const onRegisterClick = data => {
        console.log(data);
        let userData = uploadUser(data)
    }

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
            if (res_hotels != null &
                res_countries != null && res_cities != null) {
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

    return (
        <>
            <Box p={8}>
                <Box pb={2} display="flex" justifyContent="space-between" alignItems="center">
                    <SearchFilter options={Filter_options} list={hotels} setData={setFilter} searchBy={"Name"} />
                    <Typography
                        fontSize={18}
                        fontWeight={700}
                        onClick={() => { dispatch(dialogActions.show(['registerHotel', onRegisterClick])) }}
                        sx={{
                            mr: 5,
                            cursor: "pointer"
                        }}
                    >Register Hotel</Typography>
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