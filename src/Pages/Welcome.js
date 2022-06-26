import React from 'react'
import { Box, Typography, Button } from '@mui/material';
import Footer from '../Components/Footer';
import welcomimage from '../LocalStore/welcome/welcome_banner.jpg'
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <>
      <Box position="relative" lineHeight={0}>
        <Box
          component="img"
          sx={{
            height: "calc(70vh - 46px)",
            width: "100vw ",
            objectFit: "cover",
            filter: "brightness(50%)"
          }}
          alt="The house from the offer."
          src={welcomimage}
        />
        <Box position="absolute" top="50%" left="50%" >

          <Typography variant="h3" fontWeight={900} color="white" sx={{ transform: 'translate(-50%,-50%)' }} >DEBI HOTEL</Typography>
          <Link to="/hotel">
            <Button variant='contained' sx={{ transform: 'translate(-50%,-50%)' }} >
              <Typography fontSize={20} fontWeight={700} color="white"  >Hotels</Typography>
              <ArrowCircleRightOutlinedIcon sx={{ ml: 1, color: "white" }} />
            </Button>
          </Link>

        </Box>
      </Box>

      <Footer />
    </>
  );
}

export default Welcome;
