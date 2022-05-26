// import users from "../users";
import React, { Component, useRef, useState } from "react";
// import AllChats from "../AllChats";
import number from "./number";
import axios from 'axios'

function random(low, high) {
    return Math.random() * (high - low) + low
}



class Contact extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            first: true,
            yes: false,
            contacts: [],
            name: '',
            nickname: '',
            server: '',
            sucssess: 'true',
            error: {
                name: '',
                nickname: '',
                server: ''
            }
        }

    }
    fetchValidity = (name) => {
        console.log(name);
        fetch('https://localhost:7188/api/Contacts/exists?c_id=' + name)
            .then((response) => response.json())
            .then(existing => {
                this.setState({
                    yes: existing
                })
            });
    }

    getContacts=()=>{
        //console.log(name);
        console.log('getting new contactList');
        fetch('https://localhost:7188/api/Contacts?m_id='+this.props.userName)
        .then((response) => response.json())
        .then(cont => {
            this.setState({
                contacts: cont,
                first: false
            })
        });;
    
        //this.props.setFunction(this.state.contacts); 
    }

    alreadyAContact = (value, contactLis) => {
        {/*loop through contacts and create contact buttons for each*/ }
        let i = 0;
        for (; i < contactLis.length; i++) {
            if (contactLis[i].id == value) {
                return true;
            }
        }
        return false;
    };



    formObject = event => {
        //console.log(this.props.contactList);
        //console.log(this.state.contacts);
        event.preventDefault();
        const { name, value } = event.target;
        let error = { ...this.state.error };
        this.fetchValidity(value);
        this.getContacts();
  
        switch (name) {
            case "name":
                if (value === '') { error.name = ""; break }
                //need to make query- check if person exists on server
                //  if(!this.state.yes){error.name ="this user name does not exist"; break;}
                if (this.alreadyAContact(value, this.props.contactList)) { error.name = "this user name already exists"; break }
                else { error.name = ""; }
                break;
            default:
                break;
        }
    

        this.setState({
            error,
            [name]: value,
            contacts: this.props.contactList,
            first: false
        })
    
        //this.props.setFunction(this.state.contacts); 
    };

    OnFormSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.first);
        if (this.state.error.name !== '') {
            event.preventDefault();
            return;
        }
        
        axios.post('https://localhost:7188/api/Contacts?m_id=' +
            this.props.userName + '&c_id=' + this.state.name + '&name=' + this.state.nickname +
             '&server=' + this.state.server).then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
                this.setState({ sucssess: false });
            });
    
           
        if (this.state.sucssess) {
            //change server to my server
            axios.post(this.state.server + '/api/Invitations?from=' + this.props.userName + '&to=' + this.state.name +
                '&server=https%3A%2F%2Flocalhost%3A7188').catch(function (error) {
                    console.log(error);
                    this.setState({ sucssess: false });
                });
             
        }
        if (!this.state.sucssess) {
            console.log("somthing went wrong with other server");
        }
        else {
            //close here modal.
            //window.location.reload(false);
            this.getContacts();

            //this.props.setFunction(this.state.contacts); 
            this.setState({ 
                name: '',
                nickname: '',
                 server: ''
                }); //make textBox empty     
            this.props.closeBox.current.click();

            //window.location.reload(false);
        }
    };
    render() {
        let c = this.props.closeBox;
        const { error } = this.state;
        if (this.state.first){
            this.props.setFunction(this.props.contactList);
        
        } else{
            
            this.props.setFunction(this.state.contacts);
            
           
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
                            <form onSubmit={this.OnFormSubmit}>
                                <div class="modal-body">

                                    <div class="mb-3">
                                        <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter contact's id" required
                                            name="name"
                                            value={this.state.name}
                                            onChange={this.formObject}
                                            className={error.name.length > 0 ? "is-invalid form-control" : "form-control"} />

                                        {error.name.length > 0 && (
                                            <span className="invalid-feedback, medFont">{error.name}</span>
                                        )}
                                    </div>

                                    <div class="mb-3">
                                        <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter contact's nickname" required
                                            name="nickname"
                                            value={this.state.nickname}
                                            onChange={this.formObject}
                                            className={error.nickname.length > 0 ? "is-invalid form-control" : "form-control"} />

                                        {error.nickname.length > 0 && (
                                            <span className="invalid-feedback, medFont">{error.nickname}</span>
                                        )}
                                    </div>

                                    <div class="mb-3">
                                        <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter contact's server" required
                                            name="server"
                                            onChange={this.formObject}
                                            value={this.state.server}
                                            className={error.nickname.length > 0 ? "is-invalid form-control" : "form-control"} />

                                        {error.nickname.length > 0 && (
                                            <span className="invalid-feedback, medFont">{error.nickname}</span>
                                        )}
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
    }
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

