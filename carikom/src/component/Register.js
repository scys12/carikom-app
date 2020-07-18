import React, { Component } from 'react';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            errors: []
         };
    }

    submitRegister(e){

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
                if (elm != err.elm) {
                newArr.push(err);
                }
            }
            return {errors: newArr};
        });
    }

    render() { 
        return ( 
            <div className="inner-container">
                <div className="header">
                    Register
                </div>
                <div className="box">
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" className="login-input" placeholder="Email"/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" className="login-input" placeholder="Username"/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="nama">Nama</label>
                        <input type="text" name="nama" className="login-input" placeholder="Username"/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" className="login-input" placeholder="Password"/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirm-password">Konfirmasi Password</label>
                        <input type="password" name="confirm-password" className="login-input" placeholder="Password"/>
                    </div>
                    <button
                        type="button" className="login-btn" onClick={() => this.submitRegister()}>Register</button>
                </div>
            </div>
         );
    }
}
 
export default Register;