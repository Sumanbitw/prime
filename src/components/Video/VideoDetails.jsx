import React, { useState } from "react";
import { useParams } from "react-router";
// import { BiBookmark } from "react-icons/bi";
import { BsFillBookmarkFill, BsBookmark } from "react-icons/bs";
import { MdPlaylistAdd } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import Modal from "../../pages/modal/Modal";
import "./video.css";
import { useLibrary } from "../../context/videoContext";
import ReactPlayer from "react-player";
import { videoURL } from "../../util/util";
import { useAuth } from "../../context/authContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function VideoDetails() {
  const [showModal, setShowModal] = useState(false);
  const { dispatch } = useLibrary();
  const [video, setVideo] = useState({});
  const open = () => setShowModal(true);
  const close = () => setShowModal(false);
  const {
    state: { videos, bookmarkVideos, watchLaterVideos },
  } = useLibrary();
  const { user } = useAuth();

  const { videoId } = useParams();

  const videoObject =
    videos.videos &&
    videos.videos.find((videoItem) => videoItem._id === videoId);


    const isVideoBookmarked = () => {
    return bookmarkVideos && bookmarkVideos.find((videoItem) => videoItem._id === videoId)
      
  };

  const videoWatchLater = () => {
    return watchLaterVideos && watchLaterVideos.find(
        (videoItem) => videoItem._id === videoId
      )
  };

  console.log(isVideoBookmarked())
  console.log(videoWatchLater())
  const handleBookmarkVideos = async () => {
    if (user) {
      if (!isVideoBookmarked()) {
        try {
          await axios.post(
            `https://primeapi-backend.herokuapp.com/bookmark`,
            {
              user: user?._id,
              video: videoId,
            }
          );
          dispatch({ type: "ADD__BOOKMARKVIDEOS", payload: videoObject });
          toast("Video Bookmarked", { type: "success" });
        } catch (error) {}
      } else {
        toast("Video already present", { type: "info" });
      }
    } else {
      toast("You need to sign in", { type: "warning" });
    }
  };

  const handleWatchlaterVideos = async () => {
    if (user) {
      if (!videoWatchLater()) {
        try {
          const response = await axios.post(
            `https://primeapi-backend.herokuapp.com/watchlater`,
            {
              user: user?._id,
              video: videoId,
            }
          );
        } catch (error) {}
        dispatch({ type: "ADD__WATCHLATERVIDEOS", payload: videoObject });
        toast("Video marked for watch later", { type: "success" });
      } else {
        toast("Video already present", { type: "info" });
      }
    } else {
      toast("You need to sign in", { type: "warning" });
    }
  };


  return (
    <div className="videodetails">
      <div className="video">
        <div className="video__container">
          <ReactPlayer
            url={videoURL(videoObject && videoObject.videoId)}
            className="react__player"
            playing
            controls={false}
            width="100%"
          />
        </div>
        <div className="text__container">
          <div>
            <img
              src={videoObject && videoObject.imageURL}
              className="videodetails__image"
              alt=""
            />
            <span>{videoObject && videoObject.title}</span>
            <p>{videoObject && videoObject.description}</p>
            <div className="text__align">
              <span>{videoObject && videoObject.views} views</span>
              <span>{videoObject && videoObject.subscribers}K</span>
              <span>{videoObject && videoObject.publishedDate}</span>
            </div>
          </div>
          <div className="icons__container">
            {!isVideoBookmarked() ? (
              <BsBookmark
                size={28}
                className="icons"
                onClick={handleBookmarkVideos}
              />
            ) : (
              <BsFillBookmarkFill
                size={28}
                className="icons"
                onClick={handleBookmarkVideos}
              />
            )}

            <ToastContainer />
            <FaRegClock
              size={28}
              className="icons"
              onClick={handleWatchlaterVideos}
            />

            <MdPlaylistAdd
              size={28}
              className="icons"
              onClick={() => {
                if(user){
                  open();
                  setVideo(videoObject);
                }else{
                  toast("You need to sign in", { type: "warning" })
                }
              }}
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
  );
}

export default VideoDetails;
