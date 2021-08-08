import axios from "axios";
import { useEffect } from "react";
import { createContext, useContext, useReducer } from "react";
import { reducer } from "../reducer/createReducer"
import { useAuth } from "./authContext";

const VideoLibrary = createContext();

export default function VideoPlayer ({ children }) {
    
    const initialState = {
        videos : [],
        bookmarkVideos : [],
        watchLaterVideos : [],
        history : [],
        playlist : []
    }

    const [state, dispatch] = useReducer(reducer, initialState)
    const { user } = useAuth()
    useEffect(() => {
        (async function () {
          try {
            const response = await axios.get(
              `https://primeapi-backend.herokuapp.com/bookmark/${user?._id}`
            );
            const videos = response.data;
            dispatch({ type: "CREATE__BOOKMARKVIDEOS", payload: videos });
          } catch (error) {}
        })();
        return () => {};
      }, []);

      useEffect(() => {
        (async function () {
          try {
            const response = await axios.get(
              `https://primeapi-backend.herokuapp.com/watchlater/${user?._id}`
            );
            const videos = response.data;
            dispatch({ type: "CREATE__WATCHLATERVIDEOS", payload: videos });
          } catch (error) {}
        })();
        return () => {};
      }, []);

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
        <VideoLibrary.Provider value={{state, dispatch}}>
            { children }
        </VideoLibrary.Provider>
    )
}

export function useLibrary() {
    return useContext( VideoLibrary )
}