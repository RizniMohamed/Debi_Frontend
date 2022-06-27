import  React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const DateRPicker = ({setDate, date , placeholder}) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label="Basic example"
                value={date}
                onChange={(newValue) => {
                    setDate(newValue);
                }}
                renderInput={(params) => <TextField {...params}
                    variant='outlined'
                    label={null}
                    size='small'
                    inputProps={{
                        ...params.inputProps,
                        placeholder: placeholder
                    }}
                    sx={{
                        ".MuiOutlinedInput-root": {
                            borderColor: "border",
                            borderRadius: 1,
                            width:200
                        },
                    }}
                />}
            />
        </LocalizationProvider>
    );
}

export default DateRPicker