import React, { Component } from 'react';
import {Button} from 'react-bootstrap'

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: "",
            email: "",
            nama: "",
            lokasi: "",
            telepon: "",
            password: "",
            confirm_password: "",
            errors: []
         };
    }    

    formValidation(e){
        if(this.state.username === ""){
            this.showValidationErr("username", "Username tidak boleh kosong");
        }
        if(this.state.email === ""){
            this.showValidationErr ("email", "Email tidak boleh kosong");
        }else if(!emailRegex.test(this.state.email)){
            this.showValidationErr("email", "Tolong masukkan email dengan benar")
        }
        if(this.state.nama === ""){
            this.showValidationErr ("nama", "Nama tidak boleh kosong");
        }if(this.state.lokasi === ""){
            this.showValidationErr ("lokasi", "Lokasi tidak boleh kosong");
        }if(this.state.telepon === ""){
            this.showValidationErr ("telepon", "Nomor Telepon tidak boleh kosong");
        }
        if (this.state.confirm_password !== this.state.password && (this.state.confirm_password !== "" && this.state.password !== "")) {
                this.showValidationErr ("password", "Password anda tidak sama");
                this.showValidationErr ("confirm_password", "Password anda tidak sama");
            }else{
                if(this.state.password === ""){
                    this.showValidationErr ("password", "Password tidak boleh kosong");
                }if(this.state.confirm_password === ""){
                    this.showValidationErr ("confirm_password", "Konfirmasi Password tidak boleh kosong");
                }
            }       
    }

    submitRegister(e){
        this.formValidation(e);
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
        const attName = e.target.getAttribute('name');
        const attVal = e.target.value;
        if (attName === "username") {
            this.setState({username : attVal});
        }else if (attName === "password") {
            this.setState({password : attVal});
        }else if (attName === "confirm_password") {
            this.setState({confirm_password : attVal});
        }else if (attName === "email") {
            this.setState({email : attVal});       
        }else if (attName === "lokasi") {
            this.setState({lokasi : attVal});            
        }else if (attName === "telepon") {
            this.setState({telepon : attVal});
        }else if (attName === "nama") {
            this.setState({nama : attVal});
        }
        this.clearValidationErr(String(attName))
    }

    render() { 
        let usernameErr, passwordErr, emailErr, namaErr, confirmPasswordErr, lokasiErr, teleponErr = null
        for (const err of this.state.errors) {
            if (err.elm === "username") {
                usernameErr = err.msg;
            }else if (err.elm === "password") {
                passwordErr = err.msg;
            }else if (err.elm === "confirm_password") {
                confirmPasswordErr = err.msg
            }else if (err.elm === "email") {
                emailErr = err.msg;
            }else if (err.elm === "nama") {
                namaErr = err.msg;
            }else if (err.elm === "lokasi") {
                lokasiErr = err.msg;
            }else if (err.elm === "telepon") {
                teleponErr = err.msg;
            }
        }
        return ( 
            <div className="inner-container">
                <div className="header">
                    Daftar
                </div>
                <div className="box">
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" className="login-input" onChange={this.onDataChange.bind(this)} placeholder="Email"/>
                        <small className="danger-error">{ emailErr ? emailErr : "" }</small>
                    </div>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" className="login-input" onChange={this.onDataChange.bind(this)} placeholder="Username"/>
                        <small className="danger-error">{ usernameErr ? usernameErr : "" }</small>
                    </div>
                    <div className="input-group">
                        <label htmlFor="nama">Nama</label>
                        <input type="text" name="nama" className="login-input" onChange={this.onDataChange.bind(this)} placeholder="Nama"/>
                        <small className="danger-error">{ namaErr ? namaErr : "" }</small>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" className="login-input" onChange={this.onDataChange.bind(this)} placeholder="Password"/>
                        <small className="danger-error">{ passwordErr ? passwordErr : "" }</small>
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirm_password">Konfirmasi Password</label>
                        <input type="password" name="confirm_password" className="login-input" onChange={this.onDataChange.bind(this)} placeholder="Konfirmasi Password"/>
                        <small className="danger-error">{ confirmPasswordErr ? confirmPasswordErr : "" }</small>
                    </div>
                    <div className="input-group">
                        <label htmlFor="lokasi">Lokasi</label>
                        <input type="text" name="lokasi" className="login-input" onChange={this.onDataChange.bind(this)} placeholder="Lokasi"/>
                        <small className="danger-error">{ lokasiErr ? lokasiErr : "" }</small>
                    </div>
                    <div className="input-group">
                        <label htmlFor="telepon">Nomor Telepon</label>
                        <input type="text" name="telepon" className="login-input" onChange={this.onDataChange.bind(this)} placeholder="Nomor Telepon"/>
                        <small className="danger-error">{ teleponErr ? teleponErr : "" }</small>
                    </div>
                    <Button variant="primary" onClick={this.submitRegister.bind(this)}>Daftar</Button>
                </div>
            </div>
         );
    }
}
 
export default Register;