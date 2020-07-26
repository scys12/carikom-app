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
import SearchResult from './component/SearchResult';
import AllProducts from './component/AllProducts';
import AuthRequiredRoute from './AuthRequiredRoute';

class App extends Component {
    state = {  }
    render() { 
        return ( 
            <Router>
                <>
                    <AppNav/>
                    <Switch>
                        <Route exact path="/" component={Home}/> 
                        <Route exact path="/search" component={SearchResult}/>
                        <Route exact path="/items" component={AllProducts}/>
                        <Route exact path="/auth" component={Auth}/>
                        <AuthRequiredRoute path="/user/item" component={UserItem}/>
                        <AuthRequiredRoute exact path="/user/item/tambah" component={TambahProduk}/>
                        <AuthRequiredRoute exact path="/user/item/edit/:id" component={EditProduk}/>
                        <AuthRequiredRoute exact path="/user/item/:id" component={ItemDetail}/>
                        <AuthRequiredRoute exact path="/user/profile" component={UserDashboard}/>
                        <AuthRequiredRoute exact path="/user/edit" component={EditProfile}/>
                    </Switch>
                </>
            </Router>
         );
    }
}
 
export default App;