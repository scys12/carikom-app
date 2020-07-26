import React, { Component } from 'react';
import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
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
import ProductsCategory from './component/ProductsCategory';
import AuthService from './component/AuthService';

function preCondition(WrappedComponent) {
    let isLogin = null;
    return class extends Component {
        componentWillMount(){
            if (AuthService.isAuthenticated()) {
                isLogin = true
            }else isLogin = false
        }

        render() {
            if(isLogin){
                return <WrappedComponent {...this.props} />
            }else{
                return <Redirect to={{
                    pathname: `/auth`,
                    state: {
                        message : "Anda harus login terlebih dahulu"
                    }
                }}/>
            }
        }
    }
}

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
                        <Route exact path="/category/item/:id" component={ProductsCategory}/>
                        <Route exact path="/auth" component={Auth}/>
                        <Route exact path="/user/item" component={preCondition(UserItem)}/>
                        <Route exact path="/user/item/tambah" component={preCondition(TambahProduk)}/>
                        <Route exact path="/user/item/edit/:id" component={preCondition(EditProduk)}/>
                        <Route exact path="/user/item/:id" component={preCondition(ItemDetail)}/>
                        <Route exact path="/user/profile" component={preCondition(UserDashboard)}/>
                        <Route exact path="/user/edit" component={preCondition(EditProfile)}/>
                    </Switch>
                </>
            </Router>
         );
    }
}
 
export default App;