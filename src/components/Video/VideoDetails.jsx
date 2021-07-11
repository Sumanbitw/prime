import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { BiBookmark } from "react-icons/bi"
import  { BsFillBookmarkFill, BsBookmark } from "react-icons/bs"
// import axios from "axios"
import { MdPlaylistAdd } from "react-icons/md"
import { FaRegClock } from "react-icons/fa"
import Modal from "../../pages/modal/Modal"
import "./video.css"
import { useLibrary } from '../../context/videoContext'
import ReactPlayer from 'react-player'
import data from "../../data/data"
import { videoURL } from "../../util/util"

function VideoDetails() {
    const [showModal, setShowModal] = useState(false)
    const { dispatch } = useLibrary()
    const [video, setVideo] = useState({})
    const open = () => setShowModal(true)
    const close = () => setShowModal(false)
    const { state : { videos }} = useLibrary()
    
    const { videoId } = useParams() 
    

    const videoObject = videos.videos && videos.videos.find(videoItem => videoItem._id === videoId )
    console.log(videoObject)
    return (
        <div className="videodetails">
            <div className="video">
            <div className="video__container">
                <ReactPlayer url={videoURL(videoObject && videoObject.videoId)} 
                className="react__player"
                playing
                controls={false}
                width="100%" 
                />
            </div>
        <div className="text__container">
            <div>
                <img src={videoObject && videoObject.imageURL} alt=""/>
                <span>{videoObject && videoObject.title}</span>
                <p>{videoObject && videoObject.description}</p>
            <div className="text__align">
                <p>{videoObject && videoObject.views} views</p>
                <p>{videoObject && videoObject.subscribers}K</p>
                <p>{videoObject && videoObject.date}</p>
            </div>
            </div>
            <div className="icons__container">

                    <BsBookmark 
                    size={28} 
                    className="icons" 
                    onClick={() => dispatch({type: "CREATE__BOOKMARKVIDEOS", payload : videoObject})}
                    />
                
                    <FaRegClock 
                    size={28} 
                    className="icons" 
                    onClick={() => dispatch({type: "CREATE__WATCHLATERVIDEOS", payload : videoObject})}
                    />
                    <MdPlaylistAdd 
                    size={28} 
                    className="icons" 
                    onClick={
                        () => { 
                        open();
                        setVideo(videoObject)
                    }
                }
                    />
                    <Modal 
                    showModal={showModal} 
                    close={close}
                    video={video}
                    videoObject={videoObject}
                    />
            </div>
            </div>
        </div>
        </div>
    )
}

export default VideoDetails
