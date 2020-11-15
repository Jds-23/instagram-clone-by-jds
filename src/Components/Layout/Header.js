import React from "react";
import Signup from "../Signup";

const Header = ()=>{
    return(
        <div className="app-header">
            <img
                className="app-header-image"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="logo"
            />
            <div className="app-header-button">
            <Signup/>
            </div>
        </div>
    )
}

export default Header;