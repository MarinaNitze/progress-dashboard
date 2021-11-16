import React, { useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

import './Search.scss';

type SearchProps = {
  placeholder: string;
  data: string[];
};

export default function Search({ placeholder, data }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<Array<string>>([]);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchWord = e.target.value;
    setSearchTerm(searchWord);
    const newFilter = data.filter(value =>
      value.toLowerCase().includes(searchWord.toLocaleLowerCase()),
    );

    if (searchWord === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setSearchTerm('');
  };

  return (
    <section className="search">
      <div className="searchInput">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <>
              <div>Search</div> <SearchIcon />
            </>
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="searchResult">
          {filteredData.slice(0, 15).map(item => (
            <a className="resultItem" href="/" target="_blank">
              <p>{item}</p>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
