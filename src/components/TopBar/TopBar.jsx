import React from 'react';
import './TopBar.css';
import location from '../../assets/images/location.png';

const TopBar = (props) => {
    return (
        <div className="TopBar">
            
            <div className="TopBar-location">
                <img src={location} alt="" /> <span style={{ verticalAlign: 'middle' }}>{props.location}</span>
            </div>
        </div>
        );
}

export default TopBar;