import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate, useParams } from "react-router";
import { useLibrary } from "../../context/videoContext";
import faker from "faker";
import data from "../../data/data";
import "./modal.css";
import axios from "axios";
import { useAuth } from "../../context/authContext";

function Modal({ showModal, close, videoObject }) {
  const [newPlaylist, setNewPlaylist] = useState("");
  const {
    state: { playlist },
    dispatch,
  } = useLibrary();
  const { user } = useAuth();
  const { videoId } = useParams();
  const navigate = useNavigate();

  const isVideoInPlaylist = (playlistId, videoId) => {
    return playlist && playlist.find(playlistObj => playlistObj?._id === playlistId).videos.find(videoItem => videoItem === videoId)
    ? true
    : false

  }
  const addToPlaylist = async () => {
    setNewPlaylist("");
    try {
      const result = await axios.post(
        `https://primeapi-backend.herokuapp.com/playlists`,
        {
          user: user._id,
          name: newPlaylist,
          videos: [videoObject._id],
        }
      );
      console.log(result);
      result.data.success &&
        dispatch({
          type: "ADD__PLAYLIST",
          payload: {
            _id: result.data.playlist._id,
            name: result.data.playlist.name,
            videos: result.data.playlist.videos,
          },
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlaylist = async (playlistItem) => {
    if (user) {
      try {
        const result = await axios.post(
          `https://primeapi-backend.herokuapp.com/playlists/${playlistItem._id}`,
          {
            videoId: videoObject._id,
          }
        );
        console.log(result);
        dispatch({
          type: "ADD__VIDEOS__FROM__PLAYLIST",
          payload: { videos: result.data.updatedPlaylist.videos, playlistId: result.data.updatedPlaylist._id },
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className={showModal ? "overlay" : "hide__modal"}>
      <div className={showModal ? "show__modal" : "hide__modal"}>
        <div className="modal">
          <div className="modal__header">
            <h3>Playlist</h3>
            <AiOutlineClose size={24} onClick={close} />
          </div>
          <div className="modal__body">
            <div className="modal__details"></div>
            {playlist &&
              playlist.map((playlistItem) => (
                <div className="modal__videoItem">
                  <p>{playlistItem && playlistItem.name}</p>
                  {!isVideoInPlaylist(playlistItem?._id, videoId)
                  ? <button onClick={() => handlePlaylist(playlistItem)}>
                    Add
                  </button>
                  : <button onClick={() => navigate(`/playlist/${playlistItem?._id}`)}>
                    Playlist
                </button>
                  }
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
            <button className="buttons" onClick={addToPlaylist}>
              Create
            </button>
            <button className="buttons" onClick={close}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
