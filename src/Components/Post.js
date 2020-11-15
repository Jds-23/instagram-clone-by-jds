import React, {useContext, useEffect, useState} from "react";
import "../Post.css";
import Avatar from "@material-ui/core/Avatar";
import {db} from "../firebase";
import firebase from "firebase";
import {UserContext} from "./Context/UserContext";

const Post=({username, caption,imageUrl,postId})=>{
    const [comments,setComments]=useState([]);
    const [comment,setComment]=useState('');
    const {currentUser}=useContext(UserContext);

    useEffect(()=>{
            let unsubscribe;
            if(postId) {
                unsubscribe=db
                    .collection("posts")
                    .doc(postId)
                    .collection("comments")
                    .orderBy('timestamp','desc')
                    .onSnapshot((snapshot => {
                        setComments(snapshot.docs.map((doc)=>doc.data()))
                    }))
            }

            return()=>{
                unsubscribe();
            }
        },
        [postId]
    )


    const postComment=(event)=>{
        event.preventDefault();
        if(!currentUser){
            alert("You're not logged In!");
        }
        else {
            db.collection("posts").doc(postId).collection("comments").add({
                text: comment,
                username: currentUser.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        }        setComment('');
    }

    return(
        <div className="post">

            <div className="post-header">
                <Avatar
                    className="post-header-avatar"
                    src="1.img"
                    alt={username}
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

            <div className="post-comments">
                {
                    comments.map((comment)=>(
                        <p>
                            <strong>{comment.username}</strong> {comment.text}
                        </p>
                    ))
                }
            </div>

            <form className="post-comment-box">
                <input
                className="post-comment-input"
                type="text"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e)=>setComment(e.target.value)}
                />
                <button onClick={postComment} className="post-comment-button">
                    Post
                </button>
            </form>
        </div>
    )
}
export default Post;