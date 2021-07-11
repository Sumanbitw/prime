import React from 'react'
import { Link } from 'react-router-dom'
import { RiDeleteBin5Fill } from "react-icons/ri"
import { imageURL } from "../../util/util"
import "./bookmark.css"
import { useLibrary } from '../../context/videoContext'

function ShowBookmarkedItems({item}) {
    const { state, dispatch} = useLibrary()

    return (
        <div className="showbookmark">
            <div className="showbookmark__container">
                <Link to={`/videoDetails/${item?._id}`}>
                <img src={imageURL(item.videoId)} className="showbookmark__img" alt=""/>
                </Link>
                <RiDeleteBin5Fill size={22} className="delete__btn" onClick={() => dispatch({ type: "REMOVE__BOOKMARK__VIDEOS", payload : item})}/>
                <div className="showbookmark__details">
                <div className="showbookmark__title">
                <img src={item && item.imageURL} className="avatar__image" alt=""/>
                </div>
                <div className="showbookmark__items">
                <p>{item && item.title}</p>
                <p className="channelname">{item && item.channelName}</p>
                <div className="showbookmark__subs">
                    <p>{item && item.subscribers}K</p>
                    <p>{item && item.publishedDate}</p>
                </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ShowBookmarkedItems
