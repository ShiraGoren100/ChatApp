import React, { Component, useEffect, useRef, useState } from "react";
import { Modal, Button } from "bootstrap";
import { BrowserRouter, Routes, Route, Link, withRouter, useNavigate, useLocation, useParams} from 'react-router-dom'
import users from "../users";
import allChats from "../AllChats";
import "./chatScreen.css";
import ContactButton from "./contactButton";
import PersonalizeChat from "./personalChat";
import Message from "./message";
import addContact from "./addContact";
import placeholder from "./webClient4.jpg";
import "./add.css"
import Snap from "./takePic";
import Record from "./record";
import RecordMessage from "./popUp";
//import 'bootstrap/dist/css/bootstrap.min.css';


//  <button type="button" class="btn btn-secondaryyy" ><i class="bi bi-camera"></i></button>

function AddFile(props){

    const [stream, setStream] = useState({
        access: false,
        recorder: null,
        error: ""
      });
    
      const [recording, setRecording] = useState({
        active: false,
        available: false,
        url: ""
      });
    
      const chunks = useRef([]);
    
      function getAccess(callback) {
        navigator.mediaDevices
          .getUserMedia({ audio: true })
          .then((mic) => {
            let mediaRecorder;
    
            try {
              mediaRecorder = new MediaRecorder(mic, {
                mimeType: "audio/webm"
              });
            } catch (err) {
              console.log(err);
            }
    
            const track = mediaRecorder.stream.getTracks()[0];
            track.onended = () => console.log("ended");
    
            mediaRecorder.onstart = function () {
              setRecording({
                active: true,
                available: false,
                url: ""
              });
            };
    
            mediaRecorder.ondataavailable = function (e) {
              console.log("data available");
              chunks.current.push(e.data);
            };
    
            mediaRecorder.onstop = async function () {
              console.log("stopped");
    
              const url = URL.createObjectURL(chunks.current[0]);
              chunks.current = [];
    
              setRecording({
                active: false,
                available: true,
                url
              });
            };
    
            setStream({
              ...stream,
              access: true,
              recorder: mediaRecorder
            });
          })
          .catch((error) => {
            console.log(error);
            setStream({ ...stream, error });
          });
          function handleClick(){
              callback(recording.url);
          }
      }
    
      function rec(){
        console.log('rec');
      }  
    
    const [snapPhoto, setSnapPhoto] = useState(false);
      
    // This function will be triggered when the file field change
    const photoChange = () => {
        console.log("in");
        console.log(!snapPhoto);
        setSnapPhoto(!snapPhoto);
      };
  
    const [selectedImage, setSelectedImage] = useState();
    const [isNew, setNew] = useState(true);
    
  
    // This function will be triggered when the file field change
    const imageChange = (e) => {
      console.log("imageChange");
      if (e.target.files && e.target.files.length > 0) {
        setSelectedImage(e.target.files[0]);
        e.target.value = null;
      }
    };
  
    // This function will be triggered when the Remove Image button is clicked
    const removeSelectedImage = () => {
      setSelectedImage(null);
     console.log(selectedImage);
    };

    const removeSnappedImage=()=>{
        //setSnapPhoto();
        photoChange()
    }

    //this function adds new message with video to list of messages
    const sendVid = () => {
        console.log("in sendVid");
        var url=selectedVideo;
        setSelectedVideo(); //clear selectVideo state

       //calculate time
       var curTime = ('0'+props.today.getHours()).slice(-2) + ':' +  ('0'+props.today.getMinutes()).slice(-2);
       //create new message and add url of img to it
       var m = new Message(text, curTime, props.userName)
       m.setVid(url);
       //add new message to current chat
       allChats[props.contactMap[users[props.userName][3]]].push(m);
       props.addText(chat=>[...chat, text]);//change state of messages
       //scroll chat box to bottom
       props.ScrollToBottom();
       setText(''); //make textBox empty
            
    };

    //this function adds new message with image to list of messages
    const sendImg = () => {
        var url = URL.createObjectURL(selectedImage); //save img url
        setSelectedImage(); //clear selectImage state
        

       //calculate time
       var curTime = ('0'+props.today.getHours()).slice(-2) + ':' +  ('0'+props.today.getMinutes()).slice(-2);
       //create new message and add url of img to it
       var m = new Message(text, curTime, props.userName)
       m.setImg(url);
       //add new message to current chat
       allChats[props.contactMap[users[props.userName][3]]].push(m);
       props.addText(chat=>[...chat, text]);//change state o fmessages
       //scroll chat box to bottom
       props.ScrollToBottom();
       setText(''); //make textBox empty
            
    };

    //function invoked when photo was taken and then sent
    // const sendPhoto=()=>{
    //     var url = photoRef; //save img url
    //     //photoChange(); //clear selectImage state
    //     console.log(url);
    //    //calculate time
    //    var curTime = ('0'+props.today.getHours()).slice(-2) + ':' +  ('0'+props.today.getMinutes()).slice(-2);
    //    //create new message and add url of img to it
    //    var m = new Message(text, curTime, props.userName)
    //    m.setImg(url);
    //    //add new message to current chat
    //    allChats[props.contactMap[users[props.userName][3]]].push(m);
    //    props.addText(chat=>[...chat, text]);//change state o fmessages
    //    //scroll chat box to bottom
    //    props.ScrollToBottom();
    //    setText(''); //make textBox empty
    //    removeSnappedImage();
    // }

      //saved text from textbox
      const [text, setText] = useState('');
      function getText(val) { 
          setText(val.target.value);
      }

      //create state for video
      const inputRef = React.useRef();
      const [selectedVideo, setSelectedVideo] = React.useState();
    
      //this funcitn will handle a video uploaded
      const handleFileChange = (event) => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        setSelectedVideo(url);
        event.target.value = null;
      };      
    // This function will be triggered when the Remove Video button is clicked
    const removeSelectedVideo = () => {
        setSelectedVideo();
      };

    //   let videoRef = useRef(null);
    //   let photoRef = useRef(null);
     
    //   //gat access to camera
    //  const getUserCamera=()=>{
    //      navigator.mediaDevices.getUserMedia({
    //          video:true
    //      })
    //      .then((stream)=>{
    //          //attach stream to video
    //          let video = videoRef.current
    //          video.srcObject = stream
    //          video.play() 
    //      })
    //      .catch((error)=>{
    //          console.error(error)
    //      })
    //  }

    // //  useEffect(() => {
    // //     const getUserMedia = async () => {
    // //       try {
    // //         const stream = await navigator.mediaDevices.getUserMedia({video: true});
    // //         videoRef.current.srcObject = stream;
    // //       } catch (err) {
    // //         console.log(err);
    // //       }
    // //     };
    // //     getUserMedia();
    // //   }, []);
    
  
    //  const takePicture=()=>{
    //      let width=500
    //      let height=500
    //      let photo = photoRef.current
    //      let video = videoRef.current
  
    //      photoRef.width = width
    //      photoRef.height = height
  
    //      let ctx = photo.getContext('2d')
    //      ctx.drawImage(video, 0, 0, photo.width, photo.height)
         
    //  }
  
    //   useEffect(()=>{
    //       getUserCamera();
    //   }, [videoRef]);
  
    // function rec(){
    //   return(
    //     <div className="App">
    //     {stream.access ? (
    //       <div className="audio-container">
    //         <button
    //           className={recording.active ? "active" : null}
    //           onClick={() => !recording.active && stream.recorder.start()}
    //         >
    //           Start Recording
    //         </button>
    //         <button onClick={() => stream.recorder.stop()}>Stop Recording</button>
    //         {recording.available && <audio controls src={recording.url} />}
    //       </div>
    //     ) : (
    //       <button onClick={getAccess}>Get Mic Access</button>
    //     )}
    //   </div>
    //   )
    // }

    
    
   
    //   function rec() {
    //     const [show, setShow] = useState(false);
    //     const handleClose = () => setShow(false);
    //     const handleShow = () => setShow(true);
    //   return (
    //     <div>
    //     <Button className="nextButton" onClick={handleShow}>
    //     <i class="bi bi-mic"></i>
    //     </Button>
    //       <Modal show={show} onHide={handleClose} size="sm">
    //         <Modal.Header closeButton>
    //           <Modal.Title>Record a message</Modal.Title>
    //         </Modal.Header>
    //         <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
    //         <Modal.Footer>
    //           <Button variant="secondary" onClick={handleClose}>
    //             Close
    //           </Button>
    //           <Button variant="primary" onClick={handleClose}>
    //             Save Changes
    //           </Button>
    //         </Modal.Footer>
    //       </Modal>
    //     </div>
    //   );
    // }
  
