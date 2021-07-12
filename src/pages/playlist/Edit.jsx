import React, { useState } from 'react'
import "./edit.css"
import {AiOutlineClose } from "react-icons/ai"
import axios from 'axios'

function Edit({ showModal, close, playlistObj }) {
    const [playlistName, setPlaylistName] = useState(playlistObj?.name)

    const handleEdit = async() => {
        try{
            const response = await axios.patch(`https://primeapi-backend.herokuapp.com/playlists/${playlistObj._id}`,
            {
                newName : playlistName
            })
            console.log(response)
        }catch(error){
            console.log(error)
        }
    }
    return (
        <div className={showModal ? "overlay__edit" : "hide__edit__modal"}>
            <div className={showModal ? "show__edit__modal" : "hide__edit__modal"}>
                <div className="modal__1">
                    <div className="modal__container__1">
                        <p> Edit name </p>
                        <AiOutlineClose size={24} onClick={close}/>
                        </div>
                        <div className="modal__body__1">
                            <input
                            value={playlistName}
                            placeholder="Enter a new name"
                            onChange={(e) => setPlaylistName(e.target.value)}
                            />
                        <button onClick={handleEdit}>
                            Change
                        </button>    
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Edit
