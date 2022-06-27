import React, { useEffect, useState } from 'react';
import { AppBar, Divider, IconButton, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { dialogActions } from '../Store/dialogSlice';
import useAxios from '../Axios/useAxios';
import { authActions } from '../Store/authSlice';
import MenuIcon from '@mui/icons-material/Menu';
import { drawerActions } from '../Store/drawerSlice';

const Header = () => {

  const auth = useSelector(state => state.auth)
  const [current, setCurrent] = useState("")
  const location = useLocation()
  const dispatch = useDispatch();
  const drawerState = useSelector(state => state.leftDrawer.status)

  const handleDrawerState = () => drawerState ? dispatch(drawerActions.hide()) : dispatch(drawerActions.show())

  const { axios, path, headers } = useAxios("User", "post_auth", {}, true)

  useEffect(() => {
    const page = location.pathname.split("/").filter(x => x)[0]
    setCurrent(page)
  }, [location])

  const onLoginClick = data => {
    axios
      .post(path, data, headers)
      .then(res => {
        let user = res.data.d
        if (user == ("No user found")) {
          alert("Invalid credentials")
        } else {
          dispatch(authActions.login(user))
          dispatch(dialogActions.hide(['login']))
        }
      })
      .catch(e => {
        console.log(e);
      })
  }

  const onLogoutClick = () => {
    dispatch(authActions.logout())
    dispatch(dialogActions.hide(['profile']))
  }

  const handleProfileClick = () => {
    auth.status ?
      dispatch(dialogActions.show(['profile', onLogoutClick])) :
      dispatch(dialogActions.show(['login', onLoginClick]))
  }


  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: "background.mainbg" }}>
        <Toolbar>
          {(current === "admin" || current === "manager") &&
            <IconButton
              onClick={handleDrawerState}
              edge="start"
              sx={{
                color: "white",
              }}
            >
              <MenuIcon />
            </IconButton>}

          <Box mx={2} display="flex" alignItems="center" flexGrow={1}>
            <Typography fontSize={28} fontWeight={900} sx={{ color: "primary.main" }} fontFamily="cursive" >Debi</Typography>

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
            <AccountCircleIcon
              onClick={handleProfileClick}
              sx={{
                ...styleMenuRight,
                color: current === "profile" ? "primary.main" : "white"
              }}
            />
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
