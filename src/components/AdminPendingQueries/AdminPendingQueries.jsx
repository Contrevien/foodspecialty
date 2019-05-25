import React from 'react';
import './AdminPendingQueries.css';
import AdminNav from '../AdminNav/AdminNav';

export default class AdminPendingQueries extends React.Component {

state = {
    pending: [],
    mounted: {},
    showMountedUser: false,
    reply: {}
}

componentDidMount() {
    fetch('/Users/GetPendingQueriesUser')
        .then(res => res.json())
        .then(res => {
            fetch('/Vendor/GetPendingQueriesVendor')
                .then(res => res.json())
                .then(res1 => {
                    let final = [...res, ...res1];
                    let temp = {};
                    for(var r of final) {
                        temp[r["email"]] = ""
                    }
                    this.setState({
                        pending: final,
                        reply: temp
                    });
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
}

handleReply = (e, p) => {
    let temp = {...this.state.reply};
    temp[p["email"]] = e.target.value;
    this.setState({
        reply: temp
    })
}

submitReply = p => {
    if(p["uid"]) {
        fetch('/Users/UpdateUser', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Uid: p["uid"],
                Name: p.name,
                Email: p.email,
                Password: p.password,
                Phone: p.phone,
                Address: p.address,
                Query: p["query"],
                Response: "S" + this.state.reply[p["email"]],
                Status: p["status"]
            })
        })
            .then(res => res.json())
            .then(res => {
                let found = this.state.pending.findIndex(x => x["uid"] === p["uid"]);
                let temp = [...this.state.pending];
                temp[found] = {
                    ...p, response: "S" + this.state.reply[p["email"]]
                }
                let re = {...this.state.reply};
                re[p["email"]] = "";
                this.setState({
                    pending: temp,
                    reply: re
                })
            })
            .catch(err => console.log(err));
    } else {
        fetch('/Vendor/UpdateVendor', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Vid: p["vid"],
                Name: p.name,
                Email: p.email,
                Password: p.password,
                Phone: p.phone,
                Address: p.address,
                AccountInfo: p["accountInfo"],
                Query: p["query"],
                Response: "S" + this.state.reply[p["email"]],
                Status: p["status"]
            })
        })
            .then(res => res.json())
            .then(res => {
                let found = this.state.pending.findIndex(x => x["vid"] === p["vid"]);
                let temp = [...this.state.pending];
                temp[found] = {
                    ...p, response: "S" + this.state.reply[p["email"]]
                }
                let re = {...this.state.reply};
                re[p["email"]] = "";
                this.setState({
                    pending: temp,
                    reply: re
                })
            })
            .catch(err => console.log(err));
    }
}

    render() {
        return(<div className="AdminUsers">
            <AdminNav logout={this.props.logout} selected="6" />
            <div className="AdminUsers-display">
                <h1 style={{
                    fontFamily: "Lobster"
                }}>Pending Queries</h1>
                {
                    this.state.pending.map(p => {
                        return <div className="APQ-Q">
                            <h2>{p["uid"] ? p["uid"] : p["vid"]}</h2>
                            <p><span className="APQ-Q-p q">Query: </span>{p["query"].slice(1)}</p>
                            <p><span className="APQ-Q-p t">Type: </span>{p["query"][0] === "0" ? "Order Related" : "Other"}</p>
                            <p><span className="APQ-Q-p r">Response: </span>{p["response"].slice(1)}</p>
                            <div>
                                <input name="reply" placeholder="Reply.." spellCheck={false} 
                                value={this.state.reply[p["email"]]} onChange={(e) => this.handleReply(e, p)} />
                                <button onClick={(e) => this.submitReply(p)}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>)
    }
}