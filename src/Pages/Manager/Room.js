import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useAxios from '../../Axios/useAxios'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';


const columns = [
  { field: 'RoomID', headerName: 'Room Number', width: 150 },
  { field: 'Roomtype', headerName: 'Room Type', width: 150 },
  { field: 'Price', headerName: 'Price', width: 150 },
  { field: 'Facility', headerName: 'Facilities', width: 150 },

  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
];



const Room = () => {
  const auth = useSelector(state => state.auth)

  const [rooms, setRooms] = useState([])

  const { response: res_hotel } = useAxios("Hotel", "get_hotel_user", { id: auth.userID })
  const { axios, path, headers } = useAxios("Room", "get_rooms")

  useEffect(() => {
    if (res_hotel !== null) {
      axios
        .post(path, { id: res_hotel.HotelID }, headers)
        .then(res => {
          let newRooms = res.data.d.map(room => {
            let Facility = ''
            room.Facilities.map(f => {
              Facility += f.Name.toUpperCase() + " "
            })
            room.Facility = Facility;
            return room
          })
          setRooms(res.data.d)
        })
        .catch(e => {
          console.log(e);
        })
    }
  }, [res_hotel])

  console.log(rooms);
  return (
    <>
        <Box minWidth={650} m={'auto'} mt={5}  >
          <DataGrid
            rows={rooms}
            columns={columns}
            getRowId={row => row.RoomID}
            autoHeight
            rowsPerPageOptions={[]}
            pageSize={null}
            sx={{bgcolor:"background.mainbg", color:"white", minHeight:400}}
          />
      </Box>
    </>
  )
}

export default Room