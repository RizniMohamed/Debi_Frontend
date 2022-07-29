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
    const { response: res_hotels, error: err_hotels, loading } = useAxios("Hotel", "get_hotels")
    const { response: res_cities, error: err_cities } = useAxios("Hotel", "get_cities")
    const { response: res_countries, error: err_countries } = useAxios("Hotel", "get_countries")
    const { axios: axiosU, path: pathU, headers: headersU } = useAxios("User", "post_user", {}, true)
    const { axios: axiosH, path: pathH, headers: headersH } = useAxios("Hotel", "post_hotel", {}, true)
    const dispatch = useDispatch()

    const onRegisterClick = data => {
        console.log(data);
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
                let response = res.data.d
                console.log(response);
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

    const base64ToImage = async (data) => {
        let _image = new Image();
        _image.src = 'data:image/png;base64,' + data;
        return _image
    }

    useEffect(() => {
        try {
            if (res_hotels && res_countries && res_cities != null) {
                console.log(res_hotels);
                let newHotels = res_hotels.map(h => {
                    base64ToImage(h.Image)
                        .then(res => {
                            res.onload = () => {
                                h.Image = res.src
                            }
                        }).catch(e => {
                            console.log(e);
                        })
                    return h
                })
                setHotels(newHotels)
                setFilter(newHotels)
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

    if (loading || filter.length === 0) {
        return (
            <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' widht='100vw' height='90vh'>
                <Typography fontSize={40} fontWeight={900}>Loading... </Typography>
                <Typography fontSize={20} fontWeight={700}>Please wait, data is retreiving from the server </Typography>
            </Box>
        )
    }

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