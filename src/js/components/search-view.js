import React from 'react'

import SearchBar from './search-bar'

const SearchView = ({gists, onSearch, onGistClick}) => (
  <div>
    <SearchBar onSearch={onSearch}/>
    {gists.map(() =>
      <div onClick={onGistClick}>gist</div>
    )}
  </div>
)

export default SearchView
