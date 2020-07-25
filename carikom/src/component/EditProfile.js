import React, { Component } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import AuthService from './AuthService';
import UserService from './UserService';

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: AuthService.getCurrentUser(), 
            username: "",
            email: "",
            nama: "",
            lokasi: "",
            telepon: "",
            password: "",
            confirm_password: "",
            errors: [],
            successful: false,
            message: ""
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
        }
        if (this.state.confirm_password !== this.state.password && (this.state.password.length > 0 && this.state.confirm_password.length > 0)) {
            isValid = 0
            this.showValidationErr ("password", "Password anda tidak sama");
            this.showValidationErr ("confirm_password", "Password anda tidak sama");
        }else{
            if(this.state.password === ""){
                isValid = 0
                this.showValidationErr ("password", "Password tidak boleh kosong");
            }else if(this.state.password.length < 3){
                isValid = 0
                this.showValidationErr ("password", "Password harus memiliki minimal 3 karakter");
            }
            if(this.state.confirm_password === ""){
                isValid = 0
                this.showValidationErr ("confirm_password", "Konfirmasi Password tidak boleh kosong");
            }else if(this.state.confirm_password.length < 3){
                isValid = 0
                this.showValidationErr ("confirm_password", "Konfirmasi Password harus memiliki minimal 3 karakter");
            }
        }
        return isValid;
    }

    submitData(e){
        this.setState({
            successful:false,
            message: ""
        })
        if(this.formValidation(e)){
            AuthService.register(this.state.username, this.state.email, this.state.password,this.state.nama, this.state.lokasi, this.state.telepon).then(
                response =>{
                    this.setState({
                        message: response.data.message,
                        successful: true
                    })
                    this.props.history.push({pathname: "/user/profile"});
                    window.location.reload();
                },
                error => {
                    const resMessage =
                        (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage
                    });
                }
            )
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
        this.clearValidationErr(String(attName));
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
        const currentUser = this.state.user;
        return (
            <Container>
                <div className="form-wrapper">
                    <div className="form-title text-center">
                        <h5>Profile</h5>
                        <hr></hr>
                    </div>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Nama</Form.Label>
                        <Form.Control type="text" name="name" onChange={this.onDataChange.bind(this)} className="produk-input" placeholder="Nama" value={currentUser.nama} />
                        <small className="danger-error">{ namaErr ? namaErr : "" }</small>

                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" onChange={this.onDataChange.bind(this)} className="produk-input" placeholder="Email" value={currentUser.email} />
                        <small className="danger-error">{ emailErr ? emailErr : "" }</small>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name="username" onChange={this.onDataChange.bind(this)} className="produk-input" placeholder="Username" value={currentUser.username}/>
                        <small className="danger-error">{ usernameErr ? usernameErr : "" }</small>
                    </Form.Group>                    
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Lokasi</Form.Label>
                        <Form.Control type="text" name="lokasi" onChange={this.onDataChange.bind(this)} className="produk-input" placeholder="Lokasi" value={currentUser.lokasi}/>
                        <small className="danger-error">{ lokasiErr ? lokasiErr : "" }</small>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Nomor Telepon</Form.Label>
                        <Form.Control type="text" name="telepon" onChange={this.onDataChange.bind(this)} className="produk-input" placeholder="Nomor Telepon" value={currentUser.telepon}/>
                        <small className="danger-error">{ teleponErr ? teleponErr : "" }</small>
                    </Form.Group>                    
                    <div className="text-center">
                        <Button 
                            variant="primary" onClick={this.submitData.bind(this)}
                            disabled={this.state.loading}
                        >
                            <span>Edit Profile</span>
                        </Button>
                    </div>
                </div>
            </Container>
        );
    }
}
 
export default EditProfile;