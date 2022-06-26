import { Box } from '@mui/system';
import React from 'react';
import Filter from './Filter';
import Search from './Search';

/**
 * @param options Filter options 
 * @param list Suggestion list 
 * @param setData useState function
 * @returns 
 */
const SearchFilter = ({ options, list, setData, searchBy }) => {
  return (
    <Box display="flex" alignItems="center">
      <Search list={list} setData={setData} searchBy={searchBy} />
      <Filter list={list} setData={setData} options={options}/>
    </Box>
  );
}

export default SearchFilter
