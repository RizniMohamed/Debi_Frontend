import { Box, Typography } from '@mui/material'
import React from 'react'

const BRTable = ({ rows, rowHeight, firstColWidth, desc=true}) => {
    return (
        <>
            {
                rows.map((details, index) => (
                    ( desc && (index === rows.length - 1)) ? "" : (
                        <Box height={rowHeight} display="flex" key={index} >
                            <Typography sx={{ fontWeight: 700, fontSize: 16, width: firstColWidth }}>{details.name}</Typography>
                            <Typography sx={{ fontWeight: 700, fontSize: 16, width: 50, textAlign: "center" }}>:</Typography>
                            <Typography sx={{ fontSize: 16 }}>{details.details}</Typography>
                        </Box>
                    )
                ))
            }
            {desc && <Box display="flex" flexDirection="column">
                <Typography sx={{ fontWeight: 700, fontSize: 16 }}>{rows[rows.length - 1].name}</Typography>
                <Typography align='justify' sx={{ fontSize: 15, width: 675 }} variant="body1">{rows[rows.length - 1].details}</Typography>
            </Box>}
        </>
    )
}

export default BRTable