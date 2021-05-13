import React, { useState } from 'react'
import { AiOutlineClose } from "react-icons/ai"
import { useParams } from 'react-router';
import { useLibrary } from '../context/videoContext';
import faker from "faker"
import data from "../data/data"
import "./modal.css";

function Modal({showModal, close, video}) {
    const [ newPlaylist, setNewPlaylist ] = useState("")
    const { state: { playlist }, dispatch } = useLibrary()
    const { videoId } = useParams()
    console.log( videoId )
    const videoObject = data.find(videoItem => videoItem === playlist)
   
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
                        {playlist.map(videoItem => (
                            <div className="modal__videoItem">
                            <p>{videoItem.name}</p>
                            <button onClick={() => dispatch({ type:"ADD__PLAYLIST", payload:{videoId, id:videoItem.id}})}>Add</button>
                            </div>
                        ))}
                       
                        
                    </div>
                    <div className="modal__footer">
                        <input 
                        type="text" 
                        placeholder="Enter playlist name" 
                        className="modal__input" 
                        onChange={(e) => setNewPlaylist(e.target.value)}
                        />
                        <button className="button" onClick={() => {
                            dispatch({ 
                                type: "CREATE__PLAYLIST", 
                                payload: {id:faker.datatype.uuid(),name:newPlaylist,videos:[]}})
                                setNewPlaylist("")
                                }}
                                >
                                    Create
                        </button>
                        <button className="button" onClick={close}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
