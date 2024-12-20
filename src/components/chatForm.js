import React, { useEffect, Component, useRef } from "react";
import { Modal } from "bootstrap";
import { BrowserRouter, Routes, Route, Link, withRouter, useNavigate, useLocation, useParams } from 'react-router-dom'
//  import users from "../users";
import "./chatScreen.css";
import ContactButton from "./contactButton";
import PersonalizeChat from "./personalChat";
import addContact from "./AddContacts";
import { useState } from "react"
import axios from 'axios'
import { HubConnectionBuilder } from '@microsoft/signalr';

import { ConsoleLogger } from "@microsoft/signalr/dist/esm/Utils";



//create personalized chat screen
function Chat() {
    //save user name sent from previous window
    var userName = String(window.localStorage.getItem("userName"));

    const [connection, setConnection] = useState(null);
    const [chat1, setChat] = useState([]);
    const latestChat = useRef(null);

    latestChat.current = chat1;

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:7188/hubs/myHub')
            .withAutomaticReconnect()
            .build();
        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');

                    connection.on('ReceiveMessage', (me, contact, message) => {
                        console.log(contact);
                        console.log(message);
                        addText(chatq => [...chatq, message]);
                        //getOpenChat(curr);
                        getstuff(contact);
                        console.log(curr);

                        //scroll chat box to bottom
                        ScrollToBottom();
                        setText('');
                    });

                    connection.on('AddContact', (me, contact) => {
                        console.log(me);
                        console.log(contact);
                        getContacts(contact);
                    });

                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);


    //get userPerson
    const [userPerson, setUserPerson] = useState([]);

    useEffect(
        async () => {
            console.log("setting user");
            const res = await fetch('https://localhost:7188/api/Contacts/p?c_id=' + userName);
            const data = await res.json();
            setUserPerson(data);
            console.log("end user");
        }, []);

    //get contacts
    const [contactList, setList] = useState([]);

    useEffect(
        async () => {
            console.log("setting contacts");
            const res = await fetch('https://localhost:7188/api/Contacts?m_id=' + userName);
            const data = await res.json();
            setList(data);
            console.log("end contacts");
        }, []);



    //get current
    const [curr, setcurr] = useState([]);

    useEffect(
        async () => {
            console.log("initializing curr");
            console.log(curr);

            const res = await fetch('https://localhost:7188/api/Contacts/current?m_id=' + userName);
            const data = await res.json();
            setcurr(data);
            console.log("end curr");
            console.log(curr);
        }, []);

    //open chat
    const [openChat, setopenChat] = useState([]);

    useEffect(
        async () => {
            console.log("setting open");
            console.log(curr);
            const res = await fetch('https://localhost:7188/api/Contacts/' + curr.id + '/messages?m_id=' + userName);
            const data = await res.json();
            setopenChat(data);
        }, []);

    async function getContacts(c) {
        const res = await fetch('https://localhost:7188/api/Contacts?m_id=' + userName);
        const data = await res.json();
        setList(data);
    }

    async function getstuff(c) {
        const res = await fetch('https://localhost:7188/api/Contacts/' + c + '/messages?m_id=' + userName);
        const data = await res.json();
        setopenChat(data);
        console.log(openChat);
    }

    async function getOpenChat(c) {
        setcurr(c);
        console.log(curr);
        const res = await fetch('https://localhost:7188/api/Contacts/' + c.id + '/messages?m_id=' + userName);
        const data = await res.json();
        setopenChat(data);
        console.log(openChat);
        console.log(curr);
    }


    //state of addFile buttun- visible or not
    const [show, setShow] = useState(false);

    // //get conversation dictionary
    // var contactMap = users[userName][2];

    //create current addressee
    //var current = users[userName][3];

    //open chat
    //var openChat = allChats[contactMap[current]];
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    const [user, setUsers] = useState();



    //saved text from textbox
    const [text, setText] = useState('');
    function getText(val) {
        setText(val.target.value);
    }

    // //function to keep chatBox scrooled to the bottom
    var scrolled = false;

    var lastScrollTop = 0;

    // element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
    window.addEventListener("scroll", function () { // or window.addEventListener("scroll"....
        var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
        scrolled = true;
    }, false);


    //function to keep chatBox scrooled to the bottom
    const ScrollToBottom = () => {
        if (!scrolled) {
            const element = document.getElementById("starterChatBlock");
            if (element !== null) {
                element.scrollTop = element.scrollHeight;
            }
        }
        scrolled = true;
    }

    setInterval(ScrollToBottom, 50);


    var today = new Date();
    //const [last, setLast] = useState(true);

    //save new textMessage 
    const [chat, addText] = useState('');
    async function createMessage(e) {
        e.preventDefault();
        //send text only if it is not empty
        if (text != '') {
            //calculate time
            // var curTime = ('0'+today.getHours()).slice(-2) + ':' +  ('0'+today.getMinutes()).slice(-2);
            //add new message to current chat

            //allChats[contactMap[users[userName][3]]].push(new Message(text, curTime, userName));
            axios.post('https://localhost:7188/api/Contacts/' + curr.id + '/messages?m_id=' + userName + '&content=' + text);
            axios.post(curr.server + 'api/Transfer?from=' + userName + '&to=' + curr.id + '&content=' + text);
            console.log("posted");
            console.log(curr);
            addText(chat => [...chat, text]);
            getOpenChat(curr);
            //setLast(!last);
            //scroll chat box to bottom
            ScrollToBottom();
            setText(''); //make textBox empty
        }
    }
    function y() {
        document.getElementById("main").style = "height:100%";
    }
    //open screen with curr chat open, if curr is not an empty contact
    if (curr.id != "null") {
        return (
            <div class="bg">
                <div class={"contactblock"}>
                    {/*loop through contacts and create contact buttons for each*/}
                    {Array.from({ length: contactList.length }).map((_, index) => (
                        <ContactButton contact={contactList[index]} user={userName}
                            func={getOpenChat}></ContactButton>
                    ))}
                </div>

                <div class={"chatblock"} id="starterChatBlock">
                    {/*loop through chat with current and create chat screen with saved messages*/}
                    {Array.from({ length: openChat.length }).map((_, index) => (
                        <div>
                            <PersonalizeChat message={openChat[index]} user={userName}>
                            </PersonalizeChat>
                        </div>

                    ))}
                </div>
                {/**create text box */}
                <form onSubmit={createMessage}>
                    <div class="input-group">
                        <span type="Button" class="input-group-text" onClick={() => setShow(prev => !prev)}>
                            <i class="bi bi-paperclip"></i></span>
                        {show}
                        <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)"
                            placeholder="Type a message" onChange={getText} id={"textBox"} value={text}></input>

                        <input class="input-group-send" type="submit" value="Send"></input>

                    </div>
                </form>
                {/**create adressee block */}
                {/**####################################################################################### */}
                <div class={"adresseeblock"}><h2>&nbsp;&nbsp;{curr.name}</h2></div>
                <div class={"userblock smallFont"}><h1>&nbsp; &nbsp; &nbsp;{userPerson.nickName}</h1>

                    <div class="positioning">{addContact(userName, setList, contactList, connection)}</div>

                </div>
            </div>
        );
    }
    //if no contact was clicked on yet open screen with no chats open
    else {
        return (
            <div class=".container-fluid bg">
                <div class={"contactblock"}>
                    {/*loop through contacts and create contact buttons for each*/}
                    {Array.from({ length: contactList.length }).map((_, index) => (
                        <ContactButton contact={contactList[index]} user={userName}
                            func={getOpenChat}></ContactButton>
                    ))}
                </div>
                <div class={"chatblockNoBody"} id="starterChatBlock2"></div>
                <div class={"adresseeblock"}></div>
                <div class={"userblock"}><h1>&nbsp;&nbsp;{userPerson.nickName}</h1>
                    <div class="positioning">{addContact(userName, setList, contactList)}</div>
                </div>
            </div>
        );
    }
}
export default Chat;






