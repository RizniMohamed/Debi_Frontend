import React from 'react'
import { Autocomplete, Paper, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';


const Search = ({ list, setData, searchBy }) => {

    const handleOnInputChange = ({ target }) => {
        let searchKey = target.innerText ? target.innerText : target.value;
        searchKey ? setData(list.filter(i => i[searchBy] === searchKey)) : setData(list)
    }

    return (
        <Autocomplete
            freeSolo
            size='small'
            options={list}
            onInputChange={handleOnInputChange}
            getOptionLabel={option => option[searchBy]}
            PaperComponent={params =>
                <Paper
                    {...params}
                    sx={paperStyle} />
            }
            sx={autocompleteStyle}
            renderInput={(params) => (
                < TextField
                    {...params}
                    placeholder="Search"
                    sx={{ minWidth: 200, }}
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: <SearchIcon sx={{ color: "border", }} />
                    }}
                />
            )}
        />)
}

export default Search


const autocompleteStyle = {
    ".MuiOutlinedInput-root": {
        borderRadius: "25px !important",
    },
}

const paperStyle = {
    bgcolor: "background.mainbg",
    borderRadius: 0.3,
    mt: 0.5,
    "li": {
        color: "white",
        px: 2
    },
}