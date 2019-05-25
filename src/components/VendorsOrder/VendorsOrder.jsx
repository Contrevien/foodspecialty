import React from 'react';
import './VendorsOrder.css';
import NavBar from '../NavBar/NavBar';
import PreviousOrder from '../PreviousOrder/PreviousOrder';

export default class VendorsOrder extends React.Component {

    state = {
        orders: []
    }

    componentDidMount() {
        fetch('/Order/GetOrdersByVid/' + this.props.user["vid"])
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if (res !== null) {
                    this.setState({ orders: res });
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        return (<div className="VendorsOrder-container">
            <NavBar selected="2" logout={this.props.logout} />
            <div className="VendorsOrder">
                <h1>Your previous orders</h1>
                {this.state.orders.sort(order => order["orderTime"]).reverse().map((order, i) => {
                    return <PreviousOrder order={order} key={i} />
                })}
            </div>
        </div>)
    }
}