import React, { Component } from 'react';
import { Container, ButtonGroup, ToggleButton, Card, Button, Row} from 'react-bootstrap';
import UserService from './UserService';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from "react-js-pagination";
import AuthService from './AuthService';

class SearchResult extends Component {
    state = { 
        searchResult : [],
        radioValue : '',
        activePage:1,
        user: AuthService.getCurrentUser(),
        totalPages: null,
        itemsCountPerPage:null,
        totalItemsCount:null,
        showAlert: false,
        success : false,
        showAlertNotification : true,
        type : '',
        searchWord : ''
    }

    setRadioValue(radioValue){
        this.props.history.push({
            pathname: '/search',
            search: `?type=${radioValue}&searchWord=${this.state.searchWord}`
        });
        window.location.reload()
    }

    fetchSearchResult(){
        const searchURL = window.location.search
        const params = new URLSearchParams(searchURL);
        this.setState({ 
            radioValue : (params.get('type') === "product") ? "product" : "user",
            searchWord : params.get('searchWord')
        });
        UserService.search(params.get('searchWord'), params.get('type'), this.state.activePage-1).then(
            response => {
                this.setState({
                    searchResult : response.data.content,
                    totalPages : response.data.totalPages,
                    itemsCountPerPage : response.data.size,
                    totalItemsCount : response.data.totalElements,
                    searchWord : params.get('searchWord'),
                    type : params.get('type')
                });
            },
            error => {
                console.log(error)
            }
        )
    }

    componentDidMount(){        
        this.fetchSearchResult();
    }

    handlePageChange(pageNumber) {
        this.setState({
            activePage: pageNumber
        })
        this.fetchUrl(pageNumber)
    }

    fetchUrl(page){
        UserService.search(this.state.searchWord, this.state.type, (page-1)).then(
            response =>{
                this.setState({
                    totalPages : response.data.totalPages,
                    itemsCountPerPage : response.data.size,
                    totalItemsCount : response.data.totalElements,
                    isLoading : false,
                    searchResult : response.data.content
                });
            },
            error =>{
                console.log(error);
            }        
        )
    }

    render() {
        const radios = [
            { name: 'Product', value: "product" },
            { name: 'User', value: "user" },
        ];
        return (
            <Container>
                <div className="text-center search-result">
                    <ButtonGroup toggle>
                        {radios.map((radio, idx) => (
                            <ToggleButton
                                key={idx}
                                type="radio"
                                variant="secondary"
                                name="radio"
                                className="button-toggle-search"
                                value={radio.value}
                                checked={this.state.radioValue === radio.value}
                                onChange={(e) => this.setRadioValue(e.currentTarget.value)}
                            >
                                <FontAwesomeIcon icon={faUser} size="lg"/>
                                <span>{radio.name}</span>
                            </ToggleButton>
                        ))}
                    </ButtonGroup>
                </div>
                <Row className="show-grid text-center">
                    {(this.state.searchResult && this.state.type ==="product") && this.state.searchResult.map(item =>
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
                    {(this.state.searchResult && this.state.type ==="user") && this.state.searchResult.map(user =>
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
                                    <Button href={`/user/item/${user.id}`} className="produk-button" variant="secondary">Lihat Profil</Button>
                                </Card.Body>
                            </Card>
                        </div>
                    )}
                    {(this.state.searchResult.length === 0) &&
                        <div className="no-result">Tidak ada produk yang sesuai dengan pencarian</div>
                    }
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
 
export default SearchResult;