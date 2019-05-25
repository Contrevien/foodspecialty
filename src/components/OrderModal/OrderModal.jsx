import React from 'react';
import './OrderModal.css';
import { Link } from 'react-router-dom';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const OrderModal = (props) => {

    let common = <strong>{props.order["dname"]} ({props.order["quantity"]} plates)</strong>;

    let para = null;
    if (props.order["delStatus"][0] === "C") {
        if (props.order["delStatus"].length === 1) {
            para = <p>Awaiting approval from Vendor for your order of {common}...</p>
        } else if (props.order["delStatus"].length === 2 && props.order["delStatus"][1] === "A") {
            para = <p>Your order of {common} is being prepared</p>
        } else {
            para = <p>Please pick up your order of {common}</p>
        }
    } else if (props.order["delStatus"][0] === "V") {
        if (props.order["delStatus"].length === 1) {
            para = <p>Awaiting approval from Vendor for your order of {common}...</p>
        } else if (props.order["delStatus"].length === 2 && props.order["delStatus"][1] === "A") {
            para = <p>Your order of {common} is being prepared</p>
        } else {
            para = <p>Your order of {common} will be delivered by Vendor in {props.order["delStatus"].substr(3)}</p>
        }
    } else if (props.order["delStatus"][0] === "R") {
        para = <p>Your order was REJECTED by user, refund will be initiated soon</p>
    } else if (props.order["delStatus"][0] === "D") {
        para = <p>Your order was DELIVERED, hope you enjoy the meal</p>
    }


    const mapStyles = {
        width: '90%',
        height: '170px',
        borderRadius: '4px',
        boxShadow: 'inset 2px 7px 25px rgba(0,0,0,0.36)'
    }

    return (<div className="OrderModal">
        <h2>Order: <span style={{ color: "#777" }}>{props.order["oid"]}</span></h2>
        <hr />
        <div className="OrderModal-map">
            {props.order["vadd"] ? <Map
                    google={props.google}
                    zoom={15}
                    zoomControl={false}
                    streetViewControl={false}
                    fullscreenControl={false}
                    mapTypeControl={false}
                    style={mapStyles}
                    initialCenter={{
                        lat: props.order["vadd"] ? parseFloat(props.order["vadd"].split('$')[0]) : 12.1,
                        lng: props.order["vadd"] ? parseFloat(props.order["vadd"].split('$')[1]) : 76.1
                    }}
                    >
                    <Marker />
                </Map> : null }
        </div>
        <div className="OrderDetails-spread">
            {para}
        </div>
        <div className="OrderModal-delivered-or-not">
            <hr />
            <h3>Vendor's Contact details</h3>
            <p>{props.order["vname"]}</p>
            <p>{props.order["vphone"]}</p>
            <p>{props.order["vadd"].split('$')[2]}</p>
        </div>
    </div>)
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAV9ac8VzlYvmYhy3uSXJyAVUOq_TySMw4'
  })(OrderModal);