import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useAuth } from '../../context/authContext'
import { useLibrary } from '../../context/videoContext'
import ShowHistoryItems from './ShowHistoryItems'
import "./history.css"

function History() {
  const { state : { history }, dispatch } = useLibrary()
  const { user } = useAuth()

  useEffect(() => {
    (async function (){
        try{
            const response = await axios.get(`https://primeapi-backend.herokuapp.com/history/${user?._id}`)
            const videos = response.data
            console.log(videos)
            dispatch({ type : "CREATE__HISTORY", payload : videos })
        }catch(error){}
    })()  
    return () => {}
  }, [])
  console.log({history})
  return (
    <div className="history">
      {history.video && history.video.length !== 0 ? history.video.map(item => (
                <ShowHistoryItems item={item.video}/>
            ))
            : <div>
                <p style={{color:"whitesmoke", marginTop:"6rem"}}>No videos is in history</p>
                <button>Add Video</button>
            </div> 
            }
      
    </div>
  )
}

export default History
