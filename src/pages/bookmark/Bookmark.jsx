import React from 'react'
import { useLibrary } from '../../context/videoContext'
import ShowBookmarkedItems from "./ShowBookmarkedItems"
import "./bookmark.css"

function Bookmark() {
    const {state : { bookmarkVideos }} = useLibrary()
    console.log({bookmarkVideos})

    return (
        <div className="bookmark">
            {bookmarkVideos.map(item => (
                <ShowBookmarkedItems item={item}/>
            ))}
        </div>
    )
}

export default Bookmark
