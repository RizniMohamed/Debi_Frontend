import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useAxios from '../Axios/useAxios'
import HotelDetailsComp from '../Components/HotelDetails'
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

const HotelDetails = () => {
    const [hotel, setHotel] = useState({ UserID: 0 })
    const [user, setUser] = useState({})
    const { id } = useParams();
    const { response: res_hotel, error: err_hotel } = useAxios("Hotel", "get_hotel", { id })

    const { response: res_user, error: err_user } = useAxios("User", "get_user", { id: hotel?.UserID })

    useEffect(() => {
        try {
            if (res_hotel != null) {
                setHotel(res_hotel)
                setUser(res_user)
            }
        } catch (error) {
            console.log(error);
        }
    }, [res_hotel, res_user])

    const hotelData = {
        name: hotel.Name,
        rows: [
            {
                name: 'Ownername',
                details: user?.Name
            },

            {
                name: 'Contact',
                details: hotel.Contact
            },

            {
                name: 'Country',
                details: hotel.Country
            },

            {
                name: 'City',
                details: hotel.City
            },
            {
                name: 'Address',
                details: hotel.Address
            },

        ],
        images: [
            {
                name: "Hotel Image",
                path: hotel.Image
            },

        ]
    }

    return (
        <>
            <Box p={10} >
                <HotelDetailsComp data={hotelData} />
                <Box display="flex" justifyContent="end" pr={77}>
                    <Link to={`/hotel/${id}/room`}>
                        <Button variant='contained' sx={{ width:250 }} >
                            <Typography fontSize={20} fontWeight={700} color="white"  >Rooms</Typography>
                            <ArrowCircleRightOutlinedIcon sx={{ ml: 1, color: "white" }} />
                        </Button>
                    </Link>
                </Box>
            </Box>
        </>
    )
}

export default HotelDetails