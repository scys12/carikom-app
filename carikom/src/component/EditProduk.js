import React, { Component } from 'react';
import {Form, Button, Container} from 'react-bootstrap'
import UserService from './UserService';

class EditProduk extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            successful: false,
            name: "",
            deskripsi: "",
            harga:"",
            kategoriPilihan: '',
            kategoriId: '',
            categories: [],
            errors: [],
            message: ""
        };
    }
    componentDidMount(){
        UserService.getCategories().then(
            response =>{
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

        UserService.getItemDetail(this.props.match.params.id).then(
            response => {
                this.setState({
                    name: response.data.name,
                    deskripsi: response.data.description,
                    harga: response.data.price,
                    kategoriPilihan : `{"id" : ${response.data.category.id}, "name" : "${response.data.category.name}"}`,
                    kategoriId : response.data.category.id,
                    isLoading : false
                })
            },
            error => {
                console.log(error);
            }
        )
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
            UserService.editProduct(this.state.name, this.state.deskripsi, this.state.harga,this.state.kategoriPilihan, this.props.match.params.id).then(
                response =>{
                    this.setState({
                        message: response.data,
                        successful: true
                    });
                    this.props.history.push({
                        pathname: "/user/item",
                        state: {
                            message : "Produk berhasil diedit"
                        }
                    });
                    window.location.reload();
                },
                error => {
                    this.setState({
                        successful: false,
                        message: "Terdapat kesalahan pada data yang diisi, harap mengisi ulang !"
                    });
                }
            )
        }else{
            this.setState({
                successful:false,
                message: "Terdapat kesalahan pada data yang diisi, harap mengisi ulang !"
            });
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
                    <Form.Control type="text" name="name" onChange={this.onDataChange.bind(this)} className="produk-input" placeholder="Nama Produk" value={this.state.name}/>
                    <small className="danger-error">{ nameErr ? nameErr : "" }</small>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Deskripsi Produk</Form.Label>
                    <Form.Control as="textarea" type="text" rows="10" name="deskripsi" onChange={this.onDataChange.bind(this)}className="produk-input" placeholder="Deskripsi Produk" value={this.state.deskripsi} />
                    <small className="danger-error">{ deskripsiErr ? deskripsiErr : "" }</small>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Harga Produk</Form.Label>
                    <Form.Control type="text" name="harga" onChange={this.onDataChange.bind(this)} className="produk-input" placeholder="Harga Produk" value={this.state.harga} />
                    <small className="danger-error">{ hargaErr ? hargaErr : "" }</small>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Kategori</Form.Label>
                    <Form.Control as="select" onChange = {this.onDataChange.bind(this)} name="kategoriPilihan">
                        {categories.map( kategori =>
                            <>
                            <option selected={this.state.kategoriId === kategori.id} value={`{"id" : ${kategori.id}, "name" : "${kategori.name}"}`}  key={kategori.id}>{kategori.name}</option>
                            </>
                        )}
                    </Form.Control>
                </Form.Group>
                <div className="text-center">
                    <Button 
                        variant="primary" onClick={this.submitData.bind(this)}
                        disabled={this.state.loading}
                    >
                        <span>Edit Produk</span>
                    </Button>
                </div>
            </Container>
        );
    }
}

export default EditProduk;