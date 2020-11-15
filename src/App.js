import React, {useEffect, useState} from 'react';
import './App.css';
import Header from "./Components/Layout/Header";
import Post from "./Components/Post";
import {db} from "./firebase";
import {UserContext} from "./Components/Context/UserContext";

function App() {
    const [posts,setPosts]=useState([]);
    const [currentUser,setCurrentUser]=useState(null);

    useEffect(()=>{
        db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot=>{
            setPosts(snapshot.docs.map(doc=>({
                id:doc.id,
                post:doc.data()})));
        })
    },[])


  return (
      <UserContext.Provider value={{currentUser,setCurrentUser}}>
    <div className="app">



        <Header/>
        <div className="app-posts">
        {
            posts.map(({id, post})=>{
                return <Post
                    key={id}
                    postId={id}
                    username={post.username}
                    caption={post.caption}
                    imageUrl={post.imageUrl}
                />
            })
        }
        </div>

        {/*Posts*/}


     </div>
      </UserContext.Provider>
  );
}

export default App;
