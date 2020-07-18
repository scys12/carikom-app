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
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="/">
                    <img src="./images/brand.png" alt="brand"/>
                </Navbar.Brand>
                <Nav className="ml-auto">
                    <NavDropdown title="Category" id="collasible-nav-dropdown" alt="logo">
                        {
                            Categories.map( category =>
                                <NavDropdown.Item key={category.id} href={'/category/'+ category.id}>{category.name}</NavDropdown.Item>
                            )
                        }
                    </NavDropdown>
                </Nav>
                <Button variant="outline-primary" className="mr-sm-2">Masuk</Button>
                <Button variant="primary">Daftar</Button>
            </Navbar>
        );
    }
}
 
export default AppNav;