import React, { useContext, useEffect } from 'react'
import Styled from 'styled-components'
import Spotify from 'spotify-web-api-js'

import { SearchContext } from '../contexts/SearchContext'
import PlayerControls from './PlayerControls'

const Player = () => {
  const { search, dispatch } = useContext(SearchContext)
  const spotifyApi = new Spotify()
  const current = search.current_track 

  // const getPlaybackState = async () => {
  //   await spotifyApi.getMyCurrentPlaybackState()
  //     .then(response => {
  //       console.log('Playback State Object: ', response)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }


  const getDevices = async () => {
    await spotifyApi.getMyDevices()
      .then(response => {
        console.log('Available Devices Object: ', response)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getDevices()
    // getPlaybackState()
  }, [search.current_track])

  return (
    <>
      {(current !== undefined && current.hasOwnProperty('album') && search.selected.length > 0) &&
        <PlayerContainer>
          <ArtworkContainer>
            <img src={current.album.images[0].url} alt={current.name}/>
          </ArtworkContainer>
          <DetailsContainer >
            <TrackLength >
              {/* Use in-line style to match 'width' to song's progress */}
              <TrackProgress />
            </TrackLength>
            <Details>
              <Titles>
                <TrackName>
                  <p>{current.name}</p>
                  {current.explicit === true 
                    ? <Explicit>EXPLICIT</Explicit>
                    : null
                  }
                </TrackName>
                <ArtistName>
                  <p>{current.artists.map(artist => artist.name).join(', ')}</p>
                </ArtistName>
              </Titles>
              <PlayerControls />
            </Details>
          </DetailsContainer>
        </PlayerContainer>
      }
    </>
  )
}

export default Player

const PlayerContainer = Styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #12262d;
  width: 100vw;
  height: 80px;
  bottom: 0;

  div p {
    color: #eaf1f7;
  }
`

const DetailsContainer = Styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const Details = Styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`

const TrackLength = Styled.div`
  display: flex;
  width: 100%;
  height: 2px;
  /* background-color: #e4f489; */
  background-color: #4baa67;
`

const TrackProgress = Styled.div`
  height: 100%;
  width: 34%;
  /* background-color: #4baa67; */
  background-color: #e4f489;
`

const Titles = Styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-grow: 1;
`

const TrackName = Styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;

  p {
    margin: 0 0 0 20px;
    font-weight: 600;
    color: #eaf1f7;
  }
`

const Explicit = Styled.div`
  font-size: .7rem;
  border: 1px solid #e4f489;
  color: #e4f489;
  padding: 1px 3px;
  margin: 0 6px;
`

const ArtistName = Styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  p {
    margin: 0 0 0 20px;
    font-size: .8rem;
    color: #eaf1f7;
  }
`

const ArtworkContainer = Styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  
  img {
    height: 80px;
    width: 80px;
    margin: 0;
    padding: 0;
  }
`