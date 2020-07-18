import React, { Component } from 'react';
import {Button} from 'react-bootstrap'

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errors: []
        };
    }

    formValidation(e){
        let isValid = 1;
        if(this.state.username === ""){
            isValid = 0
            this.showValidationErr("username", "Username tidak boleh kosong");
        }if(this.state.password === ""){
            isValid = 0
            this.showValidationErr("password", "Password tidak boleh kosong");
        }
        return isValid;
    }

    submitLogin(e){
        if(this.formValidation(e)){

        }

    }

    componentDidMount(){
        try{
            const response = await fetch('/auth/login', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }                
            })
            const body = await response.json();
        }
    }

    showValidationErr(elm, msg) {
        this.setState((prevState) => ({
            errors: [
                ...prevState.errors, {
                elm,
                msg
                }
            ]
        }));
    }

    clearValidationErr(elm) {
        this.setState((prevState) => {
            let newArr = [];
            for (let err of prevState.errors) {
                if (elm !== err.elm) {
                    newArr.push(err);
                }
            }
            return {errors: newArr};
        });
    }

    onDataChange(e){
        const attName = e.target.getAttribute("name");
        if (attName === "username") {
            this.setState({username : e.target.value});
        }else if(attName === "password"){
            this.setState({password: e.target.value});
        }
        this.clearValidationErr(String(attName))
    }
    render() { 
        let userNameErr, passwordErr = null;
        for (const error of this.state.errors) {
            if (error.elm === "username") {
                userNameErr = error.msg
            }
            else if (error.elm === "password") {
                passwordErr = error.msg
            }
        }
        console.log(userNameErr)
        return ( 
            <div className="inner-container">
                <div className="header">
                    Masuk
                </div>
                <div className="box">
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" onChange={() => this.onDataChange()} className="login-input" placeholder="Username"/>
                        <small className="danger-error">{ userNameErr ? userNameErr : "" }</small>
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" onChange={() => this.onDataChange()} className="login-input" placeholder="Password"/>
                        <small className="danger-error">{ passwordErr ? passwordErr : "" }</small>
                    </div>
                    <Button variant="primary" onClick={this.submitLogin.bind(this)}>Masuk</Button>
                </div>
            </div>
         );
    }
}
 
export default Login;