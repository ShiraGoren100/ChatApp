
//import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import React, { useState, useRef } from "react";
//import "./styles.css";
import users from "../users";
import allChats from "../AllChats";
import Message from "./message";

export default function RecordMessage(props) {

       //this function adds new message with video to list of messages
       const sendRec = () => {
        if (!recording.active && newRec){
            console.log("in sendRec");
        var url=recording.url;
       // setSelectedVideo(); //clear selectVideo state

       //calculate time
       var curTime = ('0'+props.today.getHours()).slice(-2) + ':' +  ('0'+props.today.getMinutes()).slice(-2);
       //create new message and add url of img to it
       var m = new Message('', curTime, props.userName)
       m.setVid(url);
       //add new message to current chat
       allChats[props.contactMap[users[props.userName][3]]].push(m);
       props.addText(chat=>[...chat, '']);//change state of messages
       //scroll chat box to bottom
       props.ScrollToBottom();
       handleClose()  
       setNewRec(false);
        }
    };


  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    }
  const handleShow = () => setShow(true);


  const [stream, setStream] = useState({
    access: false,
    recorder: null,
    error: ""
  });
  const [newRec, setNewRec] = useState(false);
  
 
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

  function recorder(){
    !recording.active && stream.recorder.start();
    setNewRec(true);
  }


  return (
    <div>
      <button type="button" class="btn btn-secondaryyy" onClick={handleShow}>
      <i class="bi bi-mic"></i>
      </button>

      <Modal show={show} onHide={handleClose} size="sm">
        <Modal.Header closeButton>
          <Modal.Title>Record a message</Modal.Title>
        </Modal.Header>
        <Modal.Body>  <div className="App">
        {stream.access ? (
          <div className="audio-container">
            <button  
             class="btn btn-outline-success"
              onClick={recorder}
             
            >
              Start Recording
            </button>
            <button class="btn btn-outline-danger" onClick={() => stream.recorder.stop()}>Stop Recording</button>
          </div>
        ) : (
          <button class="btn btn-outline-primary" onClick={getAccess}>Get Mic Access</button>
        )}
      </div></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={sendRec}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

