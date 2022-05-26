// import users from "../users";
import React, { Component, useRef, useState,useEffect } from "react";
// import AllChats from "../AllChats";
import number from "./number";
import axios from 'axios'

function random(low, high) {
    return Math.random() * (high - low) + low
}



function Contact(props) {

    const [exist, setExist] = useState(false);
    const [contactList, setList] = useState([]);
    const [first, setFirst] = useState(true);
    const [errorMessages, setErrorMessages] = useState('');
    const [nameID, setID] = useState("");
    const [nickname, setNickname] = useState("");
    const [server, setServer] = useState("");
    const [isError, setError] = useState(false);
    const [status, setStatus] = useState(true);
    const errors = {
        name: "this user name already exists",
    };



    useEffect(() => {
        if (props.connection) {
            props.connection.start()
                .then(result => {
                    console.log('Connected!');

                    props.connection.on('AddContact', (me, contact) => {
                        console.log(me);
                        console.log(contact);
                        
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [props.connection]);

    const fetchValidity = (name) => {
        console.log(name);
        fetch('https://localhost:7188/api/Contacts/exists?c_id=' + name)
            .then((response) => response.json())
            .then(
                setExist(true)
            );
    }

    const getContacts = () => {
        //console.log(name);
        console.log('getting new contactList');
        fetch('https://localhost:7188/api/Contacts?m_id=' + props.userName)
            .then((response) => response.json())
            .then(cont => {
                setList(cont);
                setFirst(false);
            });;

        //this.props.setFunction(this.state.contacts); 
    }

    const alreadyAContact = (value, contactLis) => {
        {/*loop through contacts and create contact buttons for each*/ }
        let i = 0;
        for (; i < contactLis.length; i++) {
            if (contactLis[i].id == value) {
                return true;
            }
        }
        return false;
    };

    const setNick = (event) => {
        const { nickname, value } = event.target;
        setNickname(value);
    };
    const setser = (event) => {
        const { server, value } = event.target;
        setServer(value);
    };
    const formObject = (event) => {
        //console.log(this.props.contactList);
        //console.log(this.state.contacts);
        event.preventDefault();
        const { name, value } = event.target;
        // let error = { ...this.state.error };
        fetchValidity(value);
        getContacts();

        switch (name) {
            case "name":
                if (value === '') {
                    setErrorMessages({ name: "name", message: "" });
                    setError(false);
                    break
                }
                //need to make query- check if person exists on server
                //  if(!this.state.yes){error.name ="this user name does not exist"; break;}
                if (alreadyAContact(value, props.contactList)) {
                    setErrorMessages({ name: "name", message: errors.name });
                    setError(true);
                }
                else {
                    setErrorMessages({ name: "name", message: "" });
                    setError(false);
                }
                break;
            default:
                break;
        }

        setList(props.contactList);
        setID(value);

        setFirst(false);
        // this.setState({
        //     error,
        //     [name]: value,
        //     contacts: this.props.contactList,
        //     first: false
        // })

        //this.props.setFunction(this.state.contacts); 
    };

    const OnFormSubmit = (event) => {
        event.preventDefault();
        console.log(first);

        if (isError == true) {
            event.preventDefault();
            console.log("log");
            return;
        }

        axios.post('https://localhost:7188/api/Contacts?m_id=' +
            props.userName + '&c_id=' + nameID + '&name=' + nickname +
            '&server=' + server).then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
                setStatus(false);
            });


        if (status) {
            //change server to my server
            axios.post(server + '/api/Invitations?from=' + props.userName + '&to=' + nameID +
                '&server=https%3A%2F%2Flocalhost%3A7188').catch(function (error) {
                    console.log(error);
                    setStatus(false);
                });
        }
        if (!status) {
            console.log("somthing went wrong with other server");
        }
        else {
            //close here modal.
            //window.location.reload(false);
            getContacts();

            //this.props.setFunction(this.state.contacts); 
            setID('');
            setNickname('');
            setServer('');

            //make textBox empty     
            props.closeBox.current.click();

            //window.location.reload(false);
        }
    };

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    // render()
    {
        let c = props.closeBox;
        // const { error } = this.state;
        if (first) {
            props.setFunction(props.contactList);
        } else {
            props.setFunction(contactList);
        }

        return (
            <div>
                <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" ><i class="bi bi-person-plus"></i></button>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Add new contact</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form onSubmit={OnFormSubmit}>
                                <div class="modal-body">

                                    <div class="mb-3">
                                        <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter contact's id" required
                                            name="name"
                                            value={nameID}
                                            onChange={formObject}
                                            className={isError ? "is-invalid form-control" : "form-control"} />
                                        {renderErrorMessage("name")}
                                        {isError && (
                                            <span className="invalid-feedback, medFont">{errors.name}</span>
                                        )}
                                    </div>

                                    <div class="mb-3">
                                        <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter contact's nickname" required
                                            name="nickname"
                                            value={nickname}
                                            onChange={setNick}
                                        // className={errors.nickname.length > 0 ? "is-invalid form-control" : "form-control"} 
                                        />

                                        {/* {error.nickname.length > 0 && (
                                            <span className="invalid-feedback, medFont">{error.nickname}</span>
                                        )} */}
                                    </div>

                                    <div class="mb-3">
                                        <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter contact's server" required
                                            name="server"
                                            onChange={setser}
                                            value={server}
                                        // className={error.nickname.length > 0 ? "is-invalid form-control" : "form-control"}
                                        />

                                        {/* {error.nickname.length > 0 && (
                                            <span className="invalid-feedback, medFont">{error.nickname}</span>
                                        )} */}
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" ref={c}>Close</button>
                                    <button type="submit" class="btn btn-primary">Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        );
    };
}
function AddContact(props, props2, props3) {
    let closeBox = useRef(undefined);
    let userName = props;
    let setFunction = props2;
    let contactList = props3;

    return <Contact {...props} userName={userName} setFunction={setFunction}
        contactList={contactList} con closeBox={closeBox} />
}

export default AddContact;
