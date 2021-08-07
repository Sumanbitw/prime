import React, { useState } from "react";
import VideoCard from "./VideoCard";
import "./videocard.css";
import data from "../../data/data";
import { useLibrary } from "../../context/videoContext";
import Loader from "react-loader-spinner";
import { useEffect } from "react/cjs/react.development";

function Videolist() {
  const {
    state: { videos },
  } = useLibrary();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async function () {
      setLoading(false);
    })();
  }, []);
  return (
    <>
      {loading ? (
        <Loader type="Puff" color="white" height={80} width={80} timeout={1000}/>
      ) : (
        <div className="videolist">
          {videos.videos &&
            videos.videos.map((item) => (
              <VideoCard item={item} vid={item.videoId} />
            ))}
        </div>
      )}
    </>
  );
}

export default Videolist;
