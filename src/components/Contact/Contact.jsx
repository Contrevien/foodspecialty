import React from 'react';
import './Contact.css';
import NavBar from '../NavBar/NavBar';

export default class Contact extends React.Component {

    state = {
        choice: "0",
        description: "",
        response: !this.props.user["response"] ? "" : this.props.user["response"].substr(1),
        descriptionError: 0,
        someError: 0,
        isLoading: false,
        responseState: !this.props.user["response"] ? "" : this.props.user["response"][0],
        queryType: this.props.type === 0 ? [
            "Order delivery related issue",
            "Any other issue"
        ] : [
                "Customer related issue",
                "Any other issue"
            ]
    }

    handleType = (e) => {
        this.setState({
            choice: e.target.value
        })
    }

    handleInput = (e) => {
        if (e.target.value === '') {
            this.setState({
                description: e.target.value,
                descriptionError: 1
            });
        } else {
            this.setState({
                description: e.target.value,
                descriptionError: 0
            })
        }
    }

    addQuery = () => {
        if (this.state.descriptionError === 0 &&
            this.state.description !== '') {
            let query = this.state.choice + this.state.description;
            this.setState({ isLoading: true });
            if (this.props.type === 0) {
                fetch('/Users/UpdateUser', {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Uid: this.props.user["uid"],
                        Name: this.props.user["name"],
                        Email: this.props.user["email"],
                        Password: this.props.user["password"],
                        Phone: this.props.user["phone"],
                        Address: this.props.user["address"],
                        Query: query,
                        Response: "AAwaiting response from admin",
                        Status: this.props.user["status"]
                    })
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res) {
                            this.setState({
                                isLoading: false,
                                description: "",
                                response: "Awaiting response from admin",
                                responseState: "A"
                            })
                            let user = { ...this.props.user };
                            user["query"] = query;
                            user["response"] = "AAwaiting response from admin"
                            this.props.updateUser(user);
                        } else {
                            this.setState({
                                someError: 1,
                                isLoading: false
                            })
                        }
                    })
                    .catch(err => {
                        this.setState({
                            someError: 1,
                            isLoading: false
                        })
                    })
            } else {
                fetch('/Vendor/UpdateVendor', {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Vid: this.props.user["vid"],
                        Name: this.props.user["name"],
                        Email: this.props.user["email"],
                        Password: this.props.user["password"],
                        Phone: this.props.user["phone"],
                        Address: this.props.user["address"],
                        AccountInfo: this.props.user["accountInfo"],
                        Query: query,
                        Response: "AAwaiting response from admin",
                        Status: this.props.user["status"]
                    })
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res) {
                            this.setState({
                                isLoading: false,
                                description: "",
                                response: "Awaiting response from admin",
                                responseState: "A"
                            })
                            let user = { ...this.props.user };
                            user["query"] = query;
                            user["response"] = "AAwaiting response from admin"
                            this.props.updateUser(user);
                        } else {
                            this.setState({
                                someError: 1,
                                isLoading: false
                            })
                        }
                    })
                    .catch(err => {
                        this.setState({
                            someError: 1,
                            isLoading: false
                        })
                    })
            }
        } else {
            this.setState({ descriptionError: 1 })
        }
    }

    render() {

        let message = "";

        if (this.state.descriptionError === 1)
            message = "Please provide a description"
        else if (this.state.someError === 1)
            message = "Something went wrong, Try again"
        else
            message = ""

        let responseClassName = "Contact-response";

        if (this.state.responseState === "A")
            responseClassName = "Contact-response Contact-awaiting"
        else if (this.state.responseState === "S")
            responseClassName = "Contact-response Contact-solved"

        return (
            <div className="Contact">
                <NavBar selected="3" logout={this.props.logout} />
                <div className="Contact-display">
                    <h2>Contact us for Queries</h2>
                    <select onChange={this.handleType}>
                        {this.state.queryType.map((query, i) =>
                            <option value={i}>{query}</option>
                        )}
                    </select>
                    <textarea placeholder="Description"
                        name="description" className="Contact-input"
                        value={this.state.description} spellCheck={false}
                        onChange={this.handleInput}>
                    </textarea>
                    <p className="Contact-error-message">{message}</p>
                    <button className="btn Contact-btn" onClick={this.addQuery}>Submit</button>

                    <hr />

                    <div className={responseClassName} >
                        <p>{this.state.response}</p>
                    </div>
                </div>
            </div>   
        )
    }
}