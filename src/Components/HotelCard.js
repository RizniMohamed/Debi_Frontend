import { Rating } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';


const HotelCard = ({ id, image, name, city, country, address }) => {
  return (
    <Card raised sx={{ width: 210, height: 270, mt: 2, mr: 3 }}>
      <Link to={`${id}`}>
        <CardMedia
          component="img"
          alt={name}
          height="140"
          image={image}
        />

        <CardContent sx={{ pt: 1 }}>
          <Box mb={1} >
            <Typography sx={{ fontSize: 17, fontWeight: 700 }}>
              {name}
            </Typography>
          </Box>

          <Typography variant="body2" color="text.main">
            {address}
            <br />
            {city + " " + country}
          </Typography>
        </CardContent>
      </Link>
    </Card >
  );
}

export default HotelCard