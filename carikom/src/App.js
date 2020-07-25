import React, { Component } from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import Home from './component/Home';
import Auth from './component/Auth';
import AppNav from './component/AppNav'
import UserDashboard from './component/UserDashboard';
import TambahProduk from './component/TambahProduk';
import EditProduk from './component/EditProduk';
import UserItem from './component/UserItem';
import ItemDetail from './component/ItemDetail';
import EditProfile from './component/EditProfile';

class App extends Component {
    state = {  }
    render() { 
        return ( 
            <Router>
                <div>
                    <AppNav/>
                    <Switch>
                        <Route exact path="/" component={Home}/> 
                        <Route exact path="/user/item" component={UserItem}/>
                        <Route exact path="/auth" component={Auth}/>
                        <Route exact path="/user/item/tambah" component={TambahProduk}/>
                        <Route exact path="/user/item/edit/:id" component={EditProduk}/>
                        <Route exact path="/user/item/:id" component={ItemDetail}/>
                        <Route exact path="/user/profile" component={UserDashboard}/>
                        <Route exact path="/user/edit" component={EditProfile}/>
                    </Switch>
                </div>
            </Router>
         );
    }
}
 
export default App;