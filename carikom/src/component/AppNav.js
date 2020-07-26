import React, { Component } from 'react';
import {Nav,NavDropdown, Navbar,Button, FormControl, Form} from 'react-bootstrap'
import AuthService from './AuthService';
import {withRouter} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';
import UserService from './UserService';

class AppNav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Categories: [],
            currentUser: AuthService.getCurrentUser(),
            searchText: "",
            searchResult: [],
            isRedirect : false,
        };
    }

    async componentDidMount(){
        UserService.getCategories().then(
            response =>{
                this.setState({
                    Categories : response.data[0]
                })
            },error => {
                console.log(error)
            }
        )        
    }

    logout(e){
        e.preventDefault();
        AuthService.logout();
        this.props.history.push("/");
        window.location.reload();
    }

    handleSearchInput(e){
        const attVal = e.target.value;
        this.setState({searchText : attVal});
    }

    handleSearchSubmit(e){
        e.preventDefault()
        const type = "product";
        this.props.history.push({
            pathname: '/search',
            search: `?type=${type}&searchWord=${this.state.searchText}`
        });
        console.log(this.props)
        window.location.reload()
    }

    render() { 
        const {Categories, currentUser} = this.state;
        return (
            <Navbar>
                <Navbar.Brand href="/">
                    <img src="http://localhost:3000/images/brand.png" alt="brand"/>
                </Navbar.Brand>
                <Nav className="ml-auto">
                    <Form inline className="mr-5" method="get" onSubmit={this.handleSearchSubmit.bind(this)} >
                        <FormControl
                            onChange={this.handleSearchInput.bind(this)}
                            type="text"
                            placeholder="Search"
                            className="mr-sm-2"
                            style={{width:'350px'}}
                            required={true}
                        />
                        <Button type="submit" variant="outline-primary">
                            Search
                        </Button>                        
                    </Form>
                    <Nav.Link href="/items">Produk</Nav.Link>
                    <NavDropdown title="Kategori" id="collasible-nav-dropdown" alt="logo">
                        {
                            Categories.map( category =>
                                <NavDropdown.Item key={category.id} href={'/category/item/'+ category.id}>{category.name}</NavDropdown.Item>
                            )
                        }
                    </NavDropdown>
                </Nav>
                {currentUser ? (
                    <Nav className="ml-5 mr-5" id="navbar-profile" style={{position:"relative", marginLeft:"40px"}}>                        
                        <NavDropdown title={currentUser.nama} id="collasible-nav-dropdown" alt="logo">
                            <NavDropdown.Item key={1} href="/user/profile">Profil</NavDropdown.Item>
                            <NavDropdown.Item key={2} href="/user/item">Produk</NavDropdown.Item>
                            <NavDropdown.Item key={3} href="/user/logout" onClick = {this.logout.bind(this)}>Keluar</NavDropdown.Item>
                        </NavDropdown>
                        <div className="icon-navbar"><FontAwesomeIcon icon={faUserCircle} size="1x" color="white"/></div>
                    </Nav>
                    
                ) : (
                    <Nav className="ml-5">
                        <Button href='/auth' variant="outline-primary" className="mr-sm-2">Masuk/Daftar</Button>
                    </Nav>
                )}
            </Navbar>        
        );
    }
}
 
export default withRouter(AppNav);