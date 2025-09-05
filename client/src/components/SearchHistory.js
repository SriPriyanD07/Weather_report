import React from 'react';

const SearchHistory = ({ history, onSelect }) => (
  <div className="search-history">
    <h4>Search History</h4>
    <ul>
      {history.map((city, idx) => (
        <li key={idx} onClick={() => onSelect(city)} style={{cursor:'pointer'}}>
          {city}
        </li>
      ))}
    </ul>
  </div>
);

export default SearchHistory;
