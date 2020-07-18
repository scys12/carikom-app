import React, { Component } from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import Item from './component/Item';
import Home from './component/Home';
import Auth from './component/Auth';
import AppNav from './component/AppNav'

class App extends Component {
    state = {  }
    render() { 
        return ( 
            <Router>
                <div>
                    <AppNav/>
                    <Switch>
                        <Route exact path="/" component={Home}/> 
                        <Route exact path="/items" component={Item}/>
                        <Route exact path="/auth" component={Auth}/>
                    </Switch>
                </div>
            </Router>
         );
    }
}
 
export default App;