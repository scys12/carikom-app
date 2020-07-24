import React, { Component } from 'react';
import AuthService from './AuthService'
import { Container, Card} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons';

export default class UserDashboard extends Component {
    state = { 
        currentUser: AuthService.getCurrentUser()
     }

    render() {
        const {currentUser} = this.state;
        
        return ( 
            <Container>
                <Card>
                    <Card.Header>Profile</Card.Header>
                    <div className="text-center mt-5">
                        <FontAwesomeIcon icon={faUser} size="10x" color="#3498db"/>
                    </div>
                    <Card.Body className="datadiri">
                        <div className="data-diri">
                            <Card.Text>
                                <strong>Email :</strong>
                            </Card.Text>
                            <Card.Text>
                                <strong>Username :</strong>
                            </Card.Text>
                            <Card.Text>
                                <strong>Nama :</strong>
                            </Card.Text>
                            <Card.Text>
                                <strong>Nomor Telepon :</strong >
                            </Card.Text>
                            <Card.Text>
                                <strong>Lokasi :</strong>
                            </Card.Text>
                        </div>

                        <div className="data-diri">
                            <Card.Text><strong style={{color: "#2892D7"}}>{currentUser.email}</strong></Card.Text>
                            <Card.Text><strong style={{color: "#2892D7"}}>{currentUser.username}</strong></Card.Text>
                            <Card.Text><strong style={{color: "#2892D7"}}>{currentUser.nama}</strong></Card.Text>
                            <Card.Text><strong style={{color: "#2892D7"}}>{currentUser.telepon}</strong></Card.Text>
                            <Card.Text><strong style={{color: "#2892D7"}}>{currentUser.lokasi}</strong></Card.Text>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
         );
    }
}