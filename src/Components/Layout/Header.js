import React from "react";
import Signup from "../Signup";
import "./Header.css"

const Header = ()=>{
    return(
        <div className="header">
            <img
                className="header-image"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="logo"
            />
            <div className="header-button">
            <Signup/>
            </div>
        </div>
    )
}

export default Header;