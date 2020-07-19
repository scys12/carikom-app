import React, { Component } from 'react';
import {Form, Button, Container} from 'react-bootstrap'
import AuthService from './AuthService'
import UserService from './UserService';
export default class TambahProduk extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userOwner: AuthService.getCurrentUser(),
            name: "",
            deskripsi: "",
            harga:"",
            kategoriPilihan: `{"id" : 1, "name" : "RAM"}`,
            categories: [],
            errors: [],
            succesful: false,
            message: ""
        };
    }
    componentDidMount(){
        UserService.getCategories().then(
            response =>{
                console.log(response.data)
                this.setState({
                    categories: response.data
                })
            },
            error => {                                        
                this.setState({
                    categories: []
                })
            }
        );
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
        if(this.state.name === ""){
            isValid = 0
            this.showValidationErr("name", "Nama Produk tidak boleh kosong");
        }if(this.state.deskripsi === ""){
            isValid = 0
            this.showValidationErr("deskripsi", "Deskripsi Produk tidak boleh kosong");
        }if(this.state.harga === ""){
            isValid = 0
            this.showValidationErr("harga", "Harga Produk tidak boleh kosong");
        }else if(isNaN(this.state.harga)){
            isValid = 0
            this.showValidationErr("harga", "Harga Produk hanya boleh berupa angka");
        }
        return isValid;
    }

    submitData(e){
        this.setState({
            successful:false,
            message: ""
        })
        if(this.formValidation(e)){
            UserService.addProduct(this.state.name, this.state.deskripsi, this.state.harga,this.state.kategoriPilihan,this.state.userOwner).then(
                response =>{
                    this.setState({
                        message: response.data.message,
                        successful: true
                    })
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
                    console.log(resMessage)
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
        if (attName === "name") {
            this.setState({name : attVal});
        }else if (attName === "deskripsi") {
            this.setState({deskripsi : attVal});
        }else if (attName === "harga") {
            this.setState({harga : attVal});
        }else if (attName === "kategoriPilihan"){
            this.setState({kategoriPilihan: attVal});
        }
        this.clearValidationErr(attName);
    }
    render() { 
        const {categories} = this.state;
        let nameErr, deskripsiErr, hargaErr = null;
        for (const error of this.state.errors) {
            if (error.elm === "name") {
                nameErr = error.msg
            }
            else if (error.elm === "deskripsi") {
                deskripsiErr = error.msg
            }else if (error.elm === "harga") {
                hargaErr = error.msg
            }
        }

        return (
            <Container>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Nama Produk</Form.Label>
                    <Form.Control type="text" name="name" onChange={this.onDataChange.bind(this)} className="produk-input" placeholder="Nama Produk"/>
                    <small className="danger-error">{ nameErr ? nameErr : "" }</small>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Deskripsi Produk</Form.Label>
                    <Form.Control as="textarea" type="text" rows="10" name="deskripsi" onChange={this.onDataChange.bind(this)}className="produk-input" placeholder="Deskripsi Produk"/>
                    <small className="danger-error">{ deskripsiErr ? deskripsiErr : "" }</small>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Harga Produk</Form.Label>
                    <Form.Control type="text" name="harga" onChange={this.onDataChange.bind(this)} className="produk-input" placeholder="Harga Produk"/>
                    <small className="danger-error">{ hargaErr ? hargaErr : "" }</small>
                </Form.Group>
                {/* <div className="input-group">
                    <label htmlFor="name">Nama Produk</label>
                    <input type="text" name="name" onChange={this.onDataChange.bind(this)} className="produk-input" placeholder="Nama Produk"/>
                    <small className="danger-error">{ nameErr ? nameErr : "" }</small>
                </div> */}
                {/* <div className="input-group">
                    <label htmlFor="deskripsi">Deskripsi Produk</label>
                    <textarea type="text" rows="10" name="deskripsi" onChange={this.onDataChange.bind(this)}className="produk-input" placeholder="Deskripsi Produk"/>
                    <small className="danger-error">{ deskripsiErr ? deskripsiErr : "" }</small>
                </div> */}
                {/* <div className="input-group">
                    <label htmlFor="harga">Harga Produk</label>
                    <input type="text" name="harga" onChange={this.onDataChange.bind(this)} className="produk-input" placeholder="Harga Produk"/>
                    <small className="danger-error">{ hargaErr ? hargaErr : "" }</small>
                </div> */}
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Kategori</Form.Label>
                    <Form.Control as="select" onChange = {this.onDataChange.bind(this)} name="kategoriPilihan">
                        {categories.map( kategori =>
                            <option value={`{"id" : ${kategori.id}, "name" : "${kategori.name}"}`} key={kategori.id}>{kategori.name}</option>
                        )}
                    </Form.Control>
                </Form.Group>
                <div className="text-center">
                    <Button 
                        variant="primary" onClick={this.submitData.bind(this)}
                        disabled={this.state.loading}
                    >
                        <span>Tambah Produk</span>
                    </Button>
                </div>
            </Container>
        );
    }
}