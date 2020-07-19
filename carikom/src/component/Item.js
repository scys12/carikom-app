import React, { Component } from 'react'
import { Jumbotron, Container, Card, Row, Image, Button, Breadcrumb} from 'react-bootstrap';

class Item extends Component {
    state = {
        isLoading : true,
        Items : []
    };

    async componentDidMount(){
        const response = await fetch('/api/items');
        const body = await response.json();
        this.setState({
            Items : body,
            isLoading : false
        });
    }
    render() { 
        const {Items, isLoading} = this.state;
        if (isLoading) {
            return (<div>
                Loading...
                </div>
            );
        }
        return (
            <Container>
                <Breadcrumb><Button variant="success" href="/user/item/tambah">Tambah Produk</Button></Breadcrumb>
                <div style={{backgroundColor: "#e9ecef", padding: "20px"}}>
                    <Row className="show-grid text-center">
                        <div className="item-wrapper">
                            <Card>
                                <div className="text-center"><Card.Img variant="top" src="././images/storage.png" className="item-img" /></div>
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                        <Card.Text>
                                            Some quick example text to build on the card title and make up the bulk of
                                            the card's content.
                                        </Card.Text>
                                    <Button className="produk-button" variant="primary">Lihat Produk</Button>
                                    <Button className="produk-button" variant="warning">Edit Produk</Button>
                                    <Button className="produk-button" variant="danger">Hapus Produk</Button>
                                </Card.Body>
                            </Card>
                        </div>                    
                    </Row>
                </div>
            </Container>
        );
    }
}
 
export default Item;