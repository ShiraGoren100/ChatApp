import React, { Component } from "react";
import { Modal } from "bootstrap";
import { BrowserRouter, Routes, Route, Link, withRouter, useNavigate, useLocation, useParams } from 'react-router-dom'
import users from "../users";
import allChats from "../AllChats";
import "./chatScreen.css";
import ContactButton from "./contactButton";
import PersonalizeChat from "./personalChat";
import Message from "./message";
import addContact from "./addContact";
import {useState} from "react"
import AddFile from "./add";
import PopUp from "./popUp";

import Record from "./record";

  

//create personalized chat screen
function Chat() {
     //state of addFile buttun- visible or not
    const [show, setShow] = useState(false);
    //save user name sent from previous window
    var userName = String( window.localStorage.getItem("userName"));

    //create array of all contacts of user
    var contacts = Object.keys(users[userName][2]) || [];

    //get contact map
    var contactMap = users[userName][2];

    //create current addressee
    //var current = users[userName][3];
    
    //open chat
    //var openChat = allChats[contactMap[current]];
    const [user, setUsers] = useState(users);
    var curr = users[userName][3];

    const [current, setCurrent] = useState(curr) ;

    //saved text from textbox
    const [text, setText] = useState('');
    function getText(val) { 
        setText(val.target.value);
    }
    
    // //function to keep chatBox scrooled to the bottom
    // const ScrollToBottom = () => {
    
    //     const element = document.getElementById("starterChatBlock");
    //     if (element !== null) {
    //         element.scrollTop = element.scrollHeight;
    //     }
    // }
    var scrolled = false;

    var lastScrollTop = 0;

    // element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
    window.addEventListener("scroll", function(){ // or window.addEventListener("scroll"....
       var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
       scrolled = true;
    }, false);


    //function to keep chatBox scrooled to the bottom
    const ScrollToBottom = () => {
        if(!scrolled){
            const element = document.getElementById("starterChatBlock");
         if (element !== null) {
            element.scrollTop = element.scrollHeight;
        }
        } 
        scrolled = true;  
    }

    setInterval(ScrollToBottom,50);


    var today = new Date();
    //open chat
    var openChat = allChats[contactMap[curr]];
  
    //save new textMessage 
    const [chat, addText] = useState('');
    const createMessage = e => { 
        e.preventDefault();
        //send text only if it is not empty
        if(text != ''){
            //calculate time
            var curTime = ('0'+today.getHours()).slice(-2) + ':' +  ('0'+today.getMinutes()).slice(-2);
            //add new message to current chat
            allChats[contactMap[users[userName][3]]].push(new Message(text, curTime, userName));
            addText(chat=>[...chat, text]);
            //scroll chat box to bottom
            ScrollToBottom();
            setText(''); //make textBox empty
        }
    }
    function y(){
        document.getElementById("main").style="height:100%";
    }
    //open screen with curr chat open, if curr is not an empty contact
    if(curr !== '') {
        return (
            
            <div class = "bg">


                <div class={"contactblock" }>
                
                {/*loop through contacts and create contact buttons for each*/}
                 {Array.from({ length: contacts.length }).map((_, index) => (
                     <ContactButton name = {users[contacts[index]][1]} user = {userName} 
                     contact = {contacts[index]} image = {users[contacts[index]][4]}
                     func = {setCurrent}></ContactButton> 
                 ))}
                                         
                 </div>
    
            
                <div class={"chatblock"} id="starterChatBlock">

                    {/*loop through chat with current and create chat screen with saved messages*/}
                    {Array.from({ length: allChats[contactMap[users[userName][3]]].length}).map((_, index) => (
                        <div>
                        <PersonalizeChat message={allChats[contactMap[users[userName][3]]][index]} user={userName}> 
                        </PersonalizeChat>
                        </div> 
                    ))}
                   

                </div>
                {/**create text box */}
                <form onSubmit={createMessage}>
                <div class="input-group">
                            <span type = "Button" class="input-group-text" onClick={() => setShow(prev => !prev)}>
                            <i class="bi bi-paperclip"></i></span>
                            {show && <div><AddFile userName={userName} contactMap={contactMap} today =
                             {today} addText={addText} ScrollToBottom={ScrollToBottom}>
                            </AddFile></div>}
                            <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)"
                             placeholder="Type a message" onChange={getText} id={"textBox"} value={text}></input>
                            
                             <input class="input-group-send" type="submit" value="Send"></input>
                             
                </div>
                </form>

                <div class={"adresseeblock"}><h2><img src= {users[users[userName][3]][4]} class = "img">
                </img>&nbsp;&nbsp;{users[users[userName][3]][1]}</h2></div>
                <div class={"userblock"}><h1><img src= {users[userName][4]} class = "img">
                </img>&nbsp;&nbsp;{users[userName][1]}</h1>
                <div class ="positioning">{addContact(userName, setUsers)}</div>
            </div>
            </div>

        );
    }
    //if no contact was clicked on yet open screen with no chats open
    else {
        return(
        <div class = ".container-fluid bg">
      
        <div class={"contactblock" }>
        
        
        {/*loop through contacts and create contact buttons for each*/}
         {Array.from({ length: contacts.length }).map((_, index) => (
             <ContactButton name = {users[contacts[index]][1]} user = {userName} contact = {contacts[index]} image = {users[contacts[index]][4]}
             func = {setCurrent}></ContactButton> 
         ))}
                                 
         </div>

         <div class={"chatblockNoBody"} id="starterChatBlock2"></div>
        <div class={"adresseeblock"}></div>
        <div class={"userblock"}><h1><img src= {users[userName][4]} class = "img"></img>&nbsp;&nbsp;{users[userName][1]}</h1>
        <div class ="positioning">{addContact(userName, setUsers)}</div>
        </div>
        </div>
       
    );       
    }
}
export default Chat;







 