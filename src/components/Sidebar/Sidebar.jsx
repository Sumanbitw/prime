import React from 'react'
import { IoHome } from "react-icons/io5"
import { RiPlayListFill } from "react-icons/ri"
import { FaBookmark } from "react-icons/fa"
import { MdWatchLater } from "react-icons/md"
// import { AiOutlineHistory } from "react-icons/ai"
import { Link } from 'react-router-dom'
import "./sidebar.css"

function Sidebar() {
    return (
            <div className="sidebar">
            <ul className="sidebar__lists">
                <li>
                    <Link to="/" className="link">
                    <IoHome size={24}/>
                    <span>Home</span>
                    </Link>
                </li>
                <li>
                    <Link to="/playlist" className="link">
                    <RiPlayListFill size={24}/>
                    <span>Playlist</span>
                    </Link>
                </li>
                <li>
                    <Link to="/bookmark" className="link">
                    <FaBookmark size={24}/>
                    <span>Bookmark</span>
                    </Link>
                </li>
                <li>
                    <Link to="/watchlater" className="link">
                    <MdWatchLater size={24}/>
                    <span>Watch Later</span>
                    </Link>
                </li>
                <li>
                    {/* <Link to="/history" className="link">
                    <AiOutlineHistory size={24}/>
                    <span>History</span>
                    </Link> */}
                </li>
            </ul>
        </div>
        
    )
}

export default Sidebar
