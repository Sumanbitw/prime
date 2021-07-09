import React, { useEffect } from "react"
import './App.css';
import axios from "axios"
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import SidebarMobile from './components/Sidebar/SidebarMobile';
import { Routes, Route } from "react-router-dom";
import Video from "./components/Video/Video"
import VideoDetails from './components/Video/VideoDetails';
import Bookmark from './pages/Bookmark';
import WatchLater from './pages/Watchlater';
import Playlist from './pages/Playlist';
import PlaylistDetails from './pages/PlaylistDetails';
import Login from "./pages/login/Login"
import { useLibrary } from "./context/videoContext";
import Signup from "./pages/signup/Signup";
import { PrivateRoute } from "./protectedRoute/PrivateRoute";
import { useAuth } from "./context/authContext";


function App() {
  const { dispatch } = useLibrary()
  const { user } = useAuth()

  useEffect(() => {
    (async function getVideo(){
      const response = await axios.get("https://primeapi-backend.herokuapp.com/videos")
      console.log(response.data)
      const videos = response.data
      dispatch({ type : "SET__VIDEOS", payload : { videos : videos }})
    })()  
    return () => {}
  }, [dispatch])

  useEffect(() => {
    (async function getPlaylists(){
      const response = await axios.get(`https://primeapi-backend.herokuapp.com/playlists/${user?._id}`)
      console.log(response.data)
      const playlist = response.data.playlist
      dispatch({ type : "CREATE__PLAYLIST", payload : playlist })
    })()  
    return () => {}
  }, [dispatch, user])



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
      <PrivateRoute path="/playlist/:playlistId" element={<PlaylistDetails/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>  
    </Routes>
    </div>
  );
}

export default App;
