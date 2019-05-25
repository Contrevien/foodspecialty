import React from 'react';
import './PendingOrdersSlab.css';
import PendingOrder from '../PendingOrder/PendingOrder';

const PendingOrdersSlab = (props) => {

    let mainDisplay = props.orders.length === 0 ?
        <p className="zero-message">Empty</p> :
        props.orders.map((order, i) => {
            return <PendingOrder
                type={props.type}
                order={order}
                key={i}
                functions={props.functions}
            />
        })

    return (<div className="PendingOrdersSlab">
        <h2>{props.heading}</h2>
        {mainDisplay}
    </div>)
}

export default PendingOrdersSlab;