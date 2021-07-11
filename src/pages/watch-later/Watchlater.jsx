import React from 'react'
import { useLibrary } from '../../context/videoContext'
import ShowWatchLaterVideos from "./ShowWatchLaterVideos"
import "./watchlater.css"

function WatchLater() {

    const {state: { watchLaterVideos }} = useLibrary()
    console.log({watchLaterVideos})
    return (
        <div className="watchlater">
                {watchLaterVideos.map(item => (
                    <ShowWatchLaterVideos item={item}/>
                ))}
        </div>
    )
}

export default WatchLater
