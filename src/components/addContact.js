import users from "../users";
import React, { Component, useRef } from "react";
import AllChats from "../AllChats";
import number from "./number";
import axios from 'axios'

function random(low, high) {
    return Math.random() * (high - low) + low
}



class Contact extends React.Component  {


    constructor(props) {
        super(props)
        this.state = {
            yes: false,
            name: '',
            error: {
                name: ''
            }
        }
    }

    fetchValidity=(name)=>{
        console.log(name);
        fetch('https://localhost:7188/api/Contacts/exists?c_id='+name)
        .then((response) => response.json())
        .then(existing => { 
            this.setState({
                yes: existing
            })
        });
    }

    alreadyAContact = (value, contactLis)=>{
          {/*loop through contacts and create contact buttons for each*/}
        let i = 0;
        for(; i < contactLis.length; i ++){
            if (contactLis[i].id == value){
                return true;
            }
        }
            return false;
        };
        
        

    formObject = event => {

        event.preventDefault();
        const { name, value } = event.target;
        let error = { ...this.state.error };
        this.fetchValidity(value);
        
        switch (name) {
            case "name":
                if (value === '') {error.name = "";break}
               //need to make query- check if person exists on server
              //  if(!this.state.yes){error.name ="this user name does not exist"; break;}
                if(this.alreadyAContact(value, this.props.contactList)) {error.name ="this user name already exists";break}
                else {error.name = "";}
                break;
            default:
                break;
        }
        
        this.setState({
            error,
            [name]: value
        })
    };

    OnFormSubmit = (event) => {
        event.preventDefault();
        if (this.state.error.name !== '') {
            event.preventDefault();
            return;
        }

        axios.post('https://localhost:7188/api/Contacts?c_id='+this.state.name+'&name='+this.state.name+'&server=https://localhost:7188/');
    

        // axios.post(`https://localhost:7188/api/Contacts`, {})
        // .then(res => {
        // console.log(res);
        // console.log(res.data);
        // })

        // let num = random(3,1000000);
        // while (number.includes(num)) {
        //     num = random(3,1000000);
        // }
        // const dict ={};
        // const dict2={};
        // var chat =[];
        // AllChats[num] = chat;
        // dict[this.state.name] = num;
        // for (const [key, value] of Object.entries(users[this.props.myName][2])) {
        //     dict[key] = value;
        // }
        // console.log("the num is " + num)
       
        // dict2[this.props.myName] = num;
        // for (const [key, value] of Object.entries(users[this.state.name][2])) {
        //     dict2[key] = value;
        // }
        // this.props.setFunction(users[this.props.myName][2] = dict);
        // users[this.state.name][2] = dict2;
        // this.props.closeBox.current.click();
        // num++;
    };
render() {
    let c = this.props.closeBox;
    const { error } = this.state;


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
                            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter contact's identifier" required
                                name="name"
                                onChange={this.formObject}
                                className={error.name.length > 0 ? "is-invalid form-control" : "form-control"} />

                                {error.name.length > 0 && (
                                    <span className="invalid-feedback, medFont">{error.name}</span>
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
    let myName = props;
    let setFunction = props2;
    let contactList = props3;
    return <Contact {...props} myName={myName} setFunction = {setFunction} contactList = {contactList} closeBox = {closeBox}/>
}

export default AddContact;

