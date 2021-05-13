import './App.css';
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


function App() {
  return (
    <div className="App">
    <Navbar/>
    <Sidebar/>
    <SidebarMobile/>
    <Routes>
      <Route path="/" element={<Video/>}/>
      <Route path="/videodetails/:videoId" element={<VideoDetails/>}/>
       <Route path="/bookmark" element={<Bookmark/>}/>
      <Route path="/watch-later" element={<WatchLater/>} />
      <Route path="/playlist" element={<Playlist/>}/>
      <Route path="/playlist/:playlistId" element={<PlaylistDetails/>} />
      {/*<Route path="/login" element={<Login/>}/>  */}
    </Routes>
    </div>
  );
}

export default App;
