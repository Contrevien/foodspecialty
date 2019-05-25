import React from 'react';
import './AdminHome.css';
import AdminNav from '../AdminNav/AdminNav';

export default class AdminHome extends React.Component {

    state = {
        pendingDishes: 0,
        pendingQueries: 0
    }

    componentDidMount() {
        fetch('/Dish/GetAllDishes')
            .then(res => res.json())
            .then(res => {
                let final = []
                for (var r of res) {
                    if (r["status"] === "N") {
                        final.push(r);
                    }
                }
                fetch('/Users/GetPendingQueriesUser')
                    .then(res => res.json())
                    .then(res => {
                        fetch('/Vendor/GetPendingQueriesVendor')
                            .then(res => res.json())
                            .then(res1 => {
                                console.log(res, res1);
                                let queries = [...res, ...res1];
                                this.setState({
                                    pendingDishes: final.length,
                                    pendingQueries: queries.length
                                });
                            })
                            .catch(err => console.log(err));
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }

    render() {
        console.log(this.props.user);
        return (<div className="AdminHome">
            <AdminNav selected="0" logout={this.props.logout} />
            <div className="UserProfile-display" id="AdminDisplay">
                <div><p>{this.state.pendingDishes}</p><p>Pending Dishes</p></div>
                <div><p>{this.state.pendingQueries}</p><p>Pending Queries</p></div>
            </div>
        </div>)
    }
}