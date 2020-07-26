import React, { Component } from 'react';
import AuthService from './AuthService'
import { Container, Card, Button, Alert} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons';

export default class UserDashboard extends Component {
    state = { 
        currentUser: AuthService.getCurrentUser(),
        showAlertNotification : true,
        message: ''
     }

    componentDidMount(){
        if (typeof this.props.location.state != "undefined") {
            this.setState({message:this.props.location.state.message, type:this.props.location.state.type})
            setTimeout(() => {
                this.setState({
                    showAlertNotification:false,
                    message : ''
                })
                this.props.history.push({
                    pathname: "/user/profile",
                    state: {
                        message: "",
                        type: ""
                    }
                });
            }, 2000);
        }
    }
    render() {
        const {currentUser} = this.state;
        
        return ( 
            <Container>
                {(this.state.message && this.state.showAlertNotification) &&( 
                    <Alert key="1" variant={this.state.type}>
                        {this.state.message}
                    </Alert>
                )}
                <Card>
                    <Card.Header>
                        <p className="produk-header">Profile</p>
                        <Button variant="warning" style={{float: "right", color: "white"}} href="/user/edit">Edit Profile</Button>
                    </Card.Header>
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