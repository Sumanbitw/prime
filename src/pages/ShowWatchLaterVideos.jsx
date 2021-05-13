import React from 'react'
import { Link } from 'react-router-dom'
import { RiDeleteBin5Fill } from "react-icons/ri"
import { useLibrary } from '../context/videoContext'
import { imageURL } from '../util/util'


function ShowWatchLaterVideos({item}) {
    const {state, dispatch} = useLibrary()
    return (
        <div>
             <div className="showbookmark__container">
                <Link to={`/videoDetails/${item.id}`}>
                <img src={imageURL(item.vid)} className="showbookmark__img"/>
                </Link>
                <RiDeleteBin5Fill size={22} className="delete__btn" onClick={() => dispatch({ type: "REMOVE", payload : item})}/>
                <div className="showbookmark__details">
                <div className="showbookmark__title">
                <img src={item.image} className="avatar__image"/>
                </div>
                <div className="showbookmark__items">
                <p>{item.title}</p>
                <p className="channelname">{item.channelName}</p>
                <div className="showbookmark__subs">
                    <p>{item.subscribers}K</p>
                    <p>{item.date}</p>
                </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ShowWatchLaterVideos
