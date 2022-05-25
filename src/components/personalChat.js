import React, { Componen, useEffect } from "react";
import { Modal } from "bootstrap";
import { BrowserRouter, Routes, Route, Link, withRouter, useNavigate, useLocation, useParams } from 'react-router-dom'
import "./chat.css";
import "./chatScreen.css";
import "./contacts.css"
import axios from "axios";


function PersonalizeChat(props){
   
    //if message was written by user- create a user chat box.
   
    if(!props.message.sender){
        return(
      <div class={"mt-1 userChat text-wrap mChat"} >
      {props.message.content}&nbsp; &nbsp;<span class="time">{props.message.sentDate}</span></div>
        );
    }
    return (
        <div class={"mt-1 addresseeChat text-wrap mChat"}>
        {props.message.content}&nbsp;&nbsp; <span class="time">{props.message.sentDate}</span></div>
    );

      
    
}

export default PersonalizeChat