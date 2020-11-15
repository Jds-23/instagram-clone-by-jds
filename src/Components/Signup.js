import React, {useEffect, useState} from "react";
import {Modal,Button,Input} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {auth} from "../firebase";
import ImageUpload from "./ImageUpload";

function getModalStyle() {
    const top = 50 ;
    const left = 50 ;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


const Signup=()=>{
    const classes=useStyles();
    const [open,setOpen]=useState(false);
    const [modalStyle]=React.useState(getModalStyle);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [username,setUsername]=useState("");
    const [user,setUser]=useState(null);
    const [openSignIn,setOpenSignIn]=useState(false);

    useEffect(()=>{
      const unsubscribe= auth.onAuthStateChanged((authUser)=>{
            if(authUser){
                console.log(authUser);
                setUser(authUser);
            }else {
                setUser(null);
            }
        });
      return  ()=>{
          //perform some clean up action
          unsubscribe();
      }
    },[user, username]);

    const signUp=(e)=>{
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email,password)
            .then((authUser)=>{
                return authUser.user.updateProfile({
                   displayName: username
                });
            })
            .catch((error)=>alert(error.message));
        setOpen(false);
    }

    const signIn=(e)=>{
        e.preventDefault();
        auth.signInWithEmailAndPassword(email,password)
            .catch((error)=>alert(error.message));
        setOpenSignIn(false);
    }
    return(
        <div>


            <Modal
                open={open}
                onClose={()=>setOpen(false)}
            >
                <div style={modalStyle} className={classes.paper}>

                    <img
                        className="app-header-image"
                        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                        alt="logo"
                    />
                    <form className="signup-form" onSubmit={signUp}>
                        <Input type="text" placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)}/><br/>
                        <Input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/><br/>
                        <Input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/><br/>
                        <Button type="submit">Sign Up</Button>
                    </form>
                </div>
            </Modal>
            <Modal
                open={openSignIn}
                onClose={()=>setOpenSignIn(false)}
            >
                <div style={modalStyle} className={classes.paper}>

                    <img
                        className="app-header-image"
                        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                        alt="logo"
                    />
                    <form className="signup-form" onSubmit={signIn}>
                        <Input type="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/><br/>
                        <Input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/><br/>
                        <Button type="submit">Sign Up</Button>
                    </form>
                </div>
            </Modal>
            <div className="app-header-button">
            {user?<><Button onClick={()=>auth.signOut()}>SignOut</Button>
                {user?.displayName?<ImageUpload username={user.displayName}/>
                    :<h3>Login to Upload</h3>}</>
                :<>
                    <Button onClick={()=>setOpen(true)}>Sign Up</Button>
                    <Button onClick={()=>setOpenSignIn(true)}>Sign In</Button>
                </>
            }
            </div>

        </div>
    )
}
export default Signup;