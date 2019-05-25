import React from 'react';
import './AdminVendors.css';
import AdminNav from '../AdminNav/AdminNav';

export default class AdminVendors extends React.Component {

    state = {
        vid: "",
        why: 0,
        fetchedUser: null
    }

    fetchUser = () => {
        if (this.state.vid === "") {
            this.setState({
                why: 1
            })
            return;
        } else {
            this.setState({
                why: 0
            })
        }

        fetch('/Vendor/GetVendorById/' + this.state.vid.toLocaleUpperCase())
            .then(res => res.json())
            .then(res => {
                if (res) {
                    this.setState({
                        fetchedUser: res
                    }, () => console.log(this.state.fetchedUser))
                }
            })
            .catch(err => this.setState({ why: 1 }));
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    blockUser = (e) => {

        let haha = { ...this.state.fetchedUser };
        haha["status"] = haha["status"] === "B" ? "U" : "B";

        fetch('/Vendor/UpdateVendor', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(haha)
        })
            .then(res => res.json())
            .then(res => {
                if (res) {
                    this.setState({
                        fetchedUser: haha
                    })
                }
            })
            .catch(err => console.log(err));
    }

    render() {

        let user = this.state.fetchedUser ? <div className="AdminUsers-user">
            <h2>{this.state.fetchedUser["name"]}</h2>
            <div>
                <p>UID: {this.state.fetchedUser["vid"]}</p>&nbsp;&nbsp;
            <p>EMAIL: {this.state.fetchedUser["email"]}</p>&nbsp;&nbsp;
            <p>PHONE: {this.state.fetchedUser["phone"]}</p>&nbsp;&nbsp;
            <p>ADD: {this.state.fetchedUser["address"]}</p>
            </div>
            <button className="AdminUsers-block" onClick={this.blockUser}>
                {this.state.fetchedUser["status"] === "B" ? "Unblock" : "Block"}
            </button>
        </div> : null;

        return (<div className="AdminUsers">
            <AdminNav logout={this.props.logout} selected="2" />
            <div className="AdminUsers-display">
                <h2>Enter Vendor's ID</h2>
                <input type="text" className="Register-input"
                    name="vid" value={this.state.vid} autoComplete="off"
                    spellCheck={false} onChange={this.handleChange}
                    onKeyDown={(e) => e.key === "Enter" ? this.fetchUser(e) : null}
                />
                <button className="Register-btn" onClick={this.fetchUser}>Fetch</button>
                <p className="Register-error-message">{this.state.why === 1 ? "Why?" : ""}</p>
                {user}
            </div>
        </div>)
    }

}