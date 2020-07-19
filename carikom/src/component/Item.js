import React, { Component } from 'react'
import { Jumbotron, Container, Card, Row, Image, Button, Breadcrumb, Alert} from 'react-bootstrap';


class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading : true,
            Items : [],
            message: "",
            visible: false
        };
        const stateMessage = "this.props.location.state.message" in window ? this.props.location.state.message : "";
        console.log(this.stateMessage)
    }
    

    async componentDidMount(){
        const response = await fetch('/api/items');
        const body = await response.json();
        this.setState({
            Items : body,
            isLoading : false
        });

        if (this.stateMessage) {
            console.log(this.stateMessage)
            this.setState({message : this.stateMessage});
            this.setState({visible:true});
            window.setTimeout(()=>{
                this.setState({visible:false})
            },2000)
        }
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
                {this.state.message &&( 
                    <Alert key="1" variant="success">
                        {this.state.message}
                    </Alert>
                )}
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