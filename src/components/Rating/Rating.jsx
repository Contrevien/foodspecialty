import React from 'react';
import './Rating.css';

const Rating = (props) => {
    return (
        <div className="Rating">
            <p className="Rating-name">{props.name}</p> 
            <span 
                className={
                    props.rating === "3" ? 
                        "Rating-num-yellow" : props.rating >= "3" ? "Rating-num-green" : "Rating-num-red"
                    }
            >
                {props.rating}★
            </span>
            <hr />
            <p className="Rating-comment">{props.comment}</p>
            <p className="Rating-date">{props.date}</p>
        </div>
    )
}

export default Rating;