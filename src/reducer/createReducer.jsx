export const reducer = ( state, action ) => {
    switch(action.type){
        case "SET__VIDEOS":
            return { ...state, videos : action.payload }
        case "CREATE__BOOKMARKVIDEOS":
            return { ...state, bookmarkVideos : [ ...state.bookmarkVideos, action.payload ]}

        case "CREATE__WATCHLATERVIDEOS":
            return { ...state, watchLaterVideos : [ ...state.watchLaterVideos, action.payload ]}
        
        default :
         return state
    }
}
