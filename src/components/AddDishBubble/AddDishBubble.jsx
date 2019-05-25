import React from 'react';
import './AddDishBubble.css';

export default class AddDishBubble extends React.Component {
    render() {
        return (<button
            id="AddDishBubble"
            onClick={this.props.handler}
            className="OrderedBubble">
            New
        </button>)
    }
}