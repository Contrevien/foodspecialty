import React from 'react';
import './Ratings.css';
import Rating from '../Rating/Rating';

export default class Ratings extends React.Component {
    
    state = {
        rating: "0",
        rated: false,
        comment: "",
        message: "",
        ratings: []
    }

    rate = (rating) => {
        this.setState({
            rated: true,
            rating: rating,
            message: "",
            addedRating: false
        })
    }
    
    handleChange = (e) => {
        this.setState({
            comment: e.target.value
        })
    }

    handleSubmit = (e) => {
        if(!this.state.rated) {
            this.setState({
                message: "Please give a rating"
            })
            return;
        }

        let ratings = [...this.state.ratings];

        let time = new Date();
        let month = (time.getMonth() + 1);
        let formedTime = time.getFullYear() + "-" + month + "-" +
            time.getDate() + " " + time.getHours() + ":" +
            time.getMinutes() + ":" + time.getSeconds();

        fetch('/Ratings/AddRating', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Rid: "",
                Uid: this.props.user["uid"],
                Name: this.props.user["name"],
                Rating: this.state.rating,
                Comment: this.state.comment,
                Date: formedTime,
                Did: this.props.did
            })
        })
        .then(res => res.json())
        .then(res => {
            if(res) {
                ratings.push({
                    rid: "",
                    uid: this.props.user["uid"],
                    name: this.props.user["name"],
                    rating: this.state.rating,
                    comment: this.state.comment,
                    date: formedTime,
                    did: this.props.did
                })
        
                this.setState({
                    addedRating: true,
                    message: "S",
                    ratings: ratings
                })
            } else {
                this.setState({
                    message: "Something went wrong"
                })
            }
        })
        .catch(err => this.setState({
            message: "Something went wrong"
        }))
        
    }

    componentDidMount() {
        console.log(this.props);
        fetch('/Ratings/GetRatingsByDid/' + this.props.did)
            .then(res => res.json())
            .then(res => {
                if(res !== null) {
                    console.log(res);
                    let rated = false;
                    for(var r of res) {
                        if(r["uid"] === this.props.user["uid"]) {
                            rated = true;
                        }
                    }
                    this.setState({
                        ratings: res,
                        addedRating: rated
                    })
                } else {
                    console.log("Something is wrong here");
                }
            })
            .catch(err => console.log("Something is wrong"));
    }


    render () {

        return(
            <div className="Ratings">
                <legend>Ratings</legend>
                <p id="Ratings-add-success" className="Register-error-message">
                        {this.state.message === "S" ? "Rating added" : null}
                    </p>
                {!this.state.addedRating ? <div className="Ratings-add">
                    <h2>Add Rating</h2>
                    <div className="Ratings-stars">
                        <span onClick={() => this.rate("5")} >
                            {this.state.rated && this.state.rating === "5" ? "★" : "☆"}
                        </span>
                        <span onClick={() => this.rate("4")} >
                            {this.state.rated && this.state.rating >= "4" ? "★" : "☆"}
                        </span>
                        <span onClick={() => this.rate("3")} >
                            {this.state.rated && this.state.rating >= "3" ? "★" : "☆"}
                        </span>
                        <span onClick={() => this.rate("2")} >
                            {this.state.rated && this.state.rating >= "2" ? "★" : "☆"}  
                        </span>
                        <span onClick={() => this.rate("1")} >
                            {this.state.rated && this.state.rating >= "1" ? "★" : "☆"}
                        </span>
                    </div>
                    <textarea type="text" name="comment" placeholder="Add a comment (optional)"
                        spellCheck={false} value={this.state.comment}
                        onChange={this.handleChange}
                        />
                    <p className="Register-error-message">
                        {this.state.message !== "S" ? this.state.message : null}
                    </p>
                    <button onClick={this.handleSubmit}>Submit</button>
                </div> : null}
                <div className="Ratings-display">
                    {this.state.ratings.length === 0 ? 
                        <p className="Ratings-empty">Empty here</p> :
                        this.state.ratings.map((r,i) => {
                            return <Rating {...r} key={i} />
                        })
                    }
                </div>
            </div>
        );
    }
}