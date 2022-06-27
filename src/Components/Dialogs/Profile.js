import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import useAxios from '../../Axios/useAxios';
import { dialogActions } from '../../Store/dialogSlice';
import BRTable from '../../Components/helper/BRTable';

const Profile = () => {
    const { status, onSubmit } = useSelector(state => state.dialog.profile)
    const userID = useSelector(state => state.auth.userID)
    const dispatch = useDispatch()
    const { axios, path, headers } = useAxios("User", "get_user",{},true)
    const [user, setUser] = useState({})

    useEffect(() => {
        if (userID != null) {
            axios
                .post(path, { id: userID }, headers)
                .then(res => {
                    let user = res.data.d
                    if (user != ("No user found")) setUser(user)
                })
                .catch(e => console.log(e))
        }
    }, [userID])

    const rows = [
        {
            name: 'Email',
            details: user.Email
        },
        {
            name: 'Contact',
            details: user.Contact
        },
        {
            name: 'Contact',
            details: user.Contact
        },
        {
            name: 'NIC',
            details: user.Nic
        },
        {
            name: 'NIC',
            details: user.Nic
        },
        {
            name: 'Role',
            details: user.Role
        },
        {
            name: 'Address',
            details: user.Address
        },



    ]

    return (

        <Dialog open={status} onClose={() => dispatch(dialogActions.hide("profile"))} fullWidth>

            <DialogTitle fontWeight={700} fontSize={34} textAlign="center">Profile</DialogTitle>

            <DialogContent sx={{ display: "flex", flexDirection: "column", alignSelf: "center", pt: 1, mx: 10 }}>
                <Box display="flex" alignItems="center" flexDirection="column">
                    <Avatar
                        alt="Profile Picture"
                        src={user.Image}
                        sx={{
                            width: 150,
                            height: 150
                        }} />
                    <Typography fontSize={18} fontWeight={700} sx={{ my: 2 }}>{user.Name}</Typography>
                </Box>

                <Box>
                    <BRTable rows={rows} firstColWidth={80} rowHeight={25} desc={false} />
                </Box>

                <Button
                    variant='contained'
                    onClick={() => onSubmit()}
                    sx={{ width: 180, alignSelf: "center", color: "white", mt: 4 }}
                >
                    Logout
                </Button>
            </DialogContent>


        </Dialog>
    )
}

export default Profile