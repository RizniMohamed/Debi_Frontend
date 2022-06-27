import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { Rating } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import React from 'react';
import BRImage from './helper/BRImage';
import BRTable from './helper/BRTable';

const HotelDetails = ({ data }) => {
  return (
    <Box display="flex" justifyContent="space-evenly" >

      {/* Details */}
      <Box >
        <Box display="flex" flexDirection="column" mb={2} justifyItems="center">
          <Typography variant="title" >
            {data.name}
          </Typography>
        </Box>
        <BRTable rows={data.rows} firstColWidth={100} rowHeight={62} desc={false}/>
      </Box>

      {/* Image and map */}
      <Box>
        <BRImage images={data.images} />
      </Box>

    </Box >
  )
}

export default HotelDetails
