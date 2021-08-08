import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { imageURL } from "../../util/util";
import "./bookmark.css";
import { useLibrary } from "../../context/videoContext";
import axios from "axios";
import { useAuth } from "../../context/authContext";

function ShowBookmarkedItems({ item }) {
  const { dispatch } = useLibrary();
  const { user } = useAuth()

  const removeBookmarkVideo = async () => {
    try{
        const response = await axios.delete(`https://primeapi-backend.herokuapp.com/bookmark/${user?._id}/${item?._id}`)
        if(response.data.success){
          dispatch({ type : "REMOVE__BOOKMARK__VIDEOS", payload : item })
        }
    }catch(error){}
  }

  return (
    <div className="showbookmark">
      <div className="showbookmark__container" key={item?._id}>
        <Link to={`/videoDetails/${item?._id}`}>
          <img
            src={imageURL(item.videoId)}
            className="showbookmark__img"
            alt=""
          />
        </Link>
        <RiDeleteBin5Fill
          size={22}
          className="delete__btn"
          onClick={removeBookmarkVideo}
        />
        <div className="showbookmark__details">
          <div className="showbookmark__title">
            <img src={item && item.imageURL} className="avatar__image" alt="" />
          </div>
          <div className="showbookmark__items">
            <p>{item && item.title}</p>
            <p className="channelname">{item && item.channelName}</p>
            <div className="showbookmark__subs">
              <p>{item && item.subscribers}K</p>
              <p>{item && item.publishedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowBookmarkedItems;
