import React from 'react';
import './PendingOrdersBubble.css';

const PendingOrdersBubble = (props) => {
    return (
        <button id="PendingOrdersBubble" className="OrderedBubble" onClick={props.handler}>
            Orders
        </button>
        )
}

export default PendingOrdersBubble;