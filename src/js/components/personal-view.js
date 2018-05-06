import {filter, compose as c} from 'ramda'
import * as r from 'ramda'
import React from 'react'
import styled from 'styled-components'
import ValuePre from 'value-pre'

import CenterContainer from './center-container'
import SimpleGrid from './simple-grid'
import SearchBar from './search-bar'
import Gist from './gist'

const PaddedContainer = styled.div`
  padding: 0em 1em;
`

const EllipsedContainer = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const Box = styled.div`
  border: 1px solid black;
`

const languagesByFileIds = (fileIds, files) => c(
  r.map(r.toLower),
  r.reject(r.equals(null)),
  r.map(pairs => pairs[1].language),
  filter(([fileId, file]) => fileIds.includes(fileId)),
  r.toPairs
)(files)

const GistList = ({gists, files}) => (
  <div>
    {Object.values(gists).map((gist, index) => (
      <div>
        <Box>
          <SimpleGrid>
            <div>{files[gist.files[0]].filename}</div>
            <div>
              {languagesByFileIds(gist.files, files).map(language => (
                <span>{language}</span>
              ))}
            </div>
          </SimpleGrid>
          <EllipsedContainer>{gist.description}</EllipsedContainer>
        </Box>
        <PaddedContainer>
          {gist.files.map(fileId => (
            <SimpleGrid>
              <div>{files[fileId].filename}</div>
              <div>{files[fileId].language ? files[fileId].language.toLowerCase() : ''}</div>
            </SimpleGrid>
          ))}
        </PaddedContainer>
      </div>

    ))}
  </div>
)

const PersonalView = ({publicGists, privateGists, starredGists, files}) => (
  <div>
    <SearchBar
      onSearch={console.log}
      placeholder='Filter gists...'
    />
    {false ? <ValuePre value={files}/> : ''}
    <div>
      Public
      <PaddedContainer>
        <GistList gists={publicGists} files={files}/>
      </PaddedContainer>
    </div>
    <div>
      Private
      <PaddedContainer>
        <GistList gists={privateGists} files={files}/>
      </PaddedContainer>
    </div>
    <div>
      Starred
      <PaddedContainer>
        <GistList gists={starredGists} files={files}/>
      </PaddedContainer>
    </div>
  </div>
)

export default PersonalView

export const PersonalViewPlaceholder = ({onUsernameEnter, onAuthenticateWithToken}) => (
  <div>
    <div>
      Anonymous Usage
      <SimpleGrid>
        <div>Use your public and starred gists.</div>
        <div>
          <input
            onKeyUp={(event => {
              if (event.keyCode === 13) {
                onUsernameEnter(event.target.value)
              }
            })}
            placeholder='Username'
          />
        </div>
      </SimpleGrid>
    </div>
    <div>
      Authorize
      <SimpleGrid>
        <div>Use and edit all of your gists.</div>
        <div>
          <div><button>(GH Icon)Sign In</button></div>
          <div>
            <input
              onKeyUp={(event => {
                if (event.keyCode === 13) {
                  onAuthenticateWithToken(event.target.value)
                }
              })}
              placeholder='Access Token'
            />
          </div>
        </div>
        <div/>
      </SimpleGrid>
    </div>
  </div>
)
