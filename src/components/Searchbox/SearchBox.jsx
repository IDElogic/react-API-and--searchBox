import React from "react";
import './SearchBox.css';

const SearchBox = ({searchChange}) => {
    return (
        <div className='inputbox'>
          <input
          type='search' 
          placeholder='search tour...'
          onChange={searchChange}
          />
        </div>
    );
}

export default SearchBox;