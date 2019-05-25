import React from 'react';
import './AdminOrders.css';
import AdminNav from '../AdminNav/AdminNav';

export default class AdminOrders extends React.Component {

    state = {
        id: "",
        why: 0,
        fetchedOrders: []
    }

    fetchOrders = () => {
        if (this.state.id === "") {
            this.setState({
                why: 1
            })
            return;
        } else {
            this.setState({
                why: 0
            })
        }

        if (this.state.id[0] === "O") {
            fetch('/Order/GetOrders/' + this.state.id)
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res) {
                        let store = [res]
                        this.setState({
                            fetchedOrders: store
                        })
                    } else {
                        this.setState({
                            why: 1
                        })
                    }
                })
                .catch(err => this.setState({ why: 1 }));
        } else if (this.state.id[0] === "U") {
            fetch('/Order/GetOrdersByUid/' + this.state.id.toLocaleUpperCase())
                .then(res => res.json())
                .then(res => {
                    if (res) {
                        this.setState({
                            fetchedOrders: res
                        })
                    } else {
                        this.setState({
                            why: 1
                        })
                    }
                })
                .catch(err => this.setState({ why: 1 }));
        } else if (this.state.id[0] === "V") {
            fetch('/Order/GetOrdersByVid/' + this.state.id.toLocaleUpperCase())
                .then(res => res.json())
                .then(res => {
                    if (res) {
                        this.setState({
                            fetchedOrders: res
                        })
                    } else {
                        this.setState({
                            why: 1
                        })
                    }
                })
                .catch(err => this.setState({ why: 1 }));
        } else if (this.state.id[0] === "D") {
            fetch('/Order/GetOrdersByDid/' + this.state.id.toLocaleUpperCase())
                .then(res => res.json())
                .then(res => {
                    if (res) {
                        this.setState({
                            fetchedOrders: res
                        })
                    } else {
                        this.setState({
                            why: 1
                        })
                    }
                })
                .catch(err => this.setState({ why: 1 }));
        } else {
            this.setState({ why: 1 });
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {

        let orders = this.state.fetchedOrders ? this.state.fetchedOrders.map(ord => <div className="AdminOrders-order" >
            <h2>{ord["oid"]}</h2>
            <div>
                <p>UID: {ord["uid"]}</p>&nbsp;&nbsp;
                <p>VID: {ord["vid"]}</p>&nbsp;&nbsp;
                <p>DID: {ord["did"]}</p>&nbsp;&nbsp;
                <p>QTY: {ord["quantity"]}</p>&nbsp;&nbsp;
                <p>DEL: {ord["delStatus"]}</p>
            </div>
        </div>) : null;

        return (<div className="AdminUsers">
            <AdminNav logout={this.props.logout} selected="4" />
            <div className="AdminUsers-display">
                <h2>Enter Order ID / User ID / Vendor ID / Dish ID</h2>
                <input type="text" className="Register-input"
                    name="id" value={this.state.id} autoComplete="off"
                    spellCheck={false} onChange={this.handleChange}
                    onKeyDown={(e) => e.key === "Enter" ? this.fetchOrders(e) : null}
                />
                <button className="Register-btn" onClick={this.fetchUser}>Fetch</button>
                <p className="Register-error-message">{this.state.why === 1 ? "Why?" : ""}</p>

                <hr />

                {orders}
            </div>
        </div>)
    }

}