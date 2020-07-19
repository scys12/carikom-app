import React, { Component } from 'react';
import {Button} from 'react-bootstrap'
import AuthService from './AuthService'
import {withRouter} from 'react-router-dom'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            loading: false,
            errors: [],
            message: ""
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
        this.setState({
            loading: true,
            message: ""         
        })
        if(this.formValidation(e)){
            AuthService.login(this.state.username, this.state.password).then(
                () =>{
                    this.props.history.push("/profile");
                    window.location.reload();
                },
                error => {                                        
                    this.setState({
                        loading:false,
                        message: "Username atau Password salah"
                    })
                }
            );
        }else{
            this.setState({
                loading:false
            })
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
                    {this.state.message &&
                        <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {this.state.message}
                        </div>
                    </div>
                    }
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" onChange={this.onDataChange.bind(this)} className="login-input" placeholder="Username"/>
                        <small className="danger-error">{ userNameErr ? userNameErr : "" }</small>
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" onChange={this.onDataChange.bind(this)}className="login-input" placeholder="Password"/>
                        <small className="danger-error">{ passwordErr ? passwordErr : "" }</small>
                    </div>
                    <Button 
                        variant="primary" onClick={this.submitLogin.bind(this)}
                        disabled={this.state.loading}
                    >
                        {this.state.loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Masuk</span>
                    </Button>
                </div>
            </div>
         );
    }
}
 
export default withRouter(Login);