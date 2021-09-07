import React from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useLibrary } from "../../context/videoContext";
import { imageURL } from "../../util/util";
import PlaylistCard from "./PlaylistCard";
import "./playlist.css";

function PlaylistDetails() {
  const { playlistId } = useParams();
  const {
    state: { playlist },
  } = useLibrary();
  const navigate = useNavigate()

  const desiredPlaylist =
    playlist && playlist.find((playlistObj) => playlistObj._id === playlistId);


  return (
    <div className="playlistdetails">
      <div className="playlistdetails__container">
        {desiredPlaylist && desiredPlaylist.videos.length !== 0 ? (
          desiredPlaylist.videos.map((item) => {
            return (
              <div className="playlistdetails__image">
                <PlaylistCard item={item} />
              </div>
            );
          })
        ) : (
          <div className="container_p">
            <p>No videos present</p>
            <button className="button_playlist" onClick={() => navigate("/")}>Add videos</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlaylistDetails;
