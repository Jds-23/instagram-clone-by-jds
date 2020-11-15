import React, {useState} from 'react';
import './App.css';
import Header from "./Components/Layout/Header";
import Post from "./Components/Post";

function App() {
    const [posts,setPosts]=useState([
        {
            username:"thejds",
            caption:"Which one are you missing ?",
            imageUrl:"https://img.freepik.com/free-photo/aerial-view-green-forest_144627-45271.jpg?size=664&ext=jpg&ga=GA1.2.1047631867.1604503515"
        },
        {
            username:"leomessi",
            caption:"How’s the setup looking today?",
            imageUrl:"https://img.freepik.com/free-vector/beautiful-happy-diwali-indian-festival-stylish-background_1055-9321.jpg?size=338&ext=jpg&ga=GA1.2.1047631867.1604503515"
        },
        {
            username:"elonmusk",
            caption:"Which one are you missing ?",
            imageUrl:"https://img.freepik.com/free-photo/fuji-mountain-with-milky-way-night_335224-104.jpg?size=664&ext=jpg&ga=GA1.2.1047631867.1604503515"
        }
    ]);


  return (
    <div className="app">
        <Header/>

        {
            posts.map(post=>{
                return <Post
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
