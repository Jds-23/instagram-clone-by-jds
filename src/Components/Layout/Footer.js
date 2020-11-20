import React from "react";
import FavoriteIcon from '@material-ui/icons/Favorite';
import "./Footer.css"

const MyFooter=()=>{
    return(
        <div className="footer">
            <p>Developed with </p><FavoriteIcon style={{color: '#ed4956'}}/><p> by <a
            href="https://github.com/Jds-23"
            target="_blank"
            rel="noreferrer">JDS</a></p>
        </div>
    )
}
export default MyFooter;