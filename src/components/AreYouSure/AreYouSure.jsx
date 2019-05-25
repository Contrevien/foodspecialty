import React from 'react';
import './AreYouSure.css';

const AreYouSure = (props) => {

    return (<>
        <div className="Backdrop" id="AreYouSureBD" onClick={props.no}></div>
        <div className="AreYouSure">
        <h2>Are you sure?</h2>
        <div className="YesOrNo">
            <button onClick={props.yes} className="yes">Yes</button>
            <button onClick={props.no} className="no">No</button>
        </div>
    </div></>);
}

export default AreYouSure;