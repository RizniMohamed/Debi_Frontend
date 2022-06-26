import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Divider, IconButton, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {

  const auth = useSelector(state => state.auth)
  const [current, setCurrent] = useState("")

  const location = useLocation()

  useEffect(() => {
    const page = location.pathname.split("/").filter(x => x)[0]
    setCurrent(page)
  }, [location])


  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: "background.mainbg" }}>
        <Toolbar>
          <Box mx={2} display="flex" alignItems="center" flexGrow={1}>
            <Typography fontSize={28} fontWeight={900} sx={{color : "primary.main"}} fontFamily="cursive" >Debi</Typography>

            <Box display="flex" width={300} mt={1} sx={styleMenu}>
              <Box >
                <Link to="/"><Typography>Home</Typography></Link>
                <Divider sx={current === undefined ? { bgcolor: "primary.main" } : { opacity: 0 }} />
              </Box>
              <Box >
                <Link to="/hotel"><Typography>Hotel</Typography></Link>
                <Divider sx={current === "hotel" ? { bgcolor: "primary.main" } : { opacity: 0 }} />
              </Box>
              {auth.role !== "guest" && <Box >
                <Link to={`/${auth.role}`}><Typography>Console</Typography></Link>
                <Divider sx={current === "admin" || current === "manager" ? { bgcolor: "primary.main" } : { opacity: 0 }} />
              </Box>}
            </Box>

          </Box>

          <Box display="flex" alignItems="center" >
            <Link to="/profile"><AccountCircleIcon sx={{ ...styleMenuRight, color: current === "profile" ? "primary.main" : "white" }} /></Link>
          </Box>

        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header

//style
const styleMenu = {
  ".MuiBox-root": {
    marginLeft: 5,
    ".MuiTypography-root": {
      cursor: "pointer",
      fontSize: 16,
      fontWeight: 500,
      color: "white",
    },
    ".MuiDivider-root": {
      transition: "background 0.3s, color 0.3s",
      height: 3,
      borderRadius: 1,
      mt: 0.5
    }
  }
}

const styleMenuRight = {
  transition: "background 0.3s, color 0.3s",
  mx: 1.5,
  mt: 0.5,
  fontSize: 28,
  cursor: "pointer"
}
