import React, { Component } from 'react';
import UserService from './UserService';
import { Container, Card, Row, Button } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTag } from '@fortawesome/free-solid-svg-icons';

class AllProducts extends Component {
    state = { 
        products : [],
        totalPages: null,
        activePage:1,
        itemsCountPerPage:null,
        totalItemsCount:null,
        isLoading : true
    }

    componentDidMount(){        
        this.fetchUrl(this.state.activePage);
    }

    handlePageChange(pageNumber) {
        this.setState({
            activePage: pageNumber
        })
        this.fetchUrl(pageNumber)
    }

    fetchUrl(page){
        UserService.getAllItems(page-1).then(
            response =>{
                this.setState({
                    totalPages : response.data.totalPages,
                    itemsCountPerPage : response.data.size,
                    totalItemsCount : response.data.totalElements,
                    isLoading : false,
                    products : response.data.content
                });
            },
            error =>{
                console.log(error);
            }        
        )
    }

    render() { 
        return (
            <Container>
                <Card className="card-home">
                    <Card.Header>
                        <p className="produk-header">Semua Produk</p>
                    </Card.Header>
                    <Card.Body>
                        <Row className="show-grid text-center">
                            {this.state.products  && this.state.products.map(item =>
                                <div key={item.id} className="item-wrapper">
                                    <Card>
                                        <div className="text-center"><a href={`/user/profile/${item.user.username}`} className="seller-section"><FontAwesomeIcon icon={faUserTag} size="1px"/> {item.user.username} </a><Card.Img variant="top" src={`http://localhost:3000/images/${item.category.name}.png`} className="item-img" /></div>
                                        <Card.Body>
                                            <Card.Title><strong>{item.name}</strong></Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">[{item.category.name}]</Card.Subtitle>
                                            <hr/>
                                            <Card.Text style={{fontSize: "17px"}}>
                                                <strong>Rp{item.price}</strong>
                                            </Card.Text>
                                            <hr/>
                                            <Button href={`/user/item/${item.id}`} className="produk-button" variant="primary">Lihat Produk</Button>
                                            <Button href={`/user/${item.user.id}/item`} className="produk-button" variant="secondary">Lihat Produk Penjual</Button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            )}
                            {(this.state.products.length === 0) &&
                                <div className="no-result">Tidak ada produk</div>
                            }
                        </Row>
                    </Card.Body>
                    {this.state.totalPages > 1 && (
                        <div className="d-flex flex-row py-4 justify-content-center">
                            <Pagination hideNavigation                        
                                activePage={this.state.activePage}
                                itemsCountPerPage={this.state.itemsCountPerPage}
                                totalItemsCount={this.state.totalItemsCount}
                                pageRangeDisplayed={9}
                                
                                itemClass='page-item'
                                linkClass='btn btn-light'
                                onChange={this.handlePageChange.bind(this)}
                            />
                        </div>
                    )}
                </Card>
            </Container>
        );
    }
}
 
export default AllProducts;