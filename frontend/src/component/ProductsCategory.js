import React, { Component } from 'react';
import UserService from './UserService';
import AuthService from './AuthService';
import { Container, Card, Row, Button } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTag } from '@fortawesome/free-solid-svg-icons';

class ProductsCategory extends Component {
    state = { 
        activePage:1,
        user: AuthService.getCurrentUser(),
        totalPages: null,
        itemsCountPerPage:null,
        totalItemsCount:null,
        items : []
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
        UserService.getItemsFromCategory(this.props.match.params.id, (page-1)).then(
            response =>{
                this.setState({
                    totalPages : response.data.totalPages,
                    itemsCountPerPage : response.data.size,
                    totalItemsCount : response.data.totalElements,
                    numberOfElements : response.data.numberOfElements,
                    items : response.data.content
                });
            },
            error =>{
                console.log(error);
            }        
        )
    }

    render() { 
        const categories = [
            { id: '1', value: "RAM" },
            { id: '2', value: "Processor" },
            { id: '3', value: "VGA" },
            { id: '4', value: "Motherboard" },
            { id: '5', value: "Storage" },
        ];
        let valueHeader = null
        categories.map( category => {
            if(category.id == this.props.match.params.id){
                valueHeader = category.value;
            }
        });
        return ( 
            <Container>
                <Card className="card-home">
                    <Card.Header>
                        <p className="produk-header">Produk Untuk Kategori {valueHeader}</p>
                    </Card.Header>
                    <Card.Body>
                        <Row className="show-grid text-center">
                            {this.state.items.length > 0  && this.state.items.map(item =>
                                <div key={item.id} className="item-wrapper">
                                    <Card>
                                        <div className="text-center"><a href={`/user/profile/${item.user.username}`} className="seller-section"><FontAwesomeIcon icon={faUserTag} size="1x"/> {item.user.username} </a><Card.Img variant="top" src={`http://localhost:3000/images/${item.category.name}.png`} className="item-img" /></div>
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
                            {(this.state.items && this.state.type ==="user") && this.state.items.map(user =>
                                <div key={user.id} className="item-wrapper">
                                    <Card>
                                        <div className="text-center"><Card.Img variant="top" src={`http://localhost:3000/images/motherboard.png`} className="item-img" /></div>
                                        <Card.Body>
                                            <Card.Title><strong>{user.nama}</strong></Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">[{user.lokasi}]</Card.Subtitle>
                                            <hr/>
                                            <Card.Text>
                                                {user.username}
                                            </Card.Text>
                                            <hr/>
                                            <Button href={`/user/item/${user.id}`} className="produk-button" variant="primary">Lihat Produk Penjual</Button>
                                            <Button href={`/user/item/${user.username}`} className="produk-button" variant="secondary">Lihat Profil</Button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            )}
                            {(this.state.items.length === 0) &&
                                <div className="no-result">Tidak ada produk yang sesuai dengan kategori</div>
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
 
export default ProductsCategory;