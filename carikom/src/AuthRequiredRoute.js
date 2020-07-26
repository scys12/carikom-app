import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import AuthService from './component/AuthService';

class AuthRequiredRoute extends Route{    
    render() {
        if(!AuthService.isAuthenticated()){
            return <Redirect to={{
                pathname: `/auth`,                            
                state: {
                    message : "Anda harus login terlebih dahulu"
                }
            }}/>
        }else{
          return <this.props />
        }
    }
}

export default AuthRequiredRoute;