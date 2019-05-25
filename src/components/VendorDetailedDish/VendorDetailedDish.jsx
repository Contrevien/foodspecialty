import React from 'react';
import './VendorDetailedDish.css';

const VendorDetailedDish = (props) => {
    return (<div className="VendorDetailedDish-modal">
        <h2>Dish Details</h2>
        <div className="UserProfile-onebox VDDM">
            <p>Dish Name</p>
            <input type="text" name="name" value={props.dish["name"]}
                spellCheck={false} autoComplete="off" className="UserProfile-input"
                placeholder="Name" onChange={props.handleChange} />
        </div>
        <div className="UserProfile-onebox VDDM">
            <p>Description</p>
            <textarea placeholder="Description"
                name="description" className="UserProfile-input"
                value={props.dish["description"]} spellCheck={false}
                onChange={props.handleChange}
            ></textarea>
        </div>
        <div className="UserProfile-onebox VDDM">
            <p>Price (Rs.)</p>
            <input type="text" name="price" value={props.dish["price"]}
                onChange={props.handleChange}
                spellCheck={false} autoComplete="off" className="UserProfile-input"
                placeholder="Price" maxLength="4" />
        </div>
        <div className="UserProfile-onebox VDDM">
            <p>Category</p>
            <select value={props.dish["catId"]} onChange={props.handleChange} name="catId">
                {props.categories.map(cat =>
                    <option
                        key={cat["catId"]}
                        value={cat["catId"]}
                    >
                        {cat["name"]}
                    </option>
                )}
            </select>
        </div>
        <p
            className="VDDM-error-message"
            style={{ color: props.message === "Update Successful" ? 'var(--green)' : 'rgba(255,0,0,0.8)'}}
        >
            {props.message}
        </p>
        <button
            className="btn Register-btn"
            id="VDDM-btn"
            onClick={props.updateDetails}
            disabled={props.changed}
        >
            Update
        </button>
        <button
            className="btn Register-btn"
            id="VDDM-btn-delete"
            onClick={props.areYouSure}
        >
            Delete
        </button>
    </div>)
}

export default VendorDetailedDish;