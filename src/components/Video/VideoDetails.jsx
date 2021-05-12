import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { BiBookmark } from "react-icons/bi"
import  { BsFillBookmarkFill } from "react-icons/bs"
// import axios from "axios"
import { MdPlaylistAdd } from "react-icons/md"
import { FaRegClock } from "react-icons/fa"
// import Modal from "../pages/VideoDetails/Modal/Modal"
import "./video.css"
import { useLibrary } from '../../context/videoContext'
import ReactPlayer from 'react-player'
import data from "../../data/data"
import { videoURL } from "../../util/util"

function VideoDetails() {
    const [showModal, setShowModal] = useState(false)
    const { dispatch } = useLibrary()
    const open = () => setShowModal(true)
    const close = () => setShowModal(false)
    
    const { id } = useParams() 

    const videoObject =  data.find(videoItem => videoItem.id === id )
   console.log({videoObject})

    return (
        <div className="videodetails">
        <div className="video">
         <div className="video__container">
            <ReactPlayer url={videoURL(videoObject.vid)} 
            className="react__player"
            playing
            controls={true}
            />
            
            <div className="text__container">
                <div><p>{videoObject.title}</p></div>
                <div className="text__align">
                <p>{videoObject.views} views</p>
                <p>{videoObject.subscribers}K</p>
                <p>{videoObject.date}</p>
                </div>
                <div className="icons__container">
                    {
                    
                    <BsFillBookmarkFill 
                    size={28} 
                    className="icons" 
                    onClick={() => dispatch({type: "CREATE__BOOKMARKVIDEOS", payload : videoObject})}
                    />}
                    <FaRegClock 
                    size={28} 
                    className="icons" 
                    onClick={() => dispatch({type: "CREATE__WATCHLATERVIDEOS", payload : videoObject})}
                    />
                    <MdPlaylistAdd 
                    size={28} 
                    className="icons" 
                    onClick={() => open()}
                    />
                    {/* <Modal 
                    showModal={showModal} 
                    close={close}
                    /> */}
                </div>
                
            </div>
            </div>
        </div>
        </div>
    )
}

export default VideoDetails
