import React, {useState} from "react";
import {Button, Input, Modal} from "@material-ui/core";
import {db, storage} from "../firebase";
import firebase from "firebase";
import {makeStyles} from "@material-ui/core/styles";
import "../ImageUpload.css";

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
        width: 280,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


const ImageUpload=({username})=>{
    const classes=useStyles();
    const [modalStyle]=React.useState(getModalStyle);
    const [caption,setCaption]=useState('');
    const [image,setImage]=useState(null);
    const [progress,setProgress]=useState(0);
    const [openUpload,setOpenUpload]=useState(false);

    const handleUpload=()=>{
        const uploadTask= storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot)=>{
                const progress=Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes)*100
                );
                setProgress(progress);
            },
            (error)=>{
                console.log(error);
                alert(error.message);
            },
            ()=>{
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url=>{
                        db.collection("posts").add({
                            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl:url,
                            username:username
                        });
                        setProgress(0);
                        setCaption('');
                        setImage(null);
                        setOpenUpload(false);
                    })
            }
        );
    }

    return(
        <div>
            <Modal
                open={openUpload}
                onClose={()=>setOpenUpload(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <div className="image-upload">
                    <img
                        className="app-header-image"
                        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                        alt="logo"
                    />
                    <progress value={progress} max="100" className="image-upload-progress"/>
                    <Input type="text" placeholder="Enter a caption.." value={caption} onChange={event => setCaption(event.target.value)}/><br/>
                    <Input type="file" onChange={event => setImage(event.target.files[0])}/><br/>
                    <Button onClick={handleUpload}>
                        Upload
                    </Button>
                    </div>
                </div>
            </Modal>
            <Button onClick={()=>setOpenUpload(true)}>Upload</Button>
        </div>
    )
}

export default ImageUpload;