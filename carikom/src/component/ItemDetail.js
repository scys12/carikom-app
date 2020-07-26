import React, { Component } from 'react';
import UserService from './UserService';
import { Container, Card, Button, NavLink, Alert } from 'react-bootstrap';
import AuthService from './AuthService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUserTag, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import SweetAlert from 'react-bootstrap-sweetalert';
import dateFormat from 'dateformat';

class ItemDetail extends Component {
    state = { 
        isLoading : true,
        content : null,
        user : AuthService.getCurrentUser(),
        isError : false,
        success : false,
        transaction : [],
        errorTransaction : '',
        showAlert : false
    }

    onCancel(e){
        this.setState({
            showAlert : false
        });
    }

    onConfirm(e){
        this.setState({
            showAlert : false
        });
    }

    componentDidMount(){
        UserService.getItemDetail(this.props.match.params.id).then(
            response => {                
                if (response.data.isBought == 1) {
                    this.props.history.push({
                        pathname: '/',
                        state: {
                            message: "Produk sudah terjual",
                            type: "danger"
                        }
                    });
                    window.location.reload();
                    
                }
                this.setState({
                    content : response.data,
                    isLoading : false,
                    isError : false
                })
            },
            error => {
                console.log(error.response.message)
                this.setState({isError : true, errorTransaction : error.response.message})
            }
        )
    }

    buyItem(e){
        UserService.buyItem(this.state.content).then(
            response =>{
                console.log(response.data)
                this.setState({showAlert : true, success : true, isError : false, transaction : response.data})
            },
            error => {
                console.log(error.response.message)
                this.setState({isError : true, errorTransaction : error.response.message})
            }
        )
    }

    render() { 
        const {isLoading,content} = this.state;
        const buyDate = dateFormat(this.state.transaction.buyDate, "d mmmm yyyy");
        setTimeout(() => {
            this.setState({
                showAlert:false,
            })
            this.props.history.push({
                pathname: "/",
                state: {
                    message: "",
                    type: ""
                }
            });
            window.location.reload()
        }, 5000);
        if (isLoading) {
            return(<div>Loading...</div>)
        }
        else
            return (
                <Container>
                    {this.state.isError && 
                        <Alert key="1" variant="danger">
                            {this.state.errorTransaction}
                        </Alert>
                    }
                    {this.state.success &&
                            <SweetAlert
                                show = {this.state.showAlert}
                                success
                                title="Berhasil membeli produk!"
                                onConfirm={this.onConfirm.bind(this)}
                                onCancel={this.onCancel.bind(this)}
                            >
                                <div style={{display : "flex", flexDirection: "column"}}>
                                    <span style={{fontWeight: "600", fontSize: "27px"}}><strong>Produk {this.state.transaction.item.name}</strong></span>
                                    <span>seharga <strong style={{fontWeight: "600", fontSize: "27px"}}>Rp{this.state.transaction.totalCost}</strong></span>
                                    <span>dibeli pada <strong style={{fontWeight: "600", fontSize: "27px"}}>{buyDate}</strong></span>
                                    <span>oleh <strong style={{fontWeight: "600", fontSize: "27px"}}>{this.state.transaction.user.nama}</strong></span>
                                </div>
                            </SweetAlert>                        
                    }
                    <Card>
                        <div className="info-penjual">
                            <NavLink href={`/user/profile/${content.user.username}`} style={{display: "flex", flexDirection: "column"}} >
                                <div style={{marginBottom: "20px"}} ><FontAwesomeIcon icon={faUserTag} style={{marginRight:"10px"}} size="sm" color="white"/><span>{content.user.username} </span></div>
                                <div><FontAwesomeIcon icon={faMapMarkerAlt} size="sm"  style={{marginRight:"10px"}} color="white"/> <span>{content.user.username} </span></div>
                            </NavLink>
                        </div>
                        <Card.Body className="d-flex">
                            <Card.Img className="user-item" variant="top" src={`http://localhost:3000/images/${content.category.name}.png`} />
                            <div className="user-item-text">
                                <Card.Text className="user-item-title">
                                    {content.name}
                                </Card.Text>
                                <Card.Text className="user-item-category">
                                    {content.category.name}
                                </Card.Text>
                                <hr></hr>
                                <Card.Text className="user-item-price">
                                    <span className="price-text">Harga</span><span className="price-total">Rp {content.price}</span>
                                </Card.Text>
                                {(this.state.user.username !== content.user.username) && 
                                    <div className="button-beli"><Button variant="primary" onClick={this.buyItem.bind(this)}>Beli Sekarang</Button></div>
                                }
                            </div>                        
                        </Card.Body>
                        <div className="user-item-description">
                            <Card.Text className="description-title">
                                Deskripsi
                            </Card.Text>
                            <hr></hr>
                            <Card.Text className="description-contain">
                                {content.description}
                            </Card.Text>
                        </div>
                    </Card>
                </Container>
            );
    }    
}
 
export default ItemDetail;