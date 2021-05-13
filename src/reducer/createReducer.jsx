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

        case "ADD__PLAYLIST":
            console.log(state.playlist)
            return {...state, playlist : state.playlist.map(videoItem => {
                return videoItem.id !== action.payload.id
                ? videoItem
                : {...videoItem, videos: videoItem.videos.concat(action.payload.videoId)}
            })}
        default :
         return state
    }
}
