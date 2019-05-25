import React from 'react';
import './OrderedBubble.css';

export default class OrderedBubble extends React.Component {
    render() {
        return (<button
            onClick={this.props.handler}
            className={this.props.order === null || this.props.hasClickedOnOrder ? "OrderedBubble" : "OrderedBubble bounce"}>
            Order
        </button>)
    }
}