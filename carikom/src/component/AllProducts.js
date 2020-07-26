import React, { Component } from 'react';
import UserService from './UserService';
import { Container, Card, Row, Button } from 'react-bootstrap';
import Pagination from 'react-js-pagination';

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
                <Row className="show-grid text-center">
                    {this.state.products  && this.state.products.map(item =>
                        <div key={item.id} className="item-wrapper">
                            <Card>
                                <div className="text-center"><Card.Img variant="top" src={`http://localhost:3000/images/${item.category.name}.png`} className="item-img" /></div>
                                <Card.Body>
                                    <Card.Title><strong>{item.name}</strong></Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">[{item.category.name}]</Card.Subtitle>
                                    <hr/>
                                    <Card.Text>
                                        {item.description}
                                    </Card.Text>
                                    <hr/>
                                    <Button href={`/user/item/${item.id}`} className="produk-button" variant="primary">Lihat Produk</Button>
                                </Card.Body>
                            </Card>
                        </div>
                    )}
                </Row>                
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
            </Container>
        );
    }
}
 
export default AllProducts;