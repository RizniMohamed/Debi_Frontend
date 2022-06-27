import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Button, Divider, Menu, MenuItem, Select, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';

const Filter = ({ list, setData, options }) => {

    //Filter
    const [anchorEl, setAnchorEl] = useState(null);
    const [filterKey, setFilterKey] = useState({});
    const open = Boolean(anchorEl);

    const handleClose = () => setAnchorEl(null)
    const filter = newKeys => {
        if (newKeys !== "none") {
            const filterConstraints = Object.fromEntries(Object.entries(newKeys).filter(([_, v]) => v !== ""))
            let filteredData = list
            console.log(newKeys);
            console.log(filteredData);
            Object.keys(filterConstraints).forEach(e => {

                filteredData = filteredData.filter(i =>
                    String(i[e]).toLowerCase() === String(filterConstraints[e]).toLowerCase()
                )
            }
            )
            setData(filteredData)
        } else {
            setData(list)
            setFilterKeys()
        }

        handleClose();
    }

    const handleSelect = ({ target }) => {
        const newKeys = { ...filterKey, [target.name]: target.value }
        setFilterKey(newKeys)
        filter(newKeys)
    }

    const setFilterKeys = () => {
        let keys = {}
        options.forEach(e => keys[e.name] = "")
        setFilterKey(keys)
    }

    useEffect(() => {
        setFilterKeys()
    }, [])

    return (
        <Box ml={2}>
            <Button
                size="small"
                sx={{ borderRadius: 1, minWidth: "min-content", color: "secondary.main" }}
                onClick={e => setAnchorEl(e.currentTarget)}
            >
                <FilterAltIcon sx={{ fontSize: 32 }} />
            </Button>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={menuStyle}>
                {options.map((op, index) =>
                    <Box key={index}>
                        <Box display="flex" alignItems="center">
                            {(index === 0) ? <MenuItem onClick={() => filter("none")} sx={{ width: 1 }}>{op.name}</MenuItem> :
                                <>
                                    <Typography sx={{ width: 100, py: 0.5, px: 2 }} color="white">{op.name}</Typography>
                                    <Select
                                        size='small'
                                        displayEmpty
                                        placeholder="Select"
                                        value={filterKey[op.name]}
                                        name={op.name}
                                        onChange={handleSelect}
                                        sx={selectStyle}
                                        MenuProps={selectPropsStyle}
                                        inputProps={{
                                            sx: { color: "white", }
                                        }}>
                                        {op.values.map((val, index) => <MenuItem key={index} value={val.value}>{val.name}</MenuItem>)}
                                    </Select>
                                </>
                            }
                        </Box>
                        {(index !== options.length - 1) && <Divider sx={{ bgcolor: "white", }} />}
                    </Box>
                )}
            </Menu>
        </Box>
    )
}

export default Filter


const menuStyle = {
    ml: 2,
    "li": {
        color: "white",
        py: 0.5,
        px: 2
    },
    ".MuiPaper-root": {
        bgcolor: "background.mainbg",
        borderRadius: 0.3,
    },
    "& .MuiDivider-root": {
        m: "0 !important",
        p: 0
    },
    ".MuiList-root": {
        p: 0
    }
}

const selectStyle = {
    borderRadius: 0,
    borderColor: 'white !important',
    ":hover": {
        borderColor: "red"
    },
    "svg": {
        color: "white"
    },
    "fieldset": {
        border: "none"
    },
    ".MuiList-root": {
        p: 0
    }
}

const selectPropsStyle = {
    sx: {
        ".MuiPaper-root": {
            bgcolor: "background.mainbg",
            borderRadius: 0.3,
        },
        "li": {
            color: "white",
            py: 0.5,
            px: 2
        },
        ".MuiList-root": {
            p: 0
        }
    }
}