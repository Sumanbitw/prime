import React, { useEffect } from 'react'
import { useLibrary } from '../../context/videoContext'
import { imageURL } from '../../util/util'
import { Link, useNavigate, useParams } from "react-router-dom"
import { RiDeleteBin5Line } from "react-icons/ri"
import "./playlist.css"
import axios from 'axios'
import { useAuth } from '../../context/authContext'

function PlaylistCard({item}) {
    const { state : {videos, playlist }, dispatch} = useLibrary()
    const { user } = useAuth()
    const navigate = useNavigate()
    
    const video = videos.videos && videos.videos.find(videoItem => videoItem._id === item)
    
    const { playlistId } = useParams()
    
    
    const handleVideoDelete = async () => {
        if(user){
            try{
                const response = await axios.post(`https://primeapi-backend.herokuapp.com/playlists/${playlistId}`, 
                {
                    videoId : video._id
                })
                console.log(response)
                dispatch({ type : "ADD__OR__REMOVE__PLAYLIST", payload : {videoId : video._id, playlistId : playlistId }})
            }catch(error){
                console.log(error)
            } 
        }else{
            navigate("/login")
        }
           
    }

    return (
        <div className="playlist__card">
            <Link to={`/videodetails/${item}`}>
                <img src={imageURL(video && video.videoId)} alt=""/>
            </Link>
            <RiDeleteBin5Line  
            size={30} 
            className="playlist__card__delete__btn" 
            onClick={handleVideoDelete}
            />
        </div>
    )
}

export default PlaylistCard
