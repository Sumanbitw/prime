import axios from 'axios'
import React from 'react'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { useLibrary } from '../../context/videoContext'
import { imageURL } from '../../util/util'
import "./history.css"

function ShowHistoryItems({ item }) {
  const { dispatch } = useLibrary()
  const { user } = useAuth()

  const removeHistoryVideo = async () => {

    try{
      const response = await axios.delete(`https://primeapi-backend.herokuapp.com/bookmark/${user?._id}/${item?._id}`)
      console.log(response)
      dispatch({ type : "REMOVE__BOOKMARK__VIDEOS", payload : item })
  }catch(error){}
  }
  return (
    <div className="showhistory">
      <div className="showhistory__container" key={item?._id}>
        <Link to={`/videoDetails/${item?._id}`}>
          <img
            src={imageURL(item.videoId)}
            className="showhistory__img"
            alt=""
          />
        </Link>
        <RiDeleteBin5Fill
          size={22}
          className="delete__history"
          onClick={() => removeHistoryVideo(item)}
        />
        <div className="showhistory__details">
          <div className="showhistory__title">
            <img src={item && item.imageURL} className="avatar__image__history" alt="" />
          </div>
          <div className="showhistory__items">
            <p>{item && item.title}</p>
            <p className="channelname__history">{item && item.channelName}</p>
            <div className="showhistory__subs">
              <p>{item && item.subscribers}K</p>
              <p>{item && item.publishedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowHistoryItems
