import React from 'react'
import { Link } from 'react-router-dom'
import { useLibrary } from '../context/videoContext'
import data from "../data/data"
import PlaylistDetails from './PlaylistDetails'

function Playlist() {
    const { state: { playlist }, dispatch } = useLibrary()
    console.log(playlist)
    
    return (
        <div>
            {playlist.map(playlistObj => {
                return (
                    <div key={playlistObj.id} style={{display:"flex",paddingTop:"6rem",paddingLeft:"7rem"}}>
                        <p>{playlistObj.name}</p>
                        <Link to={`/playlist/${playlistObj.id}`}>
                        <button>View</button>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export default Playlist
