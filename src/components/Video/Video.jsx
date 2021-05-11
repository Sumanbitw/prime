import React from 'react'
import VideoCard from './VideoCard'
import "./videocard.css"
import data from "../../data/data"


function Videolist() {
    
    return (
        <div className="videolist">
            {data.map(item => (
                <VideoCard item={item} id={item.vid}/>
            ))}
        </div>
    )
}

export default Videolist
