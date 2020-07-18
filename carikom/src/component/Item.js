import React, { Component } from 'react'

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
                Loading...
                </div>
            );
        }
        return (
            <div>
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