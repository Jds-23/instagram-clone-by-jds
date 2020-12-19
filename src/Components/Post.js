import React, {useContext, useEffect, useState} from "react";
import "../Post.css";
import Avatar from "@material-ui/core/Avatar";
import {db} from "../firebase";
import firebase from "firebase";
import {UserContext} from "./Context/UserContext";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

const Post=({username, caption,imageUrl,postId})=>{
    const [comments,setComments]=useState([]);
    const [likes,setLikes]=useState([]);
    const [comment,setComment]=useState('');
    const {currentUser}=useContext(UserContext);
;

    useEffect(()=>{
            let unsubscribe;
            if(postId) {
                unsubscribe=db
                    .collection("posts")
                    .doc(postId)
                    .collection("comments")
                    .orderBy('timestamp','desc')
                    .onSnapshot((snapshot => {
                        setComments(snapshot.docs.map(doc=>({
                            id:doc.id,
                            comment:doc.data()})))
                    }))
            }
            return()=>{
                unsubscribe();
            }
        },
        [postId]
    )

    useEffect(()=>{
            let unsubscribe;
            if(postId) {
                unsubscribe=db
                    .collection("posts")
                    .doc(postId)
                    .collection("likes")
                    .orderBy('timestamp','asc')
                    .onSnapshot((snapshot => {
                        setLikes(snapshot.docs.map(doc=>(
                            doc.id
                        )))
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
        if(comment!=="")
        {
            if (!currentUser) {
                alert("You're not logged In!");
            } else {
                db.collection("posts").doc(postId).collection("comments").add({
                    text: comment,
                    username: currentUser.displayName,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
            }
            setComment('');
        }
    }
    const postLike=()=>{
        if(!currentUser){
            alert("You're not logged In!");
        }
        else {
            db.collection("posts").doc(postId).collection("likes").doc(currentUser.displayName).set({
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        }
    }
const postUnlike=()=>{
        if(!currentUser){
            alert("You're not logged In!");
        }
        else {
            db.collection("posts").doc(postId).collection("likes")
                .doc(currentUser.displayName)
                .delete()
        }
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
            {
                currentUser?((likes.indexOf(currentUser?.displayName)+1)
                    ?<button onClick={postUnlike}className="post-like-btn-unlike"><FavoriteIcon/></button>
                    :<button onClick={postLike} className="post-like-btn-like"><FavoriteBorderIcon/></button>)
                    :<button onClick={postLike} className="post-like-btn-like"><FavoriteBorderIcon/></button>

            }
            <h4 className="post-text"><strong>{username}</strong> {caption}</h4>
            {likes.length
                ?<h5 className="post-like"><>Liked by <strong>{likes[0]}</strong> </>
                    {((likes.length) - 1)?<> and <strong>{(likes.length) - 1}</strong> others.</>:<></>}</h5>
                :<></>
            }


            <div className="post-comments">
                {
                    comments.map(({id,comment})=> {
                        return <p key={id}>
                            <strong>{comment.username}</strong> {comment.text}
                        </p>
                    })
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