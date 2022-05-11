import React, { Component } from "react";
import { Modal } from "bootstrap";
import webClient4 from "./webClient4.jpg"
import { BrowserRouter, Routes, Route, Link, withRouter, useNavigate, NavigationType } from 'react-router-dom'
import users from "../users";


const Validation = ({ error, ...rest }) => {
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

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            password: '',
            staticBackdrop: '',
            error: {
                name: '',
                password: '',
                staticBackdrop: ''
            }
        }
    }

    OnFormSubmit = (event) => {
        event.preventDefault();
       
        if (!users.hasOwnProperty(this.state.name)) {
            var myModal = new Modal(document.getElementById('staticBackdrop'), {
                keyboard: false
            })
            myModal.show()
            event.preventDefault();
            return;

        } else {
            if (users[this.state.name][0] !== this.state.password) {
                var myModal = new Modal(document.getElementById('staticBackdrop'), {
                    keyboard: false
                })
                myModal.show()
                event.preventDefault();
                return;
            }
        }
        if (Validation(this.state)) {
            console.log(this.state)
        } else {
            console.log("Error occured");
        }
        if (this.state.error.name === '' && this.state.error.password === '') {
            let username = this.state.name;
            console.log(username);
            window.localStorage.setItem("userName",username);
            //this.router.navigate(['/chat'], {state: {username}});
            this.props.navigate('/chat', {name: username});
        }
    };

    formObject = event => {

        event.preventDefault();

        const { name, value } = event.target;
        let error = { ...this.state.error };

        switch (name) {
            case "name":
                error.name = value.length == 0 ? "Please enter your name" : "";
                break;
            case "password":
                error.password = value.length == 0
                    ? "Please enter your password" : "";
                break;
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
            <div class=".container bg">
                <div class="bg-success p-2 text-white">
                    <h2 class="l" >  <i class="bi bi-globe2"></i> webClient</h2>
                    <center>
                        <div class="animate__animated animate__zoomIn"><h1 class ="l">
                            Welcome To Web - Client! <br></br></h1>
                        </div>
                    </center>
                </div>
                <center>
                    <img src={webClient4} alt="webClient" class="bar" />
                    <br></br>  <br></br>
                </center>
                <div className="container">
                    <div className="card mt-5" class='c'>

                        <form className="card-body" onSubmit={this.OnFormSubmit}>

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
                            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                                aria-labelledby="staticBackdropLabel" aria-hidden="true" name="staticBackdrop">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="staticBackdropLabel" ><div class="h">Error</div></h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <h4 class="i">username or password are not correct!</h4>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <center>
                                <h6>Not registered? <Link to="/register"> click here</Link> to register</h6>
                            </center>
                            <br></br>
                            <center>
                                <div>
                                    <button type="submit" className="btn btn-primary btn-lg">login</button>
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
    return <Login {...props} navigate={navigate} />
}

export default WithNavigate