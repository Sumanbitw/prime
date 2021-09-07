import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { useLibrary } from "../../context/videoContext";
import ShowWatchLaterVideos from "./ShowWatchLaterVideos";
import Loader from "react-loader-spinner";
import "./watchlater.css";
import { useNavigate } from "react-router";

function WatchLater() {
  const {
    state: { watchLaterVideos },
    dispatch,
  } = useLibrary();
  const { user } = useAuth();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        await axios.get(
          `https://primeapi-backend.herokuapp.com/watchlater/${user?._id}`
        );
      } catch (error) {}
    })();  
  }, []);

  return (
    <>
      {loading ? (
        <Loader type="Puff" color="white" height={80} width={80} timeout={1000}/>
      ) : (
        <div className="watchlater">
          {watchLaterVideos &&
          watchLaterVideos.length !== 0 ? (
            watchLaterVideos.map((item) => (
              <ShowWatchLaterVideos item={item} />
            ))
          ) : (
            <div className="container_w">
              <p>Nothing is kept for watch later</p>
              <button className="button_watchlater" onClick={() => navigate("/")}>Add Video</button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default WatchLater;
