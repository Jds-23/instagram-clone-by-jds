import React, {useEffect, useState} from 'react';
import './App.css';
import Header from "./Components/Layout/Header";
import Post from "./Components/Post";
import {db} from "./firebase";

function App() {
    const [posts,setPosts]=useState([]);

    useEffect(()=>{
        db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot=>{
            setPosts(snapshot.docs.map(doc=>({
                id:doc.id,
                post:doc.data()})));
        })
    },[])


  return (
    <div className="app">



        <Header/>

        {
            posts.map(({id, post})=>{
                return <Post
                    key={id}
                    username={post.username}
                    caption={post.caption}
                    imageUrl={post.imageUrl}
                />
            })
        }


        {/*Posts*/}


     </div>
  );
}

export default App;
