import React, { Component } from 'react';
import { Button, Container, Form, Alert } from 'react-bootstrap';
import AuthService from './AuthService';
import UserService from './UserService';
import { Redirect } from 'react-router-dom';

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
const userData = AuthService.getCurrentUser();

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: userData.username,
            email: userData.email,
            nama: userData.nama,
            lokasi: userData.lokasi,
            telepon: userData.telepon,
            errors: [],
            successful: false,
            message: "",
            password: '',
            isShow: true
         };
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

    formValidation(e){
        let isValid = 1;
        if(this.state.username === ""){
            isValid = 0
            this.showValidationErr("username", "Username tidak boleh kosong");
        }else if(this.state.username.length <3 || this.state.username.length > 20){
            isValid = 0
            this.showValidationErr("username", "Username memiliki panjang minimal 3 karakter dan maksimal 20 karakter");
        }
        if(this.state.email === ""){
            isValid = 0
            this.showValidationErr ("email", "Email tidak boleh kosong");
        }else if(!emailRegex.test(this.state.email)){
            isValid = 0
            this.showValidationErr("email", "Tolong masukkan email dengan benar")
        }
        if(this.state.nama === ""){
            isValid = 0
            this.showValidationErr ("nama", "Nama tidak boleh kosong");
        }if(this.state.lokasi === ""){
            isValid = 0
            this.showValidationErr ("lokasi", "Lokasi tidak boleh kosong");
        }if(this.state.telepon === ""){
            isValid = 0
            this.showValidationErr ("telepon", "Nomor Telepon tidak boleh kosong");
        }if(this.state.password === ""){
            isValid = 0
            this.showValidationErr ("password", "Password tidak boleh kosong");
        }
        return isValid;
    }

    submitData(e){
        this.setState({
            successful:false,
            message: ""
        })
        if(this.formValidation(e)){
            UserService.editProfile(this.state.username, this.state.email, this.state.nama, this.state.lokasi, this.state.telepon, this.state.password).then(
                response =>{
                    this.setState({
                        message: response.data,
                        successful: true
                    })
                },
                error => {
                    const resMessage = error.response.status === 401 ? "Password anda salah" : error.response.data.message

                    this.setState({
                        successful: false,
                        message: resMessage,
                        isShow : true
                    });
                    setTimeout(() => {
                        this.setState({isShow : false, message : ''})
                    }, 3000);
                }
            );
        }else{
            this.setState({
                succesful:false
            })
        }
    }

    onDataChange(e){
        const attName = e.target.getAttribute('name');
        const attVal = e.target.value;
        if (attName === "username") {
            this.setState({username : attVal});
        }else if (attName === "email") {
            this.setState({email : attVal});       
        }else if (attName === "lokasi") {
            this.setState({lokasi : attVal});            
        }else if (attName === "telepon") {
            this.setState({telepon : attVal});
        }else if (attName === "nama") {
            this.setState({nama : attVal});
        }else if (attName === "password") {
            this.setState({password : attVal});
        }
        this.clearValidationErr(String(attName));        
    }
    render() { 
        let usernameErr, emailErr, namaErr, lokasiErr, passwordErr, teleponErr = null
        for (const err of this.state.errors) {
            if (err.elm === "username") {
                usernameErr = err.msg;
            }else if (err.elm === "email") {
                emailErr = err.msg;
            }else if (err.elm === "nama") {
                namaErr = err.msg;
            }else if (err.elm === "lokasi") {
                lokasiErr = err.msg;
            }else if (err.elm === "telepon") {
                teleponErr = err.msg;
            }else if (err.elm === "password"){
                passwordErr = err.msg;
            }
        }        
        return (
            <Container>
                <div className="form-wrapper">
                    <div className="form-title text-center">
                        <h5>Profile</h5>
                        <hr></hr>
                    </div>
                    {(this.state.isShow && this.state.message) &&( 
                        <Alert key="1" variant="danger">
                            {this.state.message}
                        </Alert>
                    )}
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Nama</Form.Label>
                        <Form.Control type="text" name="nama" onChange={this.onDataChange.bind(this)} className="produk-input" placeholder="Nama" value={this.state.nama} />
                        <small className="danger-error">{ namaErr ? namaErr : "" }</small>

                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" onChange={this.onDataChange.bind(this)} className="produk-input " placeholder="Email" value={this.state.email} />
                        <small className="danger-error">{ emailErr ? emailErr : "" }</small>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name="username" onChange={this.onDataChange.bind(this)} className="produk-input" placeholder="Username" value={this.state.username}/>
                        <small className="danger-error">{ usernameErr ? usernameErr : "" }</small>
                    </Form.Group>                    
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Lokasi</Form.Label>
                        <Form.Control type="text" name="lokasi" onChange={this.onDataChange.bind(this)} className="produk-input" placeholder="Lokasi" value={this.state.lokasi}/>
                        <small className="danger-error">{ lokasiErr ? lokasiErr : "" }</small>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Nomor Telepon</Form.Label>
                        <Form.Control type="text" name="telepon" onChange={this.onDataChange.bind(this)} className="produk-input" placeholder="Nomor Telepon" value={this.state.telepon}/>
                        <small className="danger-error">{ teleponErr ? teleponErr : "" }</small>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Konfirmasi Password</Form.Label>
                        <Form.Control type="password" name="password" onChange={this.onDataChange.bind(this)} className="produk-input" placeholder="Password Akun Anda" />
                        <small className="danger-error">{ passwordErr ? passwordErr : "" }</small>
                    </Form.Group>
                    <div className="text-center">
                        <Button 
                            variant="primary" onClick={this.submitData.bind(this)}
                            disabled={this.state.loading}
                        >
                            <span>Edit Profile</span>
                        </Button>
                        {this.state.successful &&
                            <Redirect to={{
                                pathname: `/user/profile`,                            
                                state: {
                                    type : "warning",
                                    message : "Produk berhasil diubah"
                                }
                            }}/>
                        }
                    </div>
                </div>
            </Container>
        );
    }
}
 
export default EditProfile;