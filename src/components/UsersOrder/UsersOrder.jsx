import React from 'react';
import './UsersOrder.css';
import NavBar from '../NavBar/NavBar';
import PreviousOrder from '../PreviousOrder/PreviousOrder';

export default class UsersOrder extends React.Component {

    state = {
        orders: []
    }

    componentDidMount() {
        fetch('/Order/GetOrdersByUid/' + this.props.user["uid"])
            .then(res => res.json())
            .then(res => {
                if (res !== null) {
                    this.setState({ orders: res });
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        return (<div className="UsersOrder-container">
            <NavBar selected="2" logout={this.props.logout} />
            <div className="UsersOrder">
                <h1>Your previous orders</h1>
                {this.state.orders.sort(order => order["orderTime"]).reverse().map((order, i) => {
                    return <PreviousOrder order={order} key={i} />
                })}
            </div>
        </div>)
    }
}