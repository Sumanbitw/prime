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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    (async function () {
      try {
       await axios.get(
          `https://primeapi-backend.herokuapp.com/bookmark/${user?._id}`
        );
      } catch (error) {}
    })();
  }, []);


  return (
    <>
      <div className="bookmark">
        {bookmarkVideos && bookmarkVideos.length !== 0 ? (
          bookmarkVideos.map((item) => (
            <ShowBookmarkedItems item={item} />
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
    </>
  );
}

export default Bookmark;
