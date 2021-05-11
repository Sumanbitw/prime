import React from 'react'
import { IoHome } from "react-icons/io5"
import { RiPlayListFill } from "react-icons/ri"
import { FaBookmark } from "react-icons/fa"
import { MdWatchLater, MdLibraryAdd } from "react-icons/md"
import { Link } from 'react-router-dom'
import "./sidebar.css"

function Sidebar() {
    return (
            <div className="sidebar">
            <ul className="sidebar__lists">
                <li>
                    <Link to="/" className="link">
                    <IoHome/>
                    <span>Home</span>
                    </Link>
                </li>
                <li>
                    <Link to="/playlist" className="link">
                    <RiPlayListFill/>
                    <span>Playlist</span>
                    </Link>
                </li>
                <li>
                    <Link to="/bookmark" className="link">
                    <FaBookmark/>
                    <span>Bookmark</span>
                    </Link>
                </li>
                <li>
                    <Link to="/watch-later" className="link">
                    <MdWatchLater/>
                    <span>Watch Later</span>
                    </Link>
                </li>
                <li>
                    <Link to="/library" className="link">
                    <MdLibraryAdd/>
                    <span>Library</span>
                    </Link>
                </li>
            </ul>
        </div>
        
    )
}

export default Sidebar
