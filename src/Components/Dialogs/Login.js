import { Button, Checkbox, Dialog, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dialogActions } from '../../Store/dialogSlice';
import * as yup from 'yup';
import { useFormik } from 'formik';

const initVals = {
  email: "",
  password: "",
}

const Schema = yup.object().shape({
  email: yup.string().required("Required*").email("Email must be in valid format"),
  password: yup.string().required("Required*"),
})


const Login = () => {
  const { status, onSubmit } = useSelector(state => state.dialog.login)
  const dispatch = useDispatch()


  const formik = useFormik({
    initialValues: initVals,
    onSubmit: onSubmit,
    validationSchema: Schema,
  })



  return (
    <Dialog open={status} onClose={() => { dispatch(dialogActions.hide("login")); formik.resetForm() }} >

      <form onSubmit={formik.handleSubmit}>

        <DialogTitle fontWeight={700} fontSize={34} textAlign="center">Login</DialogTitle>

        <DialogContent sx={{ display: "flex", flexDirection: "column", alignSelf: "center", pt: 1, mx: 10, width: 300 }}>
          

          <Box mb={1} width={"100%"} >
            <Typography fontWeight={700} fontSize={14} sx={{ mb: 0.3, ml: 1.5 }} >Email</Typography>
            <TextField
              variant="outlined"
              size='small'
              type="text"
              placeholder='example@example.com'
              name='email'
              sx={{ width: "100%", ".MuiOutlinedInput-root": { bgcolor: "white", borderRadius: 10 } }}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              onBlur={formik.handleBlur}
            />
          </Box>


          <Box mt={1} width={"100%"} >
            <Typography fontWeight={700} fontSize={14} sx={{ mb: 0.3, ml: 1.5 }} >Password</Typography>
            <TextField
              variant="outlined"
              size='small'
              type="password"
              placeholder='Minimum 8 character'
              name='password'
              sx={{ width: "100%", ".MuiOutlinedInput-root": { bgcolor: "white", borderRadius: 10 } }}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              onBlur={formik.handleBlur}
            />
          </Box>

          <Button
            variant='contained'
            type="submit"
            sx={{ width: 180, alignSelf: "center", color: "white", mt: 4 }}
          >
            Login
          </Button>

        </DialogContent>

      </form>

    </Dialog>
  )
}

export default Login