import React from 'react'
import { useLibrary } from '../../context/videoContext'
import { imageURL } from '../../util/util'
import { Link } from "react-router-dom"

function PlaylistCard({item}) {
    const { state : {videos}} = useLibrary()
    console.log({videos})
    const video = videos.videos && videos.videos.find(videoItem => videoItem._id === item)
    
    return (
        <div>
            <Link to={`/videodetails/${item}`}>
                <img src={imageURL(video && video.videoId)} alt=""/>
            </Link>
        </div>
    )
}

export default PlaylistCard

//Protype 
//this
//closures