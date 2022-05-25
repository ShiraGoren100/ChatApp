import React, { Component, useEffect, useState } from "react";
import { Modal } from "bootstrap";
import { BrowserRouter, Routes, Route, Link, withRouter, useNavigate, useLocation, useParams } from 'react-router-dom'
//import users from "../users";
import "./contacts.css";
import PersonalizeChat from "./personalChat";
//import AllChats from "../AllChats";
import axios from 'axios'


//function changes current contact with open chat
async function handleClick(user, contact, func){
    //put contact as current one
    await axios.post('https://localhost:7188/api/Contacts/current?m_id='+user+'&c_id='+contact.id);
    func(contact);
    // console.log("done");
  }


//create spesofoc contact button
function ContactButton(props) {

    //create button of contact that on click opens chat with this person
    if (props.contact.current == null) {
      return(
        <div>
        <button class={"contactButton"} onClick={()=>{handleClick(props.user, props.contact,props.func)}} >
        <span class = "smallFont"><span class = "time2">{props.contact.lastDate}</span></span>
        <div class="mss">
        <span class=".imageContact"></span> &nbsp;&nbsp;&nbsp;
        <div>
       
        <p class="u">
        {props.contact.name}
        </p>
        <p class = "smallFont">
        {props.contact.last}
        </p>
        </div>
        </div>
         </button>
        </div> 
       ) ;

//for if we want chat to open to last person we chated with
    } else {
      return(
        <div>
        <button class={"contactButton"} onClick={()=>{handleClick(props.user, props.contact,props.func)}} >
        <div class="mss">
        <span class=".imageContact"></span> &nbsp;&nbsp;&nbsp;
        <div>
        <p class="u">
        {props.contact.name}
        </p>
        </div>
        </div>
         </button>
        </div> 
       ) ;
    }
    
}

export default ContactButton;