import React from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom';
import { useLibrary } from '../context/videoContext'
import { imageURL } from '../util/util';

function PlaylistDetails() {
    const { playlistId } = useParams()
    const { state: { playlist }} = useLibrary();

    const desiredPlaylist = playlist.filter(playlistObj => playlistObj.id === playlistId)
    console.log({desiredPlaylist})
    return (
        <div>
            <div style={{paddingTop:"6rem"}}>
            {desiredPlaylist.length > 0 && desiredPlaylist[0].videos.map(item => {
                return (
                    <Link to={`/videodetails/${item}`}>
                    <li><img src={imageURL(item)}/></li>
                    </Link>
                )
            })}
            </div>
            
        </div>
    )
}

export default PlaylistDetails
