const addVideoInPlaylist = (state, videoId, playlistId) => ({
    ...state,
    playlist : state?.playlist?.map(
        playlistItem => {
            return playlistItem._id === playlistId
    
    ? {
        ...playlistItem,
        videos : playlistItem.videos.concat(videoId)
    }
    : playlistItem
}
)
    // playlist : {
    //     ...state.playlist,
    //     videos : state.playlist.videos.concat(videoId)
    // }
})

const removeVideoFromPlaylist = ( state, videoId, playlistId ) => ({
...state,
playlist : state?.playlist?.map(playlistItem => {
        return playlistItem._id === playlistId
        ? {
            ...playlistItem,
            videos : playlistItem.videos.filter(videoItem =>
                videoItem._id !== videoId)
        }
        : playlistItem
    })
    // playlist : {
    //     ...state.playlist,
    //     videos : state.playlist.videos.filter(videoItem => videoItem._id !== playlistId)
    // }
}) 

export const reducer = ( state, action ) => {
    switch(action.type){
        case "SET__VIDEOS":
            return { ...state, videos : action.payload }
        case "CREATE__BOOKMARKVIDEOS":
            const savedVideo = action.payload.video && action.payload.video.map(videoItem => {
                return {...videoItem.video}
            })
            return { ...state, bookmarkVideos : savedVideo }

        case "CREATE__WATCHLATERVIDEOS":
            const savedWatchlaterVideo = action.payload.watchlaterVideo && action.payload.watchlaterVideo.map(videoItem => {
                return {...videoItem.video}
            })
            return { ...state, watchLaterVideos : savedWatchlaterVideo }
        
        case "CREATE__PLAYLIST": 
            return {...state, playlist : state.playlist.concat(action.payload)}

        case "CREATE__HISTORY":
            return {...state, history : action.payload}    

        case "ADD__VIDEOS__FROM__PLAYLIST":
            console.log({payload : action.payload})
            return {
                ...state,
                playlist : state.playlist.map(playlistObj =>
                    playlistObj._id === action.payload.playlistId
                    ? {
                        ...playlistObj,
                        videos : action.payload.videos
                    }
                    : playlistObj
                    )
                
            }
        case "REMOVE__VIDEOS__FROM__PLAYLIST":
            return {
                ...state,
                playlist : state.playlist.map(playlistItem => 
                    playlistItem._id === action.payload.playlistId
                    ? {
                        ...playlistItem,
                        videos : action.payload.videos
                    }
                    : playlistItem
                )
            }
        
            // const playlists = state?.playlist?.find(
            //     playlistItem => playlistItem._id === action.payload.playlistId)
            
            // const videoId = action.payload.videos.find(videoItem => videoItem)
            // const isVideoInPlaylist = playlists && playlists.videos.includes(action.payload.videoId)
            // return isVideoInPlaylist 
            // ? removeVideoFromPlaylist(state, action.payload.videoId, action.payload.playlistId)
            // : addVideoInPlaylist(state, action.payload.videoId, action.payload.playlistId)
        

        case "ADD__PLAYLIST":
           return{
               ...state,
               playlist : [
                   ...state.playlist,
                   {
                       _id : action.payload._id,
                       name : action.payload.name,
                       videos : action.payload.videos
                   }
               ]
           }
        case "UPDATE_PLAYLIST_NAME":
        return {
            ...state,
            playlists: state.playlists.map((playlistItem) =>
            playlistItem._id === action.payload._id
                ? { ...playlistItem, name: action.payload.name }
                : playlistItem
            ),
        };

        case "ADD__TO__HISTORY":
            return {
                ...state,
                history : state.history.unshift(action.payload)
            }

        case "ADD__BOOKMARKVIDEOS":
            if(!state.bookmarkVideos.find(videoItem => videoItem._id === action.payload._id)){
                return {
                    ...state,
                    bookmarkVideos : [...state.bookmarkVideos, action.payload]
                }
            }
            return state

            case "ADD__WATCHLATERVIDEOS":
                if(!state.watchLaterVideos.find(videoItem => videoItem._id === action.payload._id)){
                    return {
                        ...state,
                        watchLaterVideos : [...state.watchLaterVideos, action.payload]
                    }
                }
                return state
            
        case "REMOVE__BOOKMARK__VIDEOS":
           return {
               ...state,
               bookmarkVideos : state.bookmarkVideos.filter(item => item._id !== action.payload._id)
           }
        
        case "REMOVE__WATCHLATER__VIDEOS": 
           return {
               ...state,
               watchLaterVideos : state.watchLaterVideos.filter(item => item._id !== action.payload._id)
           }
        
        case "REMOVE__VIDEOS__FROM__HISTORY":
            return {
                ...state,
                history : state.history.video.filter(videoItem => videoItem._id !== action.payload._id )
            }   
        case "DELETE__PLAYLIST":
            return{
                ...state,
                playlist : [...state.playlist.filter(item => item?._id !== action.payload)]
            }
        case "DELETE__VIDEOS__FROM__PLAYLIST":
            return{
                ...state,
                playlist : state.playlist.find(videoItem => 
                    videoItem._id === action.payload.playlistId
                    ? {...videoItem, videos : videoItem.videos.filter(video => video._id !== action.payload.videoId)}
                    : videoItem
                    )
            }

        default :
         return state
    }
}

