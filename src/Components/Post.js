import React from "react";
import "../Post.css";

const Post=()=>{
    return(
        <div className="post">
            <h5>Username</h5>
            {/*header -> avatar + username*/}

            <img
                src="https://www.andreasreiterer.at/wp-content/uploads/2017/11/react-logo-825x510.jpg"
                className="post-image"
                alt="img"
            />
            {/*Image*/}


            <h4 className="post-text"><strong>Username:</strong> caption</h4>
            {/*Username Caption*/}
        </div>
    )
}
export default Post;