import React, { Component } from "react";
import { Modal } from "bootstrap";
import { BrowserRouter, Routes, Route, Link, withRouter, useNavigate, useLocation, useParams } from 'react-router-dom'
import users from "../users";
import "./chat.css";
import "./chatScreen.css";
import "./contacts.css"
import Message from "./message";


function PersonalizeChat(props){
   
    //if message was written by user- create a user chat box.
    if(props.message.writer == props.user){
        //if message includes an Img
        if(props.message.hasImg){
           return (<div class={"mt-1 userChat text-wrap mChat"} >
           <img src={props.message.getUrl} class = "sentImg">
           </img>{props.message.getText}<span class="time">{props.message.getTime}</span></div>); 
        }
        //if message includes a recording
        if(props.message.hasRec){
            return (<div class={"mt-1 userChat text-wrap mChat"} >
            <audio controls src={props.message.getUrl} />
            <span class="time">{props.message.getTime}</span></div>); 
         }
         //if message includes a video
         if(props.message.hasVid){
            return (<div class={"mt-1 userChat text-wrap mChat"} >
            <video className="VideoInput_video"  controls src={props.message.getUrl}  class = "sentImg"/>
            {props.message.getText}<span class="time">{props.message.getTime}</span></div>); 
         }

          //if message includes a photo
          if(props.message.hasPhoto){
            return (<div class={"mt-1 userChat text-wrap mChat"} >
            <canvas ref={props.message.getUrl}></canvas>
            {props.message.getText}<span class="time">{props.message.getTime}</span></div>); 
         }

        return(
      <div class={"mt-1 userChat text-wrap mChat"} >
      {props.message.getText}&nbsp; &nbsp;<span class="time">{props.message.getTime}</span></div>
        );
    }
    
    //if message was written by contact- create a contact chat box.
    if(props.message.hasImg){
        return (<div class={"mt-1 addresseeChat text-wrap mChat"} >
        <img src={props.message.getUrl} class = "sentImg">
        </img> {props.message.getText}<span class="time">{props.message.getTime}</span></div>); 
    }
     //if message includes a recording
     if(props.message.hasRec){
        return (<div class={"mt-1 addresseeChat text-wrap mChat"} >
        <audio controls src={props.message.getUrl} />
        <span class="time">{props.message.getTime}</span></div>); 
     }
    //if message includes a video
    if(props.message.hasVid){
        return (<div class={"mt-1 addresseeChat text-wrap mChat"} >
        <video className="VideoInput_video"  controls src={props.message.getUrl}  class = "sentImg"/>
        {props.message.getText}<span class="time">{props.message.getTime}</span></div>); 
     }
      //if message includes a photo
      if(props.message.hasPhoto){
        return (<div class={"mt-1 addresseeChat text-wrap mChat"}>
        <canvas ref={props.message.getUrl}></canvas>
        {props.message.getText}<span class="time">{props.message.getTime}</span></div>); 
     }
    return (
        <div class={"mt-1 addresseeChat text-wrap mChat"}>
        {props.message.getText}&nbsp;&nbsp; <span class="time">{props.message.getTime}</span></div>
    );

      
    
}

export default PersonalizeChat