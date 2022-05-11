import React, { Component } from "react";
import { Modal } from "bootstrap";
import { BrowserRouter, Routes, Route, Link, withRouter, useNavigate, useLocation, useParams } from 'react-router-dom'
import users from "../users";
import "./contacts.css";
import PersonalizeChat from "./personalChat";
import AllChats from "../AllChats";


//function changes current contact with open chat
function handleClick(user, contact, func){
    users[user][3] = contact;
    func(contact); 
    console.log("done");
  }


//create spesofoc contact button
function ContactButton(props) {
    //create button of contact that on click opens chat with this person
    if (AllChats[users[props.user][2][props.contact]][AllChats[users[props.user][2][props.contact]].length -1]) {
      return(
        // <div>
        // <button class={"contactButton"} onClick={()=>{handleClick(props.user, props.contact,props.func)}} ><img src={props.image} class = "img"></img> &nbsp;&nbsp;<span class="u">{props.name}</span>
        // <span class = "smallFont"><span class = "time2">{AllChats[users[props.user][2][props.contact]][AllChats[users[props.user][2][props.contact]].length -1].time}</span>
        // &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {AllChats[users[props.user][2][props.contact]][AllChats[users[props.user][2][props.contact]].length -1].text}</span>
        //  </button>
        // </div> 
        <div>
        <button class={"contactButton"} onClick={()=>{handleClick(props.user, props.contact,props.func)}} >
        <span class = "smallFont"><span class = "time2">{AllChats[users[props.user][2][props.contact]][AllChats[users[props.user][2][props.contact]].length -1].time}</span></span>
        <div class="mss">
        <span class=".imageContact"><img src={props.image} class = "img"></img></span> &nbsp;&nbsp;&nbsp;
        <div>
       
        <p class="u">
        {props.name}
        </p>
        <p class = "smallFont">
        {AllChats[users[props.user][2][props.contact]][AllChats[users[props.user][2][props.contact]].length -1].text}
        </p>
        </div>
        </div>
         </button>
        </div> 
       ) ;

    } else {
      return(
        // <div>
        // <button class={"contactButton"} onClick={()=>{handleClick(props.user, props.contact,props.func)}} ><img src={props.image} class = "img"></img> &nbsp; &nbsp;{props.name}
        //  </button>
        // </div> 
        <div>
        <button class={"contactButton"} onClick={()=>{handleClick(props.user, props.contact,props.func)}} >
        <div class="mss">
        <span class=".imageContact"><img src={props.image} class = "img"></img></span> &nbsp;&nbsp;&nbsp;
        <div>
        <p class="u">
        {props.name}
        </p>
        </div>
        </div>
         </button>
        </div> 
       ) ;
    }
    
}

export default ContactButton;