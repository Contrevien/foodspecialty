import React from 'react';
import './Dish.css';
import a from '../../assets/images/1.jpg';
import b from '../../assets/images/2.jpg';
import c from '../../assets/images/3.jpg';

const Dish = (props) => {

    let curr = null;
    if (props.img === "1") {
        curr = a;
    } else if (props.img === "2")
        curr = b;
    else if (props.img === "3")
        curr = c;
    else
        curr = props.img;

    let infoClass = "Dish-info";
    if (props.status === "N" && props.seller === "You") {
        infoClass = "Dish-info Dish-pending-low"
    }

    return <div className="Dish" onClick={props.mountDish ?
        () => props.mountDish(props.dish) : null}>
        {props.status === "N" && props.seller === "You" ? <p className="Dish-pending">Pending Verification</p> : null}
        <div className="Dish-head">
            <h2 className="Dish-name">{props.name}
            <span className="DetailedDish-rating"
                        style={{ color: props.rating === "3" ? 'var(--yellow)' : 
                        props.rating > 3 ? 'var(--green)' : 'rgba(255,0,0,0.8)' }}
                    >{
                    props.rating == "0" || props.rating == "-1" || !props.rating ?
                        "-" : props.rating + "★"
                }</span>
            </h2>
            <p className="Dish-seller"><span style={{color: '#666', fontSize: '10px'}}>sold by</span> {props.seller}</p>
        </div>
        <div className={infoClass} >
            <p className="Dish-type">{props.type}</p>
            <p className="Dish-distance">{props.message}</p>
        </div>
        <img src={curr} alt="" className="Dish-img" />
        {/*<div className="Dish-img-grad"></div>*/}
    </div>
}

export default Dish;