//    <div class={"mt-1 userChat text-wrap"} ><img src={url} class = "img"></img>&nbsp; &nbsp;<span class="time">11:00</span></div>
   
// <label htmlFor="photo" className="form-img__file-label">
// <svg width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="#56ceef" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
//     <circle cx="12" cy="10" r="3" />
//     <circle cx="12" cy="12" r="10" />
// </svg>
// </label>
// <img src={src} alt={alt} className="form-img__img-preview"/>


// <button type="button" class="btn btn-secondaryyy" onClick={}><i class="bi bi-camera-reels"></i></button>
   return(

  
    //pannel of icon buttons to add different types of files
    <div class="btn-group" role="group" aria-label="Basic example" id ="addBar">
    {/**add photo */}
    <input
    type="file"
    accept="image/*"
    style={{ display: 'none' }}
    id="contained-button-file"
    class="btn btn-secondaryyy"
    onChange={imageChange}
    />
    <label htmlFor="contained-button-file" class="btn btn-secondaryyy">
    <div class="Button" variant="contained" color="primary" component="span">
    <i class="bi bi-image"></i>
    </div>
    </label>
     {/**show preview of img */}
    <div calss = "chatBlock">{selectedImage && (
        <div style={styles.preview}>
          <img
            src={URL.createObjectURL(selectedImage)}
            style={styles.image}
            alt="Thumb"
          />
           {/**remove photo */}
          <button onClick={removeSelectedImage} style={styles.delete}>
          <i class="bi bi-x-lg"></i>
          </button>
           {/**send photo*/}
           <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)"
           placeholder="Type a message" onChange={getText} id={"ImgtextBox"} value={text} style={styles.send}></input>
           <button class="input-group-send" type="submit" onClick={sendImg} style={styles.send}><i class="bi bi-send"></i></button>
        </div>
      )}
   </div>

   {/**add video */}
   <input
        ref={inputRef}
        className="VideoInput_input"
        type="file"
        accept=".mov,.mp4"
        style={{ display: 'none' }}
        id="contained-button-file-v"
        class="btn btn-secondaryyy"
        onChange={handleFileChange}
   />
   <label htmlFor="contained-button-file-v" class="btn btn-secondaryyy">
   <div class="Button" variant="contained" color="primary" component="span">
   <i class="bi bi-camera-reels"></i>
   </div>
   </label>
    {/**show preview of video*/}
   <div calss = "chatBlock">{selectedVideo && (
       <div style={styles.previewVid}>
       {selectedVideo && (
        <video
          className="VideoInput_video"
          style={styles.video}
          controls
          src={selectedVideo}
        />
      )}
          {/**remove video */}
         <button onClick={removeSelectedVideo} style={styles.delete}>
         <i class="bi bi-x-lg"></i>
         </button>
          {/**send video*/}
          <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)"
          placeholder="Type a message" onChange={getText} id={"vidtextBox"} value={text} style={styles.send}></input>
          <button class="input-group-send" type="submit" onClick={sendVid} style={styles.send}><i class="bi bi-send"></i></button>
       </div>
     )}
  </div>
    
   
   
   
   {/**record a message */}
   <RecordMessage userName={props.userName} today={props.today} 
   contactMap={props.contactMap} addText={props.addText}
    ScrollToBottom={props.ScrollToBottom}></RecordMessage>

    

   
    {/**snap a photo */}
    
    <button htmlFor="contained-button-file-snap" class="btn btn-secondaryyy" onClick = {photoChange}>
    <div class="Button" variant="contained" color="primary" component="span">
    <i class="bi bi-camera"></i>
    </div>
    </button>
     {/**show preview of img */}
    





  </div>
  );


  

   }
