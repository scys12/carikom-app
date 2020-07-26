import React, { Component } from 'react';
import { Jumbotron, Container, Card, Row, Image, Button} from 'react-bootstrap';
import UserService from './UserService';
import Slider from 'react-slick'
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
        console.log(this.props)
        let categories = this.state.Categories;
        let size = this.state.size;
        categories.map( (category, index) =>        
            category.size = size[index]
        )
        let products = this.state.product;
        const settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3
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
                                            <Image className="category-img" src={`http://localhost:3000/images/${category.name}.png`} alt={`${category.name}`} />
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
                                        <div className="item-wrapper">
                                            <Card style={{margin:"0 20px"}}>
                                                <div className="text-center" style={{margin:"20px auto"}}><Card.Img variant="top" src={`http://localhost:3000/images/${product.category.name}.png`} className="item-img" /></div>                                        
                                                <Card.Body>
                                                    <Card.Title><strong>{product.name}</strong></Card.Title>
                                                    <Card.Subtitle className="mb-2 text-muted">[{product.category.name}]</Card.Subtitle>
                                                    <hr/>
                                                    <Card.Text>
                                                        {product.description}
                                                    </Card.Text>
                                                    <hr/>
                                                    <Button href={`/user/item/${product.id}`} className="produk-button" variant="primary">Lihat Produk</Button>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    )}
                                </Slider>
                            </div>
                            <Button variant="secondary" href="/items" style={{width:'100%'}}>Lihat Semua Produk</Button>
                        </Card.Body>
                    </Card>
                </div>
                
            </Container>
        );
    }
}