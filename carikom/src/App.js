import React, { Component } from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import Item from './Item';
import Home from './Home';

class App extends Component {
    state = {  }
    render() { 
        return ( 
            <Router>
                <Switch>
                    <Route path="/" exact={true} component={Home}/>
                    <Route path="/items" exact={true} component={Item}/>                
                </Switch>
            </Router>
         );
    }
}
 
export default App;