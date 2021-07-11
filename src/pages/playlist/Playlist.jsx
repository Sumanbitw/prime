import React from 'react'
import { Link } from 'react-router-dom'
import { useLibrary } from '../../context/videoContext'
import { GoDeviceCameraVideo } from "react-icons/go"
import { RiDeleteBin5Line } from "react-icons/ri"
import "./playlist.css"

function Playlist() {
    const { state: { playlist }, dispatch } = useLibrary()
    console.log(playlist)
    
    return (
        <div className="playlist">
            {playlist.map(playlistObj => {
                return (
                    <div key={playlistObj._id} className="playlist__container">
                        <p>{playlistObj && playlistObj.name}</p>
                        <GoDeviceCameraVideo size={28}/>
                        <div className="btn__container">
                        <Link to={`/playlist/${playlistObj?._id}`}>
                        <button className="playlist__btn">View</button>
                        </Link>
                        <RiDeleteBin5Line size={25} className="playlistdetails__delete"/>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Playlist
