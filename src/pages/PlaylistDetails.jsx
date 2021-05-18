import React from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom';
import { useLibrary } from '../context/videoContext'
import { imageURL } from '../util/util';
import "./playlist.css"

function PlaylistDetails() {
    const { playlistId } = useParams()
    const { state: { playlist }} = useLibrary();
    const desiredPlaylist = playlist.filter(playlistObj => playlistObj.id === playlistId)
    console.log({desiredPlaylist})
    return (
        <div className="playlistdetails">
            <div  className="playlistdetails__container">
            {desiredPlaylist.length > 0 && desiredPlaylist[0].videos.map(item => {
                return (
                    <div className="playlistdetails__image">
                        <Link to={`/videodetails/${item}`}>
                        <img src={imageURL(item)} />
                        </Link>
                    </div>
                )
            })}
            </div>
            
        </div>
    )
}

export default PlaylistDetails
