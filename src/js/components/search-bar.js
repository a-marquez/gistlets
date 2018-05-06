import React from 'react'
import SimpleGrid from './simple-grid'

const SearchBar = ({onSearch, results, placeholder}) => (
  <SimpleGrid>
    <div>
      <input
        onKeyUp={event => {
          if (event.keyCode === 13) {
            onSearch(event.target.value)
          }
        }}
        placeholder={placeholder}
        type='text'
      />
    </div>
    {results ?
      <div>[#results]</div> :
      ''
    }
  </SimpleGrid>
)

export default SearchBar
