import React, { Component } from 'react';
import './UserHome.css';
import NavBar from '../NavBar/NavBar';
import Dishes from '../Dishes/Dishes';
import Loader from '../Loader/Loader';

export default class UserHome extends Component {

    render() {
        return (<div className="UserHome">
            <NavBar selected="0" logout={this.props.logout} />
            <Dishes user={this.props.user} />
        </div>);
    }
}