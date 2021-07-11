import React, { useState } from 'react'
import { AiOutlineClose } from "react-icons/ai"
import { useNavigate, useParams } from 'react-router';
import { useLibrary } from '../../context/videoContext';
import faker from "faker"
import data from "../../data/data"
import "./modal.css";
import axios from 'axios';
import { useAuth } from '../../context/authContext';

function Modal({showModal, close, videoObject}) {
    const [ newPlaylist, setNewPlaylist ] = useState("")
    const { state: { videos, playlist }, dispatch } = useLibrary()
    const { user } = useAuth()
    const { videoId } = useParams()
    const navigate = useNavigate()

    const addToPlaylist = async(videoItem) => {
        setNewPlaylist("")
        try{
            const result = await axios.post(`https://primeapi-backend.herokuapp.com/playlists`,
            {
                user : user._id,
                name : newPlaylist,
                videos : [videoObject.videoId]
            }
            )
            result.data.success && 
            dispatch({ 
                type : "ADD__PLAYLIST",
                payload : {
                    _id : result.data.playlist._id,
                    name : newPlaylist,
                    videos : videoObject.videoId
                }
            })  
        }catch(error){
            console.log(error)
        }
    }

    const handlePlaylist = async(playlistItem) => {
        console.log(playlistItem, "clicked")
        if(user){
            try{
                const result = await axios.post(`https://primeapi-backend.herokuapp.com/playlists/${playlistItem._id}`,
                {
                    videoId : videoObject.videoId
                })
                console.log(result)
            }catch(error){
                console.log(error)
            }
        }else{
            navigate("/login")
        }
    }
   
    return (
        <div className={showModal ? "overlay" : "hide__modal"}>
            <div className={showModal ? "show__modal" : "hide__modal"}>
                <div className="modal">
                    <div className="modal__header">
                        <h3>Playlist</h3>
                        <AiOutlineClose size={24} onClick={close}/>
                    </div>
                    <div className="modal__body">
                        <div className="modal__details">
                        </div>
                        {playlist && playlist.map(playlistItem => (
                            <div className="modal__videoItem">
                            <p>{playlistItem && playlistItem.name}</p>
                            <button onClick={() => handlePlaylist(playlistItem)}>Add</button>
                            </div>
                        ))} 
                    </div>

                    <div className="modal__footer">
                        <input 
                        type="text" 
                        placeholder="Enter playlist name" 
                        className="modal__input" 
                        value={newPlaylist}
                        onChange={(e) => setNewPlaylist(e.target.value)}
                        />
                        <button className="buttons" onClick={() => addToPlaylist()}>
                            Create
                        </button>
                        <button className="buttons" onClick={close}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
