import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import BRImage from './helper/BRImage';
import BRTable from './helper/BRTable';

const RoomDetails = ({ data, facilities = [] }) => {

  const [facility, setFacility] = useState(facilities)

  useEffect(() => {

    if (facilities.length != 0) {

      let temp = facilities.map((r,i) => {
        r = {
          name: i==0?"Facility":"",
          details: r.Name
        }
        return r;
      })
      setFacility(temp)
    }
  }, [facilities])

  console.log(facility);



  return (
    <Box display="flex" justifyContent="space-evenly" >

      {/* Details */}
      <Box >
        <Box display="flex" flexDirection="column" mb={2} justifyItems="center">
          <Typography variant="title" >
            Room {data.name}
          </Typography>
        </Box>
        <BRTable rows={data.rows} firstColWidth={100} rowHeight={62} desc={false} />
        <BRTable rows={facility} firstColWidth={100} rowHeight={62} desc={false} />
      </Box>

      {/* Image and map */}
      <Box>
        <BRImage images={data.images} />
      </Box>

    </Box >
  )
}

export default RoomDetails
