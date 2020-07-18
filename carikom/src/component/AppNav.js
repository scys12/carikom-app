import React, { Component } from 'react';
import {Nav,NavDropdown, Navbar,Button} from 'react-bootstrap'

class AppNav extends Component {
    state = {
        Categories: []
    };

    async componentDidMount(){
        const response = await fetch('/api/categories');
        const body = await response.json();
        this.setState({
            Categories : body
        })
    }
    render() { 
        const {Categories} = this.state;
        return (
            <Navbar>
                <Navbar.Brand href="/">
                    <img src="./images/brand.png" alt="brand"/>
                </Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
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
                <Nav className="ml-5">
                    <Button href='/auth' variant="outline-primary" className="mr-sm-2">Masuk/Daftar</Button>                    
                </Nav>
            </Navbar>
        );
    }
}
 
export default AppNav;