import React from 'react';
import './PreviousOrder.css';

const PreviousOrder = (props) => {

    let details = props.order["uname"] ? <div className="PreviousOrder-details">
        <p style={{ color: 'black' }}>{props.order["uname"]}</p>
        <p>{props.order["uphone"]}</p>
        <p>{props.order["uadd"]}</p>
    </div> : <div className="PreviousOrder-details">
            <p style={{ color: 'black' }}>{props.order["vname"]}</p>
            <p>{props.order["vphone"]}</p>
            <p>{props.order["vadd"] ? props.order["vadd"].split('$')[2] : ""}</p>
        </div>


    const dStyles = {
        background: props.order["delStatus"] === "D" || props.order["delStatus"] === "DA" ? 
            'var(--green)' : props.order["delStatus"] === "R" || props.order["delStatus"] === "RA" ?
                'rgba(255,0,0,0.8)' : 'var(--yellow)'
    }

    return (
        <div className="PreviousOrder">
            <h2
                id="PreviousOrder-head"
                style={dStyles}
            >
                {props.order["dname"]}
                &nbsp;x<span style={{ fontFamily: 'Lobster' }}>
                    {props.order["quantity"]}
                </span>
                <span style={{ float: 'right' }}>
                    &#8377;{parseInt(props.order["dprice"]) * parseInt(props.order["quantity"])}
                </span>
            </h2>
            {details}
            <p className="PreviousOrder-time">{props.order["orderTime"]}</p>
        </div>
        );
}

export default PreviousOrder;