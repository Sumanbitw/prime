import React, { useEffect } from "react"
import './App.css';
import axios from "axios"
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import SidebarMobile from './components/Sidebar/SidebarMobile';
import { Routes, Route } from "react-router-dom";
import Video from "./components/Video/Video"
import VideoDetails from './components/Video/VideoDetails';
import Bookmark from './pages/bookmark/Bookmark';
import WatchLater from './pages/watch-later/Watchlater';
import Playlist from './pages/playlist/Playlist';
import PlaylistDetails from './pages/playlist/PlaylistDetails';
import Login from "./pages/login/Login"
import { useLibrary } from "./context/videoContext";
import Signup from "./pages/signup/Signup";
import { PrivateRoute } from "./protectedRoute/PrivateRoute";
import { useAuth } from "./context/authContext";
import History from "./pages/history/History";


function App() {
  const { dispatch } = useLibrary()
  const { user } = useAuth()

  useEffect(() => {
    (async function getVideo(){
      const response = await axios.get("https://primeapi-backend.herokuapp.com/videos")
      const videos = response.data
      dispatch({ type : "SET__VIDEOS", payload : { videos : videos }})
    })()  
    return () => {}
  }, [dispatch])

  useEffect(() => {
    (async function getPlaylists(){
      const response = await axios.get(`https://primeapi-backend.herokuapp.com/playlists/${user?._id}`)
      const playlist = response.data.playlist
      console.log(playlist)
      dispatch({ type : "CREATE__PLAYLIST", payload : playlist })
    })()  
    return () => {}
  }, [])

  return (
    <div className="App">
    <Navbar/>
    {user && <Sidebar/>}
    <SidebarMobile/>
    <Routes>
      <Route path="/" element={<Video/>}/>
      <Route path="/videodetails/:videoId" element={<VideoDetails/>}/>
      <PrivateRoute path="/bookmark" element={<Bookmark/>}/>
      <PrivateRoute path="/watchlater" element={<WatchLater/>} />
      <PrivateRoute path="/playlist" element={<Playlist/>}/>
      <PrivateRoute path="/history" element={<History/>}/>
      <PrivateRoute path="/playlist/:playlistId" element={<PlaylistDetails/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>  
    </Routes>
    </div>
  );
}

export default App;
