import React from 'react'
import { useLibrary } from '../../src/context/videoContext'
import ShowBookmarkedItems from "./ShowBookmarkedItems"
import "./bookmark.css"

function Bookmark() {
    const {state : { bookmarkVideos }} = useLibrary()
    console.log({bookmarkVideos})

    return (
        <div className="bookmark">
            {/* <div className="bookmark__container"> */}
            {bookmarkVideos.map(item => (
                <div className="bookmark__container"> 
                <ShowBookmarkedItems item={item}/>
                </div>
            ))}
            {/* </div> */}
        </div>
    )
}

export default Bookmark
