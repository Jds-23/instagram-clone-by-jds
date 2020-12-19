import React, {useEffect, useState} from 'react';
import './App.css';
import Header from "./Components/Layout/Header";
import Post from "./Components/Post";
import {auth, db} from "./firebase";
import {UserContext} from "./Components/Context/UserContext";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";

function App() {
    const [posts,setPosts]=useState([]);
    const [currentUser,setCurrentUser]=useState(null);
    const [appLoading,setAppLoading]=useState(true);
    const [postLoading,setPostLoading]=useState(true);

    useEffect(()=>{
        const unsubscribe= auth.onAuthStateChanged((authUser)=>{
            if(authUser){
                console.log(authUser);
                setCurrentUser(authUser);
                setAppLoading(false);
            }else {
                setCurrentUser(null);
                setAppLoading(false);
            }
        });
        return  ()=>{
            //perform some clean up action
            unsubscribe();
        } // eslint-disable-next-line
    },[]);


    useEffect(()=>{
        db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot=>{
            setPosts(snapshot.docs.map(doc=>({
                id:doc.id,
                post:doc.data()})));
            setPostLoading(false);
        })
    },[])


  return (
      <UserContext.Provider value={{currentUser,setCurrentUser}}>
          {
              appLoading?<div className="app" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
              <CircularProgress /></div>:
              <div className="app">
                  <Header/>
                  {postLoading?<LinearProgress/>:<LinearProgress variant="determinate" value={100} />}
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
          }
      </UserContext.Provider>
  );
}

export default App;
