import React, { useState } from 'react'
import { Box, Typography, TextField, InputAdornment, Input, IconButton, useStepContext, Avatar } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const data = [
  {
    name: "hotel_name",
    displayName: "Hotel Name",
    placeHolder: "Hotel Name",
  },
  {
    name: "hotel_contact",
    displayName: "Mobile",
    placeHolder: "000 000 000",
  },
  {
    name: "hotel_city",
    displayName: "City",
    placeHolder: "City",
  },
  {
    name: "hotel_country",
    displayName: "Country",
    placeHolder: "Country",
  },
  {
    name: "hotel_address",
    displayName: "Address",
    placeHolder: "Address",
  },
]

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const HotelForm = (formik) => {

  const [image, setImage] = useState("")

  const handleAvatarChange = (e) => {
    formik.values.hotel_image = e.target.files[0]
    setImage(URL.createObjectURL(formik.values.hotel_image))
    getBase64(formik.values.hotel_image)
      .then(res => {
        formik.values.hotel_image = res.split(',')[1]
      })
      .catch(e => {
        console.log(e);
      })
  }

  return (
    <>
      <Box display='flex' justifyContent='center'>
        <label htmlFor="icon-button-file">
          <Input
            accept="image/*"
            id="icon-button-file"
            type="file"
            name='image'
            sx={{ display: 'none' }}
            onChange={handleAvatarChange}
          />
          <IconButton color="primary" aria-label="upload picture" component="span">
            <Avatar variant='rounded' src={image} sx={{ height: 9 * 12, width: 16 * 12 }} />
          </IconButton>
        </label>
      </Box>

      {
        data.map(({ name, placeHolder, displayName }, index) =>
          <Box my={1} key={index} >
            <Typography fontWeight={700} sx={{ p: 0, m: 0 }} >{displayName}</Typography>
            <TextField
              inputProps={{
                autoComplete: 'off',
              }}
              variant="outlined"
              size='small'
              placeholder={placeHolder}
              name={name}
              value={formik.values[name]}
              sx={{
                width: 250,
                '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': { display: 'none' },
              }}
              onChange={formik.handleChange}
              error={formik.touched[name] && Boolean(formik.errors[name])}
              helperText={formik.touched[name] && formik.errors[name]}
              onBlur={formik.handleBlur}

              type={name === "mobile" ? "number" : "text"}
              InputProps={{
                startAdornment: name === "mobile" ? <InputAdornment position="start">+94</InputAdornment> : "",
              }}
            />
          </Box>
        )
      }
    </>
  )
}

export default HotelForm