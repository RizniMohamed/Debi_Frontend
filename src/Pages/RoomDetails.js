import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useAxios from '../Axios/useAxios'
import RoomDetailsComp from '../Components/RoomDetails'
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

const RoomDetails = () => {
    const [room, setRoom] = useState({})
    const { id } = useParams();
    const { response: res_room, error: err_room } = useAxios("Room", "get_room", { id })

    useEffect(() => {
        try {
            if (res_room != null) {
                setRoom(res_room)
            }
        } catch (error) {
            console.log(error);
        }
    }, [res_room])

    const roomData = {
        name: room.RoomID,
        rows: [
            {
                name: 'Roomtype',
                details: room.Roomtype
            },
            {
                name: 'Price',
                details: room.Price
            },
        ],
        images: [
            {
                name: "Room Image",
                path: room.Image
            },
        ]
    }

    return (
        <>
            <Box p={10} >
                <RoomDetailsComp data={roomData} facilities={room.Facilities} />
            </Box>
        </>
    )
}

export default RoomDetails