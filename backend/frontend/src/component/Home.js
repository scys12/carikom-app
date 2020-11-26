import React, { Component } from 'react';
import { Jumbotron, Container, Card, Row, Image, Button} from 'react-bootstrap';
import UserService from './UserService';
import Slider from 'react-slick'
import { faUserTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default class Home extends Component {
    state = {
        Categories : [],
        size: [],
        product: []
    }

    async componentDidMount(){
        UserService.getCategories().then(
            response =>{
                this.setState({
                    Categories : response.data[0],
                    size : response.data[1]
                })
            },error => {
                console.log(error)
            }
        );
        UserService.getLatestProduct().then(
            response =>{
                this.setState({product : response.data})
            },
            error =>{
                console.log(error);
            }
        )
    }

    render() { 
        let categories = this.state.Categories;
        let size = this.state.size;
        categories.map( (category, index) =>        
            category.size = size[index]
        )
        let products = this.state.product;
        console.log(Math.round(6/3)+1);
        console.log(Math.round(5/3)+1);
        console.log(Math.round(4/3)+1);
        console.log(Math.round(3/3)+1);
        console.log(Math.round(3/3));
        console.log(Math.round(2/3));
        console.log(Math.round(1/3));
        const settings = {
            infinite: true,
            speed: 500,
            slidesToShow: products.length >= 3 ? (Math.round(products.length/3)+1) : (Math.round((products.length+1)/3)),
            slidesToScroll: products.length >= 3 ? (Math.round(products.length/3)+1) : (Math.round((products.length+1)/3)),
            autoplay: true,
            autoplaySpeed: 2000
        };
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
                                {categories.map(category =>
                                    <div className="category-box" key={category.id}>
                                        <a href="/">
                                            <Image className="category-img" src={`/images/${category.name}.png`} alt={`${category.name}`} />
                                        </a>
                                        <div className="category-div">
                                            <p>{category.size} produk</p>
                                            <a className="category-title" href={`/category/item/${category.id}`}>{category.name}</a>
                                        </div>
                                    </div>
                                )}                                
                            </Row>
                        </Card.Body>
                    </Card>
                    <Card className="card-home">
                        <Card.Header as="h5">Produk Terbaru</Card.Header>
                        <Card.Body>
                            <div className="show-grid text-center">
                                <Slider {...settings}>
                                    {products.map(product =>
                                        <div className="item-wrapper" key={product.id}>
                                            <Card style={{margin: (Math.round((products.length+1)/3) == 1 ? '0 250px' : "0 20px") }}>
                                                <div className="text-center" style={{margin:"20px auto"}}><a href={`/user/profile/${product.user.username}`} className="seller-section"><FontAwesomeIcon icon={faUserTag} size="1x"/> {product.user.username} </a><Card.Img variant="top" src={`/images/${product.category.name}.png`} className="item-img" /></div>                                        
                                                <Card.Body>
                                                    <Card.Title><strong>{product.name}</strong></Card.Title>
                                                    <Card.Subtitle className="mb-2 text-muted">[{product.category.name}]</Card.Subtitle>
                                                    <hr/>
                                                    <Card.Text style={{fontSize: "17px"}}>
                                                        <strong>Rp{product.price}</strong>
                                                    </Card.Text>
                                                    <hr/>
                                                    <Button href={`/user/item/${product.id}`} className="produk-button" variant="primary">Lihat Produk</Button>
                                                    <Button href={`/user/${product.user.id}/item`} className="produk-button" variant="secondary">Lihat Produk Penjual</Button>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    )}
                                </Slider>
                                {products.length == 0 &&
                                    <div className="no-result">Tidak ada produk</div>
                                }
                            </div>
                            <Button variant="secondary" href="/items" style={{width:'100%'}}>Lihat Semua Produk</Button>
                        </Card.Body>
                    </Card>
                </div>
                
            </Container>
        );
    }
}
