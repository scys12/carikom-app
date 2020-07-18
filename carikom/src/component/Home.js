import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Jumbotron, Container, Card, Row, Col, Image, Button} from 'react-bootstrap';

export default class Home extends Component {
    state = {  }
    render() { 
        return ( 
            <Container>
                <Jumbotron>
                    <h2>Selamat datang di CariKom</h2>
                    <p>Toko perlengkapan produk komputer terbaik!</p>
                </Jumbotron>
                <div className="show-grid">
                    <Card className="card-home">
                        <Card.Header as="h5">Kategori</Card.Header>
                        <Card.Body>
                            <Row className="show-grid text-center">
                                <div className="category-box">
                                    <a href="/">
                                        <Image className="category-img" src="././images/motherboard.png" alt="motherboard"/>
                                    </a>
                                    <div className="category-div">
                                        <p>555 produk</p>
                                        <a className="category-title" href="/">Motherboard</a>
                                    </div>
                                </div>
                                <div className="category-box">
                                    <a href="/">
                                        <Image className="category-img" src="././images/processor.png" alt="processor"/>
                                    </a>
                                    <div className="category-div">
                                        <p>555 produk</p>
                                        <a className="category-title" href="/">Processor</a>
                                    </div>
                                </div>
                                <div className="category-box">
                                    <a href="/">
                                        <Image className="category-img" src="././images/ram.png" alt="ram"/>
                                    </a>
                                    <div className="category-div">
                                        <p>555 produk</p>
                                        <a className="category-title" href="/">RAM</a>
                                    </div>
                                </div>
                                <div className="category-box">
                                    <a href="/">
                                        <Image className="category-img" src="././images/vga.png" alt="vga"/>
                                    </a>
                                    <div className="category-div">
                                        <p>555 produk</p>
                                        <a className="category-title" href="/">VGA</a>
                                    </div>
                                </div>
                                <div className="category-box">
                                    <a href="/">
                                        <Image className="category-img" src="././images/storage.png" alt="storage"/>
                                    </a>
                                    <div className="category-div">
                                        <p>555 produk</p>
                                        <a className="category-title" href="/">Storage</a>
                                    </div>
                                </div>
                            </Row>
                        </Card.Body>
                    </Card>
                    <Card className="card-home">
                        <Card.Header as="h5">Item</Card.Header>
                        <Card.Body>
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
                                            <Button variant="primary">Baca Selengkapnya</Button>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <div className="item-wrapper">
                                    <Card>
                                        <div className="text-center"><Card.Img variant="top" src="././images/storage.png" className="item-img" /></div>
                                        <Card.Body>
                                            <Card.Title>Card Title</Card.Title>
                                                <Card.Text>
                                                    Some quick example text to build on the card title and make up the bulk of
                                                    the card's content.
                                                </Card.Text>
                                            <Button variant="primary">Baca Selengkapnya</Button>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <div className="item-wrapper">
                                    <Card>
                                        <div className="text-center"><Card.Img variant="top" src="././images/storage.png" className="item-img" /></div>
                                        <Card.Body>
                                            <Card.Title>Card Title</Card.Title>
                                                <Card.Text>
                                                    Some quick example text to build on the card title and make up the bulk of
                                                    the card's content.
                                                </Card.Text>
                                            <Button variant="primary">Baca Selengkapnya</Button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Row>
                            <Button style={{width:'100%'}}>Lihat Selengkapnya</Button>
                        </Card.Body>
                    </Card>
                </div>
                
            </Container>
        );
    }
}