import React, { Component } from 'react';
import {Redirect,Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import Item from './component/Item';
import Home from './component/Home';
import Auth from './component/Auth';
import AppNav from './component/AppNav'
import UserDashboard from './component/UserDashboard';
import TambahProduk from './component/TambahProduk';

class App extends Component {
    state = {  }
    render() { 
        return ( 
            <Router>
                <div>
                    <AppNav/>
                    <Switch>
                        <Route exact path="/" component={Home}/> 
                        <Route exact path="/user/item" component={Item}/>
                        <Route exact path="/auth" component={Auth}/>
                        <Route exact path="/user/item/tambah" component={TambahProduk}/>
                        <Route exact path="/user/profile" component={UserDashboard}/>
                    </Switch>
                </div>
            </Router>
         );
    }
}
 
export default App;