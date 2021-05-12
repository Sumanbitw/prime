import { createContext, useContext, useReducer } from "react";
import { reducer } from "../reducer/createReducer"

const VideoLibrary = createContext();

export default function VideoPlayer ({ children }) {
    
    const initialState = {
        videos : [],
        bookmarkVideos : [],
        watchLaterVideos : [],
        playlist : [{
            id : Date.now(),
            name : "Playlist",
            videos : [],
        }]
    }

    const [state, dispatch] = useReducer(reducer, initialState)
   
    return (
        <VideoLibrary.Provider value={{state, dispatch}}>
            { children }
        </VideoLibrary.Provider>
    )
}

export function useLibrary() {
    return useContext( VideoLibrary )
}