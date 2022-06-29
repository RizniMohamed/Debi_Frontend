import React, { useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { dialogActions } from '../../Store/dialogSlice';
import * as yup from 'yup';
import Typography from '@mui/material/Typography'
import { useFormik } from 'formik';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import TabPanel from '../helper/TabPanel';
import UserForm from '../Forms/UserForm';
import RoomForm from '../Forms/RoomForm';
import HotelForm from '../Forms/HotelForm';

const initVals = {
  name: "",
  email: "",
  image: '',
  contact: "",
  address: "",
  nic: "",

  hotel_name: "",
  hotel_image: "",
  hotel_contact: "",
  hotel_city: "",
  hotel_country: "",
  hotel_address: "",
}

const Schema = yup.object().shape({
  //user
  email: yup.string().required("Required*").email("Email must be in valid format"),
  name: yup.string().required("Required*"),
  image: yup.mixed().required("Required*"),
  contact: yup.string().required("Required*"),
  address: yup.string().required("Required*"),
  nic: yup.string().required("Required*"),

  //hotel
  hotel_name: yup.string().required("Required*"),
  hotel_image: yup.mixed().required("Required*"),
  hotel_contact: yup.string().required("Required*"),
  hotel_city: yup.string().required("Required*"),
  hotel_country: yup.string().required("Required*"),
  hotel_address: yup.string().required("Required*"),

  //room
})


const RegisterHotel = () => {
  const [step, setstep] = useState(0);

  const handleNext = () => setstep((prevstep) => prevstep + 1)
  const handleBack = () => setstep((prevstep) => prevstep - 1)

  const { status, onSubmit } = useSelector(state => state.dialog.registerHotel)
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: initVals,
    onSubmit: onSubmit,
    validationSchema: Schema,
  })


  return (
    <Dialog open={status} onClose={() => { dispatch(dialogActions.hide("registerHotel")); formik.resetForm() }} >
      <form onSubmit={formik.handleSubmit}>

        <DialogContent sx={{ display: "flex", flexDirection: "column", alignSelf: "center", pt: 1, mx: 10 }}>
          <TabPanel value={step} index={0}>
            <Typography fontSize={24} fontWeight={900} textAlign="center">Register User</Typography>
            <UserForm {...formik} />
          </TabPanel>
          <TabPanel value={step} index={1}>
            <Typography fontSize={24} fontWeight={900} textAlign="center">Register Hotel</Typography>
            <HotelForm {...formik} />
          </TabPanel>
        </DialogContent>

        <MobileStepper
          variant="progress"
          steps={2}
          position="static"
          activeStep={step}
          sx={{
            bgcolor: "background.paper"
          }}
          nextButton={
            formik.isValid && step === 1 ? (
              <Button type="submit" size="small" >
                Submit
              </Button>
            ) : (
              <Button size="small" onClick={handleNext} disabled={step === 1}>
                Next <KeyboardArrowRight />
              </Button>
            )
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={step === 0}>
              <KeyboardArrowLeft /> Back
            </Button>
          }
        />

      </form>
    </Dialog>
  )
}

export default RegisterHotel


