import { Rating } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import dateFormat from "dateformat";


const HotelCard = ({ Booked_date, Price, RoomID, Roomtype, Image, Avaialble }) => {

  return (
    <Card raised sx={{ width: 210, height: 270, mt: 2, mr: 3 }}>
      <Link to={`${RoomID}`}>
        <CardMedia
          component="img"
          alt={Image}
          height="140"
          image={Image}
        />
        <Box className="availability" bgcolor={Avaialble ?"Green": "Red"}>
          <Typography variant='p' >
            {Avaialble ? "Available" : "Unavailable"}
          </Typography>
        </Box>
        <CardContent sx={{ pt: 1 }}>
          <Box mb={1} >
            <Typography sx={{ fontSize: 17, fontWeight: 700 }}>
              Room {RoomID}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.main">
            Room Type : {Roomtype}
            <br />
            Price : {Price} LKR
            <br />
            Available : {dateFormat(Booked_date, "mmmm dS, yyyy")}
          
          </Typography>
        </CardContent>
      </Link>
    </Card >
  );
}

export default HotelCard