import React, { Component } from 'react';
import UserService from './UserService';
import { Container, Card, Button } from 'react-bootstrap';
import AuthService from './AuthService';

class ItemDetail extends Component {
    state = { 
        isLoading : true,
        content : null,
        user : AuthService.getCurrentUser()
    }

    componentDidMount(){
        UserService.getItemDetail(this.props.match.params.id).then(
            response => {
                this.setState({
                    content : response.data,
                    isLoading : false
                })
            },
            error => {
                console.log(error);
            }
        )
    }

    render() { 
        const {isLoading,content} = this.state;
        if (isLoading) {
            return(<div>Loading...</div>)
        }
        return (
            <Container>
                <Card>
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
                            {(this.state.user.username === content.user.username) && 
                                <div className="button-beli"><Button variant="primary">Beli Sekarang</Button></div>
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