import { createContext, useContext, useReducer } from "react";
import { reducer } from "../reducer/createReducer"
import faker from "faker"

const VideoLibrary = createContext();

export default function VideoPlayer ({ children }) {
    
    const initialState = {
        videos : [],
        bookmarkVideos : [],
        watchLaterVideos : [],
        playlist : [{
            id : faker.datatype.uuid(),
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