import React from 'react';
import './PendingOrder.css';
import location from '../../assets/images/location.png';

const PendingOrder = (props) => {

    let hell = null;

    if (props.type === "a") {
        hell = <>
            <button title="Accept" className="PendingOrder-action-btn" id="PendingOrder-accept" onClick={() => props.functions["accept"](props.order)}>
                &#10004;
            </button>
            <button title="Reject"  className="PendingOrder-action-btn" id="PendingOrder-reject" onClick={() => props.functions["reject"](props.order)}>
                &#10006;
            </button>
            <button title="Location"  className="PendingOrder-action-btn" id="PendingOrder-location" onClick={() => props.functions["location"](true, props.order["uadd"])}>
                <img src={location} alt="L" />
            </button>
        </>
    }

    if (props.type === "b") {
        hell = <>
            <button title="Prepared" className="PendingOrder-action-btn" id="PendingOrder-accept" onClick={() => props.functions["prepared"](props.order)}>
                &#10004;
            </button>
            <button title="Location" className="PendingOrder-action-btn" id="PendingOrder-location" onClick={() => props.functions["location"](true, props.order["uadd"])}>
                <img src={location} alt="L" />
            </button>
        </>
    }

    if (props.type === "c") {
        hell = <>
            <button title="Delivered" className="PendingOrder-action-btn" id="PendingOrder-accept" onClick={() => props.functions["delivered"](props.order)}>
                &#10004;
            </button>
            <button title="Location" className="PendingOrder-action-btn" id="PendingOrder-location" onClick={() => props.functions["location"](true, props.order["uadd"])}>
                <img src={location} alt="L" />
            </button>
        </>
    }

    let delType = "";
    if (props.order["delStatus"][0] === "V") {
        delType = "Delivery required"
    }

    return (<div className="PendingOrder">
        <div className="PendingOrder-details">
            <h3>{props.order["dname"]} x{props.order["quantity"]}</h3>
            <p style={{ color: 'var(--black)' }}>{props.order["uname"]}</p>
            <p>{props.order["uphone"]}</p>
            <p>{props.order["uadd"].split('$')[2]}</p>
            <p style={{ color: 'rgba(255,0,0,0.8)', fontWeight: 'bold' }}>{delType}</p>
        </div>
        <div className="PendingOrder-actions">
            {hell}
        </div>
    </div>)
}

export default PendingOrder;