// }
export default AddFile


// <button type="button" class="btn btn-secondaryyy" onClick={rec}><i class="bi bi-mic"></i></button>

// <div calss = "chatBlock">{snapPhoto && (
//     <div style={styles.preview}>
//     <div className= "container">
//     <video className='container' ref={videoRef}></video>
//     <button onClick={takePicture}>Take selfie</button>
//     <canvas ref={photoRef}></canvas>
//     </div>
//        {/**remove photo */}
//       <button onClick={removeSnappedImage} style={styles.delete}>
//       <i class="bi bi-x-lg"></i>
//       </button>
//        {/**send photo*/}
//        <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)"
//        placeholder="Type a message" onChange={getText} id={"cameratextBox"} value={text} style={styles.send}></input>
//        <button class="input-group-send" type="submit" onClick={sendPhoto} style={styles.send}><i class="bi bi-send"></i></button>
//     </div>
//   )}
// </div>


  
  // Just some styles
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 50,
       maxWidth: "100%", maxHeight: 320,
    },
    preview: {
     marginTop: 50,
      display: "flex",
     flexDirection: "column",
    },
    image: { maxWidth: "100%", maxHeight: 320 },
    delete: {
      cursor: "pointer",
      padding: 15,
      background: "none",
      color: "none",
      border: "none",
      width: 150,
      height: 50,
    
    },
    send: {
        cursor: "pointer",
        padding: 15,
        background: "none",
        color: "none",
        border: "none",
        width: 150,
        height: 50,
      
      },
      previewVid: {
        marginTop: 50,
         display: "flex",
        flexDirection: "column",
       },
       video: { maxWidth: "100%", maxHeight: 320 },
  };