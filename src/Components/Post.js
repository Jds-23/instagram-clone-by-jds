import React from "react";
import "../Post.css";
import Avatar from "@material-ui/core/Avatar";

const Post=({username, caption,imageUrl})=>{
    return(
        <div className="post">

            <div className="post-header">
                <Avatar
                    className="post-header-avatar"
                    src="1.img"
                    alt="Jds"
                />
                <h5>{username}</h5>
            </div>
            {/*header -> avatar + username*/}

            <img
                src={imageUrl}
                className="post-image"
                alt="img"
            />
            {/*Image*/}


            <h4 className="post-text"><strong>{username}</strong> {caption}</h4>
            {/*Username Caption*/}
        </div>
    )
}
export default Post;