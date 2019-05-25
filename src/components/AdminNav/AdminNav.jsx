import React from 'react';
import './AdminNav.css';
import explore from '../../assets/images/explore.png';
import logout from '../../assets/images/logout.png';
import { Link } from 'react-router-dom';

const AdminNav = (props) => {

    return (
        <div className="NavBar">
            <ul style={{ listStyle: 'none', padding: '0px' }}>
                <Link to={"/AdminHome"}>
                    <li className={props.selected === "0" ? "NavBar-el selected" : "NavBar-el"}
                        data-name="Home">
                        H
                    </li>
                </Link>
                <Link to={"/AdminUsers"}>
                    <li className={props.selected === "1" ? "NavBar-el selected" : "NavBar-el"} data-name="Manage Users">
                        U
                    </li>
                </Link>
                <Link to={"/AdminVendors"}>
                    <li className={props.selected === "2" ? "NavBar-el selected" : "NavBar-el"} data-name="Manage Vendors">
                        V
                    </li>
                </Link>
                <Link to="/AdminCat">
                    <li className={props.selected === "3" ? "NavBar-el selected" : "NavBar-el"} data-name="Manage Categories">
                        C
                    </li>
                </Link>
                <Link to="/AdminOrders">
                    <li className={props.selected === "4" ? "NavBar-el selected" : "NavBar-el"} data-name="View Orders">
                        O
                    </li>
                </Link>
                <Link to="/PendingDishes">
                    <li className={props.selected === "5" ? "NavBar-el selected" : "NavBar-el"} data-name="Pending Dishes">
                        D
                    </li>
                </Link>
                <Link to="/PendingQueries">
                    <li className={props.selected === "6" ? "NavBar-el selected" : "NavBar-el"} data-name="Pending Queries">
                        Q
                    </li>
                </Link>
            </ul>
        </div>
    );
}

export default AdminNav;