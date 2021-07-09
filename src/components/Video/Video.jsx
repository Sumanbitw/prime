import React from 'react'
import VideoCard from './VideoCard'
import "./videocard.css"
import data from "../../data/data"
import { useLibrary } from '../../context/videoContext'


function Videolist() {
    const { state : { videos }} = useLibrary()
    console.log({ videos })
    return (
        <div className="videolist">
            {videos.videos && videos.videos.map(item => (
                <VideoCard item={item} vid={item.videoId}/>
            ))}
        </div>
    )
}

export default Videolist
