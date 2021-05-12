import React from 'react'
import { Link } from "react-router-dom"
import { imageURL } from "../../util/util"
import { FiMoreVertical } from "react-icons/fi"
import "./videocard.css"

function VideoCard({ item, id }) {
    return (
            <div className="videocard__container">
                <div className="videocard__img">  
                    <Link to={`/videodetails/${item.id}`}>
                        <img src={imageURL(id)} className="image" alt="" />
                    </Link>
                </div>
            <div className="videoCard">
                <div className="videocard__details">
                <img src={item.image} className="videocard__image" alt=""/>
                </div>
            <div className="videocard__info">
            <p className="videocard__title">{item.title}</p>
            <p><FiMoreVertical  size={28} /></p>
            <p>{item.subscribers}K</p>
            <p>{item.date}</p>
            </div> 
        </div>
        </div>
    )
}

export default VideoCard
