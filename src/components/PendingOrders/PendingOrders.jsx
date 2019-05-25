import React from 'react';
import './PendingOrders.css';
import PendingOrdersSlab from '../PendingOrdersSlab/PendingOrdersSlab';
import back from '../../assets/images/back.png';
import UserLocationModal from '../UserLocationModal/UserLocationModal';

export default class PendingOrders extends React.Component {

    state = {
        atOne: [],
        atTwo: [],
        atThree: [],
        viewLocation: false,
        address: ""
    }

    componentDidMount() {
        fetch('/Vendor/GetInProgressForVendor/' + this.props.user["vid"])
            .then(res => res.json())
            .then(res2 => {
                let a = [], b = [], c = [];
                for (var r of res2) {
                    if (r["delStatus"] === "V" || r["delStatus"] === "C") {
                        a.push(r);
                    } else if (r["delStatus"] === "VA" || r["delStatus"] === "CA") {
                        b.push(r);
                    } else if (r["delStatus"].length > 2) {
                        c.push(r);
                    }
                }
                console.log(res2)
                this.setState({ atOne: a, atTwo: b, atThree: c });
            })
            .catch(err => console.log(err));
    }

    toggleLocation = (value, address) => {
        if(value) {
            this.setState({
                viewLocation: value,
                address: address
            })
        } else {
            this.setState({
                viewLocation: false,
                address: ""
            })
        }
    }

    accept = (order) => {
        fetch('/Order/UpdateOrder', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Oid: order["oid"],
                Did: order["did"],
                Uid: order["uid"],
                Vid: order["vid"],
                OrderTime: order["orderTime"],
                Quantity: order["quantity"],
                DelStatus: order["delStatus"] + "A"
            })
        })
            .then(res => res.json())
            .then(res => {
                if (res) {
                    let temp = [...this.state.atOne];
                    let found = temp.findIndex(ord => ord["oid"] === ord["oid"]);
                    temp[found]["delStatus"] += "A";
                    let extract = temp[found];
                    temp.splice(found, 1);
                    let tempTwo = [...this.state.atTwo];
                    tempTwo.push(extract);
                    this.setState({
                        atOne: temp,
                        atTwo: tempTwo
                    })
                }
            })
            .catch(err => console.log(err));
    }

    reject = (order) => {
        fetch('/Order/UpdateOrder', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Oid: order["oid"],
                Did: order["did"],
                Uid: order["uid"],
                Vid: order["vid"],
                OrderTime: order["orderTime"],
                Quantity: order["quantity"],
                DelStatus: "R"
            })
        })
            .then(res => res.json())
            .then(res => {
                if (res) {
                    let temp = [...this.state.atOne];
                    let found = temp.findIndex(ord => ord["oid"] === ord["oid"]);
                    temp.splice(found, 1);
                    this.setState({
                        atOne: temp
                    })
                }
            })
            .catch(err => console.log(err));
    }

    prepared = (order) => {
        fetch('/Order/UpdateOrder', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Oid: order["oid"],
                Did: order["did"],
                Uid: order["uid"],
                Vid: order["vid"],
                OrderTime: order["orderTime"],
                Quantity: order["quantity"],
                DelStatus: order["delStatus"] + ":12"
            })
        })
            .then(res => res.json())
            .then(res => {
                if (res) {
                    let temp = [...this.state.atTwo];
                    let found = temp.findIndex(ord => ord["oid"] === ord["oid"]);
                    temp[found]["delStatus"] += ":12";
                    let extract = temp[found];
                    temp.splice(found, 1);
                    let tempTwo = [...this.state.atThree];
                    tempTwo.push(extract);
                    this.setState({
                        atTwo: temp,
                        atThree: tempTwo
                    })
                }
            })
            .catch(err => console.log(err));
    }

    delivered = (order) => {
        fetch('/Order/UpdateOrder', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Oid: order["oid"],
                Did: order["did"],
                Uid: order["uid"],
                Vid: order["vid"],
                OrderTime: order["orderTime"],
                Quantity: order["quantity"],
                DelStatus: "D"
            })
        })
            .then(res => res.json())
            .then(res => {
                if (res) {
                    let temp = [...this.state.atThree];
                    let found = temp.findIndex(ord => ord["oid"] === ord["oid"]);
                    temp.splice(found, 1);
                    this.setState({
                        atThree: temp
                    })
                }
            })
            .catch(err => console.log(err));
    }

    render() {

        let functionBundle = {
            accept: this.accept,
            reject: this.reject,
            prepared: this.prepared,
            delivered: this.delivered,
            location: this.toggleLocation
        }

        return (
            <>
            <div className="PendingOrders">
                <img className="PendingOrders-back" src={back} alt="Back" onClick={this.props.close} />
                <PendingOrdersSlab
                    heading="New Orders"
                    orders={this.state.atOne}
                    type="a"
                    functions={functionBundle}
                />
                <PendingOrdersSlab
                    heading="Being Prepared"
                    orders={this.state.atTwo}
                    type="b"
                    functions={functionBundle}
                />
                <PendingOrdersSlab
                    heading="Read for Delivery"
                    orders={this.state.atThree}
                    type="c"
                    functions={functionBundle}
                />
            </div>
            {this.state.viewLocation ? 
                <>
                    <div className="Backdrop" style={{zIndex: '10000'}} onClick={() => this.toggleLocation(false, "")}></div>
                    <UserLocationModal address={this.state.address} /> 
                </>
                : null}
                </>
            )
    }
}