import React from 'react'
import { IoHome } from "react-icons/io5"
import { RiPlayListFill } from "react-icons/ri"
import { FaBookmark } from "react-icons/fa"
import { MdWatchLater, MdLibraryAdd } from "react-icons/md"
import "./sidebarmobile.css"
import { Link } from 'react-router-dom'

function SidebarMobile() {
    return (
        <div className="sidebarmobile">
            <div className="sidebarmobile__item">
             <Link to="/" className="links">  
            <IoHome size={30}/>
            </Link> 
            </div>
            <div className="sidebarmobile__item">
            <Link to="/playlist"className="links"> 
            <RiPlayListFill size={30}/>
            </Link>
            </div>
            <div className="sidebarmobile__item">
            <Link to="/bookmark" className="links">    
            <FaBookmark size={30}/>
            </Link>
            </div>
            <div className="sidebarmobile__item">
            <Link to="/watchlater" className="links">
            <MdWatchLater size={30}/>
            </Link>
            </div>
            <div className="sidebarmobile__item">
            <Link to="/library" className="links">
            <MdLibraryAdd size={30}/>
            </Link>
            </div>
        </div>
    )
}

export default SidebarMobile
