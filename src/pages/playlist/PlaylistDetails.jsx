import React from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom';
import { useLibrary } from '../../context/videoContext'
import { imageURL } from '../../util/util';
import PlaylistCard from './PlaylistCard';
import "./playlist.css"

function PlaylistDetails() {
    const { playlistId } = useParams()
    const { state: { playlist }} = useLibrary();
    const desiredPlaylist = playlist.filter(playlistObj => playlistObj._id === playlistId)
    
    return (
        <div className="playlistdetails">
            <div  className="playlistdetails__container">
            {desiredPlaylist.length > 0 && desiredPlaylist[0].videos.map(item => {
                return (
                    <div className="playlistdetails__image">
                        <PlaylistCard item={item}/>
                    </div>
                )
            })}
            </div>
            
        </div>
    )
}

export default PlaylistDetails
