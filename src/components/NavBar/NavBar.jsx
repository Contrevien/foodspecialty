import React from 'react';
import './NavBar.css';
import explore from '../../assets/images/explore.png';
import user from '../../assets/images/user.png';
import contact from '../../assets/images/contact.png';
import faq from '../../assets/images/faq.png';
import { Link } from 'react-router-dom';
import logout from '../../assets/images/logout.png';
import orders from '../../assets/images/orders.png';

const NavBar = (props) => {

    let urlPrefix = "User";
    if (props.type === "1")
        urlPrefix = "Vendor";

    return (
        <div className="NavBar">
            <ul style={{ listStyle: 'none', padding: '0px' }}>
                <Link to={"/" + urlPrefix + "Home"}>
                    <li className={props.selected === "0" ? "NavBar-el selected" : "NavBar-el"}
                    data-name="Home">
                        <img src={explore} alt="Explore" />
                    </li>
                </Link>
                <Link to={"/" + urlPrefix + "Profile"}>
                    <li className={props.selected === "1" ? "NavBar-el selected" : "NavBar-el"} data-name="Profile">
                        <img src={user} alt="Profile" />
                    </li>
                </Link>
                <Link to={"/" + urlPrefix + "Order"}>
                    <li className={props.selected === "2" ? "NavBar-el selected" : "NavBar-el"} data-name="Orders">
                        <img src={orders} alt="Orders" />
                    </li>
                </Link>
                <Link to="/Contact">
                    <li className={props.selected === "3" ? "NavBar-el selected" : "NavBar-el"} data-name="Contact">
                        <img src={contact} alt="Contact" />
                    </li>
                </Link>
                <Link to="/FAQ">
                    <li className={props.selected === "4" ? "NavBar-el selected" : "NavBar-el"} data-name="FAQ">
                        <img src={faq} alt="FAQ" />
                    </li>
                </Link>
                <Link to={"/" + urlPrefix + "Home"}>
                    <li className={props.selected === "5" ? "NavBar-el selected" : "NavBar-el"} data-name="Logout">
                        <button className="NavBar-logout" onClick={props.logout} >
                            <img src={logout} alt="Logout" />
                        </button>
                    </li>
                </Link>
            </ul>
        </div>
        );
}

export default NavBar;