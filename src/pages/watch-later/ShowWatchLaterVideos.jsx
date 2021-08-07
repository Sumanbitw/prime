import React from "react";
import { Link } from "react-router-dom";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useLibrary } from "../../context/videoContext";
import { imageURL } from "../../util/util";
import { useAuth } from "../../context/authContext";
import axios from "axios";

function ShowWatchLaterVideos({ item }) {
  const { dispatch } = useLibrary();
  const { user } = useAuth();

  const removeWatchlaterVideo = async (item) => {
    try {
      const response = await axios.delete(
        `https://primeapi-backend.herokuapp.com/watchlater/${user?._id}/${item?._id}`
      );
      console.log(response);
      dispatch({ type: "REMOVE__WATCHLATER__VIDEOS", payload: item });
    } catch (error) {}
  };
  return (
    <div className="showwatchlatervideos">
      <div className="showwatchlatervideos__container" key={item?._id}>
        <Link to={`/videoDetails/${item?._id}`}>
          <img
            src={imageURL(item && item.videoId)}
            className="showwatchlatervideos__img"
            alt=""
          />
        </Link>
        <RiDeleteBin5Fill
          size={22}
          className="delete__btn"
          onClick={() => removeWatchlaterVideo(item)}
        />
        <div className="showwatchlatervideos__details">
          <div className="showwatchlatervideos__title">
            <img src={item && item.imageURL} className="avatar__image" alt="" />
          </div>
          <div className="showwatchlatervideos__items">
            <p>{item && item.title}</p>
            <p className="channelname">{item && item.channelName}</p>
            <div className="showwatchlatervideos__subs">
              <p>{item && item.subscribers}K</p>
              <p>{item && item.publishedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowWatchLaterVideos;
