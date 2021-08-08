import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLibrary } from "../../context/videoContext";
import { GoDeviceCameraVideo } from "react-icons/go";
import { RiDeleteBin5Line } from "react-icons/ri";
// import { GrEdit } from "react-icons/gr";
import "./playlist.css";
import axios from "axios";
import Edit from "./Edit";
import Loader from "react-loader-spinner";
import { useAuth } from "../../context/authContext";

function Playlist() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const {
    state: { playlist },
    dispatch,
  } = useLibrary();
  const navigate = useNavigate()
  const open = () => setShowModal(true);
  const close = () => setShowModal(true);

  const handlePlaylist = async (playlistObj) => {
    try {
      const response = await axios.delete(
        `https://primeapi-backend.herokuapp.com/playlists/${playlistObj?._id}`
      );
      dispatch({ type: "DELETE__PLAYLIST", payload: playlistObj?._id });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    (async function getPlaylists(){
      await axios.get(`https://primeapi-backend.herokuapp.com/playlists/${user?._id}`)
    })()  
    return () => {}
  }, [])

  return (
    <>
      {loading ? (
        <Loader type="Puff" color="white" height={80} width={80} timeout={1000} />
      ) : (
        <div className="playlist">
          {playlist && playlist.length !== 0 ? (
            playlist.map((playlistObj) => {
              return (
                <div key={playlistObj?._id} className="playlist__container">
                  <p>{playlistObj && playlistObj.name}</p>
                  <GoDeviceCameraVideo size={28} />
                  <div className="btn__container">
                    <Link to={`/playlist/${playlistObj?._id}`}>
                      <button className="playlist__btn">View</button>
                    </Link>
                    <RiDeleteBin5Line
                      size={25}
                      className="playlistdetails__delete"
                      onClick={() => handlePlaylist(playlistObj)}
                    />
                    {/* <GrEdit
                  size={25}
                  color="white"
                  className="playlist__edit"
                  onClick={() => open()}
                /> */}

                    <Edit
                      showModal={showModal}
                      close={close}
                      playlistObj={playlistObj}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="container_p">
              <p>
                No playlist present
              </p>
              <button className="button_playlist" onClick={() => navigate("/")}>Create Playlist</button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Playlist;
