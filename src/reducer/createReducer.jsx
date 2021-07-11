export const reducer = ( state, action ) => {
    switch(action.type){
        case "SET__VIDEOS":
            return { ...state, videos : action.payload }
        case "CREATE__BOOKMARKVIDEOS":
            return { ...state, bookmarkVideos : [ ...state.bookmarkVideos, action.payload ]}

        case "CREATE__WATCHLATERVIDEOS":
            return { ...state, watchLaterVideos : [ ...state.watchLaterVideos, action.payload ]}
        
        case "CREATE__PLAYLIST": 
            return {...state, playlist : state.playlist.concat(action.payload)}

        case "ADD__OR__REMOVE__PLAYLIST":
            const playlist = state.playlist.find(
                playlistItem => playlistItem._id === action.payload.playlistId)
            const isVideoInPlaylist = playlist && playlist.videos.find(
                videoItem => videoItem._id === action.payload.videoId)
            return isVideoInPlaylist 
            ? removeVideFromPlaylist(state, action.payload.videoId, action.payload.playlistId)
            : addVideoInPlaylist(state, action.payload.videoId, action.payload.playlistId)
        

        case "ADD__PLAYLIST":
           return{
               ...state,
               playlist : [
                   ...state.playlist,
                   {
                       _id : action.payload._id,
                       name : action.payload.name,
                       videos : [action.payload.videoId]
                   }
               ]
           }
        case "REMOVE__BOOKMARK__VIDEOS": 
           return {
               ...state,
               bookmarkVideos : [...state.bookmarkVideos.filter(item => item._id !== action.payload._id)]
           }
        
        case "REMOVE__WATCHLATER__VIDEOS": 
           return {
               ...state,
               watchLaterVideos : [...state.watchLaterVideos.filter(item => item._id !== action.payload._id)]
           }

        case "DELETE__PLAYLIST":
            return{
                ...state,
                playlist : [...state.playlist.filter(item => item._id === action.payload)]
            }

        default :
         return state
    }
}

const addVideoInPlaylist = (state, videoId, playlistId) => ({
        ...state,
        playlist : state.playlist.map(
            playlistItem => {
                return playlistItem._id === playlistId
        
        ? {
            ...playlistItem,
            videos : [...playlistItem.videos, videoId]
        }
        : playlistItem
    }
    )
})

const removeVideFromPlaylist = ( state, videoId, playlistId ) => ({
    ...state,
    playlist : state.playist.map(playlistItem => {
            return playlistItem._id === playlistId
            ? {
                ...playlistItem,
                videos : playlistItem.videos.filter(videoItem =>
                    videoItem._id !== videoId)
            }
            : playlistItem
        })

}) 