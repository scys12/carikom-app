import React, { Component } from 'react'
import AppNav from './AppNav';

class Item extends Component {
    state = {
        isLoading : true,
        Items : []
    };

    async componentDidMount(){
        const response = await fetch('/api/items');
        const body = await response.json();
        this.setState({
            Items : body,
            isLoading : false
        });
    }
    render() { 
        const {Items, isLoading} = this.state;
        if (isLoading) {
            return (<div>
                <AppNav/>
                Loading...
                </div>
            );
        }
        return (
            <div>
                <AppNav/>
                <h2>
                    Items
                </h2>
                {
                    Items.map( item => 
                        <div id={item.id}>
                            {item.name}
                        </div>
                    )
                }
            </div>
        );
    }
}
 
export default Item;