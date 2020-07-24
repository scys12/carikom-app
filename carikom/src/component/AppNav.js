import React, { Component } from 'react';
import {Nav,NavDropdown, Navbar,Button} from 'react-bootstrap'
import AuthService from './AuthService';
import {withRouter} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';

class AppNav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Categories: [],
            currentUser: AuthService.getCurrentUser()
        };
    }

    async componentDidMount(){
        const response = await fetch('/api/categories');
        const body = await response.json();
        this.setState({
            Categories : body
        })
    }

    logout(e){
        AuthService.logout();
        this.props.history.push("/");
        window.location.reload();
    }

    render() { 
        const {Categories, currentUser} = this.state;
        console.log(currentUser)
        return (
            <Navbar>
                <Navbar.Brand href="/">
                    <img src="http://localhost:3000/images/brand.png" alt="brand"/>
                </Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/items">Produk</Nav.Link>
                    <Nav.Link href="/about">Tentang Kami</Nav.Link>
                    <NavDropdown title="Kategori" id="collasible-nav-dropdown" alt="logo">
                        {
                            Categories.map( category =>
                                <NavDropdown.Item key={category.id} href={'/category/'+ category.id}>{category.name}</NavDropdown.Item>
                            )
                        }
                    </NavDropdown>
                </Nav>
                {currentUser ? (
                    <Nav className="ml-5 mr-5" style={{position:"relative", marginLeft:"40px"}}>                        
                        <NavDropdown title={currentUser.nama} id="collasible-nav-dropdown" alt="logo">
                            <NavDropdown.Item key={1} href="/user/profile">Profil</NavDropdown.Item>
                            <NavDropdown.Item key={2} href="/user/item">Item</NavDropdown.Item>
                            <NavDropdown.Item key={3} onClick = {this.logout.bind(this)}>Keluar</NavDropdown.Item>
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