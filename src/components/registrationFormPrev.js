import React, { Component,useState } from "react";
import { Modal } from "bootstrap";
import webClient3 from "./webClient3.jpg"
import { Link,useNavigate } from "react-router-dom";
import users from "../users";

const regularExpression= RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/);
let urlImage;
const validation = ({ error, ...rest }) => {
    let checkValidation = false;

    Object.values(error).forEach(val => {
        if (val.length > 0) {
            checkValidation = false
        } else {
            checkValidation = true
        }
    });

    Object.values(rest).forEach(val => {
        if (val === null) {
            checkValidation = false
        } else {
            checkValidation = true
        }
    });

    return checkValidation;
};

class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            password: '',
            staticBackdrop: '',
            verifyPassword:'',
            displayName:'',
            image:'',
            error: {
                name: '',
                password: '',
                staticBackdrop: '',
                verifyPassword:'',
                displayName:'',
                image:''
            }
        }
    }

    onFormSubmit = event => {
        event.preventDefault();

        if (this.state.image !== '') {
            event.preventDefault();
            var idxDot = urlImage.lastIndexOf(".") + 1;
            var extFile =urlImage.substring(idxDot, urlImage.length).toLowerCase();
            if (extFile !== "jpg" && extFile !== "jpeg" && extFile !== "png") {
                var myModal = new Modal(document.getElementById('staticBackdrop'), {
                    keyboard: false
                })
                myModal.show()
                event.preventDefault();
                return
            }

        }

        if (validation(this.state)) {
            console.log(this.state)
        } else {
            console.log("Error occured");
        }
        let username = this.state.name.trim();
        let password = this.state.password;
        let displayName = this.state.displayName.trim();
       

        if (this.state.error.name === '' && this.state.error.password === '', this.state.error.verifyPassword === ''
        && this.state.error.displayName === '' && this.state.error.image === '') {
            if(this.state.image === '') {
                users[this.state.name.trim()] = [this.state.password, this.state.displayName.trim(),{},'','https://shoham.smarticket.co.il/uploads/upld5aaf8be85d246653337384.png' ]
            }
            else {
                users[this.state.name.trim()] = [this.state.password, this.state.displayName.trim(),{},'',this.state.image]
            }
            window.localStorage.setItem("userName",username);
            this.props.navigate('/chat', {username});
            console.log(users);
        }
    };

    formObject = event => {

        event.preventDefault();

        let { name, value } = event.target;
        let error = { ...this.state.error };

        switch (name) {
            case "name":
                error.name = value.trim().length == 0 ? "Please enter your name" : "";
                if(users.hasOwnProperty(value)){error.name ="this user name is already used" } 
                break;
            case "password":
                error.password = regularExpression.test(value)
                    ?"": "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters";
                break;
            case "verifyPassword":
                if(this.state.password != value){error.verifyPassword="Password did not match: Please try again..."}
                else {
                    error.verifyPassword="";
                }
                break;
            case "displayName":
                error.displayName = value.trim().length == 0 ? "Please enter your display name" : "";
                break;
            case "image":
                if (value ==='') {break;}
                urlImage = value;
                value = this.props.handleChange(event);
            default:
                break;

        }

        this.setState({
            error,
            [name]: value
        })
    };

    render() {

        const { error } = this.state;

        return (
            <div class = "bg">
      <div class="bg-success p-2 text-white">
        <h2 class="l" >  <i class="bi bi-globe2"></i> webClient</h2>
        <center>
          <div class="l"><h1 class="animate__animated animate__zoomIn">
            Welcome To The Registration Screen! <br></br></h1>
          </div>
        </center>
      </div>
      
            <div className="container">
                <div className="card mt-5" class='c'>

                    <form className="card-body" onSubmit={this.onFormSubmit}>
                    <div class="row">
                    <div class="col">
                        <div className="form-group mb-3">
                            <label className="mb-2"><strong>Username</strong></label>
                            <input
                                required
                                type="text"
                                name="name"
                                onChange={this.formObject}
                                className={error.name.length > 0 ? "is-invalid form-control" : "form-control"} />

                            {error.name.length > 0 && (
                                <span className="invalid-feedback">{error.name}</span>
                            )}
                        </div>
                        </div>
                        <div class ="col">
                        <div className="form-group mb-3">
                        <label className="mb-2"><strong>Display Name</strong></label>
                        <input
                            required
                            type="text"
                            name="displayName"
                            className={error.displayName.length > 0 ? "is-invalid form-control" : "form-control"}
                            onChange={this.formObject} />

                        {error.displayName.length > 0 && (
                            <span className="invalid-feedback">{error.displayName}</span>
                        )}
                    </div>
                        </div>
                    </div>
                        <div className="form-group mb-3">
                            <label className="mb-2"><strong>Password</strong></label>
                            <input
                                required
                                type="password"
                                name="password"
                                className={error.password.length > 0 ? "is-invalid form-control" : "form-control"}
                                onChange={this.formObject} />

                            {error.password.length > 0 && (
                                <span className="invalid-feedback">{error.password}</span>
                            )}
                        </div>
                        <div className="form-group mb-3">
                            <label className="mb-2"><strong>Verify Password</strong></label>
                            <input
                                required
                                type="password"
                                name="verifyPassword"
                                className={error.verifyPassword.length > 0 ? "is-invalid form-control" : "form-control"}
                                onChange={this.formObject} />

                            {error.verifyPassword.length > 0 && (
                                <span className="invalid-feedback">{error.verifyPassword}</span>
                            )}
                        </div>
                       
                        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                            aria-labelledby="staticBackdropLabel" aria-hidden="true" name="staticBackdrop">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="staticBackdropLabel" ><div class="h">Error</div></h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <h4 class="i">Only jpg/jpeg and png files are allowed!</h4>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group mb-3, d">
                <label class="input-group-text" for="image">Upload image</label>
                <input name="image" type="file" id="fileName" accept=".jpg,.jpeg,.png" class="form-control" 
                onChange={this.formObject} />

            {error.image.length > 0 && (
                <span className="invalid-feedback">{error.image}</span>
            )}
                </div>
                        <center>
                            <h6>Already registered? <Link to="/">click here</Link> to login</h6>
                        </center>
                        <br></br>
                        <center>
                            <div>
                                <button type="submit" className="btn btn-primary btn-lg">Register</button>
                            </div>
                        </center>
                    </form>
                </div>
            </div>
            </div>
        );
    }
}

function WithNavigate(props) {
    let navigate = useNavigate();
    function handleChange(e) {
        console.log(e.target.files);
        return (URL.createObjectURL(e.target.files[0]));
    }
    return <Register {...props} navigate={navigate} handleChange = {handleChange} />
}

export default WithNavigate

