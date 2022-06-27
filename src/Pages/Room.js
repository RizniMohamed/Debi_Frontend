import React, { useState, useEffect } from 'react'
import { Box } from '@mui/system'
import SearchFilter from '../Components/SearchFilter/SearchFilter'
import useAxios from '../Axios/useAxios'
import RoomCard from '../Components/RoomCard'
import DateRPicker from '../Components/helper/DateRPicker'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

const Room = () => {
    const [rooms, setRooms] = useState([])
    const [filter, setFilter] = useState([])
    const [roomtype, setRoomtype] = useState([])
    const [dateFrom, setDateFrom] = useState(null)
    const [dateTo, setDateTo] = useState(null)
    const { response: res_rooms, error: err_rooms } = useAxios("Room", "get_rooms")
    const { response: res_roomtype, error: err_roomtype } = useAxios("Room", "get_roomtypes")

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
            name: "Type",
            values: [
                {
                    name: "None",
                    value: ""
                },
                ...roomtype
            ]
        },
        {
            name: "Avaialble",
            values: [
                {
                    name: "None",
                    value: ""
                },
                {
                    name: "True",
                    value: "True"
                },
            ]
        },
    ]

    const manipulateRoomData = (res_rooms) => {

        let newRooms = res_rooms.map(room => {
            const func_date = (`new ${room.Booked_date.split('/').filter(x => x)[0]}`);
            room.Booked_date = eval(func_date)

            const today = new Date();
            const availability_status = today > room.Booked_date;
            room.Avaialble = availability_status;

            room.Type = room.Roomtype_id;

            return room
        })

        setRooms(newRooms)
        setFilter(newRooms)

    }

    useEffect(() => {
        try {
            if (res_rooms != null && res_roomtype != null) {
                manipulateRoomData(res_rooms)
                setRoomtype(
                    res_roomtype.map(({ Id, Name }) => {
                        let data = {
                            name: Name,
                            value: Id
                        }
                        return data
                    })
                )
            }
        } catch (error) {
            console.log(error);
        }

    }, [res_rooms, res_roomtype])

    useEffect(() => {
        if (dateFrom != null && dateTo != null) {
            let newRooms = rooms.filter(room => 
                (dateFrom.toLocaleDateString() != room.Booked_date.toLocaleDateString()) &&
                (dateTo.toLocaleDateString() != room.Booked_date.toLocaleDateString())
            )
            setFilter(newRooms)
        }

    }, [dateFrom, dateTo])


    return (
        <>
            <Box p={8}>
                <Box pb={2} display='flex' alignItems="center">
                    <SearchFilter options={Filter_options} list={rooms} setData={setFilter} searchBy={"RoomID"} />
                    <Box mx={1} />
                    <DateRPicker placeholder="From" date={dateFrom} setDate={setDateFrom} />
                    <Typography fontSize={16} sx={{ mx: 1, color: "border" }}> TO </Typography>
                    <DateRPicker placeholder="To" date={dateTo} setDate={setDateTo} />
                    {
                        (dateFrom != null && dateTo != null) &&
                        <CloseIcon
                            sx={{ ml: 1, cursor: 'pointer' }}
                            onClick={() => { setDateFrom(null); setDateTo(null); setFilter(rooms) }}
                        />
                    }
                </Box>
                <Box display="flex" flexWrap="wrap">
                    {
                        [1].map(e => {
                            return filter.map(({ Booked_date, Price, RoomID, Roomtype, Image, Avaialble }, index) =>
                                <RoomCard key={index} Booked_date={Booked_date} Price={Price} RoomID={RoomID} Roomtype={Roomtype} Image={Image} Avaialble={Avaialble} />
                            )
                        })
                    }
                </Box>
            </Box>
        </>
    )
}

export default Room