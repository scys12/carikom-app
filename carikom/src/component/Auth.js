import React, { Component } from 'react';
import Login from './Login'
import Register from './Register'

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isLoginOpen: true,
            isRegisterOpen: false
        };
    }

    showLoginBox() {
        this.setState({isLoginOpen: true, isRegisterOpen: false});
    }
    
    showRegisterBox() {
        this.setState({isRegisterOpen: true, isLoginOpen: false});
    }

    render() { 
        return ( 
            <div className="root-container">
                <div className="box-controller">                                        
                    <div className={"controller " + (this.state.isLoginOpen ? "selected-controller" : "")} onClick={() => this.showLoginBox()}>
                        Login
                    </div>
                    <div className={"controller " + (this.state.isRegisterOpen ? "selected-controller" : "")} onClick={() => this.showRegisterBox()}>
                        Register
                    </div>
                </div>

                <div className="box-container">
                    {this.state.isLoginOpen && <Login/>}
                    {this.state.isRegisterOpen && <Register/>}
                </div>
            </div>
         );
    }
}
 
export default Auth;