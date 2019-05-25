import React from 'react';
import './AddDishModal.css';
import picture from '../../assets/images/picture.png';

export default class AddDishModal extends React.Component {

    componentDidMount() {
        if (this.props.newDish["Did"] === "") {
            fetch('/Dish/GetNextDishId')
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    this.props.handler("", res);
                })
                .catch(err => console.log(err));
        }
    }

    render() {

        let img = !this.props.img ? 
            <label className="Dish-image-upload">
                <input type="file" onChange={this.props.handleImage} name="Image" />
                <img src={picture} alt="Upload Image" className="Dish-add-image" />
            </label> :
            <>
                <img src={this.props.img} className="Dish-image-preview" />
                <p className="Dish-image-remove" onClick={this.props.removeImage}>Remove</p>
            </>

        return (<div className="AddDishModal">
            <h2>Add New Dish</h2>
            {img}
            <input type="text" name="Name" value={this.props.newDish["Name"]}
                onChange={this.props.handler} id="ADDM"
                spellCheck={false} autoComplete="off" className="Register-input"
                placeholder="Dish Name" />
            <textarea placeholder="Description"
                name="Description" className="Register-input" id="ADDM"
                value={this.props.newDish["Description"]} spellCheck={false}
                onChange={this.props.handler}
            ></textarea>
            <input type="text" name="Price" value={this.props.newDish["Price"]}
                onChange={this.props.handler} id="ADDM"
                spellCheck={false} autoComplete="off" className="Register-input"
                placeholder="Price" maxLength="4" />
            <div className="UserProfile-onebox VDDM">
                <p>Category</p>
                <select value={this.props.newDish["CatId"]}
                    onChange={this.props.handler} name="CatId">
                    {this.props.categories.map(cat =>
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
                style={{ color: this.props.message === "Addition Successful" ? 'var(--green)' : 'rgba(255,0,0,0.8)' }}
            >
                {this.props.message}
            </p>
            <button
                className="btn Register-btn"
                id="ADDM-btn"
                onClick={this.props.areYouSure}
            >
                Add
        </button>
        </div>)
    }
}