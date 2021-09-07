import React from 'react'
import { Link } from "react-router-dom"
import { imageURL } from "../../util/util"
import { FiMoreVertical } from "react-icons/fi"
import "./videocard.css"

function VideoCard({ item, vid }) {
    return (
            <div className="videocard__container" key={item._id}>
                 <Link to={`/videodetails/${item._id}`}>
                <div className="videocard__img">  
                        <img src={imageURL(vid)} className="image" alt="" />
                </div>
                </Link>
            <div className="videoCard">
                <div className="videocard__details">
                <img src={item.imageURL}  alt=""/>
                <p className="videocard__title">{item.title}</p>
                <FiMoreVertical  size={28} className="icon"/>
                </div>
            <div className="videocard__info">
            <p>{item.subscribers}K</p>
            <p>{item.publishedDate}</p>
            </div> 
        </div>
        </div>
    )
}
export default VideoCard
