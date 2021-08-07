import React, { useState } from "react";
import { useLibrary } from "../../context/videoContext";
import ShowBookmarkedItems from "./ShowBookmarkedItems";
import "./bookmark.css";
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router";
import Loader from "react-loader-spinner";

function Bookmark() {
  const {
    state: { bookmarkVideos },
    dispatch,
  } = useLibrary();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(
          `https://primeapi-backend.herokuapp.com/bookmark/${user?._id}`
        );
        const videos = response.data;
        dispatch({ type: "CREATE__BOOKMARKVIDEOS", payload: videos });
        setLoading(false);
      } catch (error) {}
    })();
    return () => {};
  }, []);

  return (
    <>
      {loading ? (
        <Loader type="Puff" color="white" height={80} width={80} timeout={1000}/>
      ) : (
        <div className="bookmark">
          {bookmarkVideos.video && bookmarkVideos.video.length !== 0 ? (
            bookmarkVideos.video.map((item) => (
              <ShowBookmarkedItems item={item.video} />
            ))
          ) : (
            <div className="container_b">
              <p>No videos is bookmarked</p>
              <button className="button_bookmark" onClick={() => navigate("/")}>
                Add Video
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Bookmark;
