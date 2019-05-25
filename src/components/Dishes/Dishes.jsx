import React from 'react';
import './Dishes.css';
import Dish from '../Dish/Dish';
import TopBar from '../TopBar/TopBar';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import search from '../../assets/images/search.png';

export default class Dishes extends React.Component {

    state = {
        dishes: [],
        isLoading: true,
        _CONTENT: [
            "Find specialty.",
            "Find taste.",
            "Find dishes in clicks.",
            "Food around you.",
            "Household recipes."
        ],
        _PART: 0,
        _PART_INDEX: 0,
        _INTERVAL_VAL: 0,
        _ELEMENT: "",
        _CURSOR: "",
        toShow: [],
        filter: 0
    }

    deg2rad = (deg) => {
        return deg * (Math.PI/180);
    }

    Type = () => { 
        // Get substring with 1 characater added
        var text =  this.state._CONTENT[this.state._PART].substring(0, this.state._PART_INDEX + 1);
        this.state._ELEMENT.innerHTML = text;
        this.state._PART_INDEX++;
    
        // If full sentence has been displayed then start to delete the sentence after some time
        if(text === this.state._CONTENT[this.state._PART]) {
            // Hide the cursor
            this.state._CURSOR.style.display = 'none';
    
            clearInterval(this.state._INTERVAL_VAL);
            setTimeout(() => {
                this.state._INTERVAL_VAL = setInterval(this.Delete, 50);
            }, 1000);
        }
    }

    Delete = () => {
        // Get substring with 1 characater deleted
        var text =  this.state._CONTENT[this.state._PART].substring(0, this.state._PART_INDEX - 1);
        this.state._ELEMENT.innerHTML = text;
        this.state._PART_INDEX--;
    
        // If sentence has been deleted then start to display the next sentence
        if(text === '') {
            clearInterval(this.state._INTERVAL_VAL);
    
            // If current sentence was last then display the first one, else move to the next
            if(this.state._PART == (this.state._CONTENT.length - 1))
                this.state._PART = 0;
            else
                this.state._PART++;
            
            this.state._PART_INDEX = 0;
    
            // Start to display the next sentence after some time
            setTimeout(() => {
                this.state._CURSOR.style.display = 'inline-block';
                this.state._INTERVAL_VAL = setInterval(this.Type, 100);
            }, 200);
        }
    }

    componentDidMount() {
        
        fetch('/Dish/GetAllDishes')
            .then(res => res.json())
            .then(res => {
                var final = [];
                let [lat1, lon1] = [this.props.user.address.split('$')[0], this.props.user.address.split('$')[1]];
                for (var r in res) {
                    if (res[r]["status"] === "Verified") {
                        let [lat2, lon2] = [res[r]["sellerAddress"].split('$')[0], res[r]["sellerAddress"].split('$')[1]];
                        var R = 6371; // Radius of the earth in km
                        var dLat = this.deg2rad(lat1 - lat2 );  // this.deg2rad below
                        var dLon = this.deg2rad(lon1 - lon2); 
                        var a = 
                            Math.sin(dLat/2) * Math.sin(dLat/2) +
                            Math.cos(this.deg2rad(lat2)) * Math.cos(this.deg2rad(lat1)) * 
                            Math.sin(dLon/2) * Math.sin(dLon/2)
                            ; 
                        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
                        var d = R * c;
                        if(d < 1) {
                            res[r]["distance"] = "0.5";
                        } else {
                            res[r]["distance"] = d.toString().split('.')[0];
                        }
                        if(d < 20) {
                            final.push(res[r]);
                        }
                    }
                    
                }
                final.sort((a, b) => parseInt(a["distance"]) > parseInt(b["distance"]) ? 1 : -1);
                this.setState({ 
                    dishes: final,
                    toShow: final,
                    isLoading: false,
                    _ELEMENT: document.querySelector("#fancy-text"),
                    _CURSOR: document.querySelector("#cursor"),
                    _INTERVAL_VAL: setInterval(this.Type, 100)
                });
            })
            .catch(err => console.log(err));
    }

    handleSearch = (e) => {
        let text = e.target.value;
        if(text === "") {
            let temp = [...this.state.dishes];
            this.setState({
                toShow:temp
            })
            return;
        }
        let toShow = this.state.toShow.filter(x => x["name"].toLowerCase().includes(text.toLowerCase()) || 
                                                    x["seller"].toLowerCase().includes(text.toLowerCase()) ||
                                                    x["type"].toLowerCase().includes(text.toLowerCase()))
        this.setState({
            toShow: toShow
        })
    }

    filter = (n) => {
        let toShow = [...this.state.toShow];
        if(n === 0) {
            toShow.sort((a, b) => parseInt(a["distance"]) > parseInt(b["distance"]) ? 1 : -1)
            this.setState({
                filter: 0,
                toShow: toShow
            })
        } else {
            toShow.sort((a, b) =>parseInt(a["rating"]) > parseInt(b["rating"]) ? -1 : 1)
            this.setState({
                filter: 1,
                toShow: toShow
            })
        }
    }

    render() {
        try{
            let img = "1";
            return (
                <>
                <div className="Dishes">
                    <TopBar location={this.props.user ? this.props.user.address.split(',')[this.props.user.address.split(',').length-5] : ""} />
                    
                    <div className="Dishes-cover">
                        <div><div id="fancy-text"></div><div id="cursor"></div></div>
                        <div>
                            <input type="text" placeholder="Search Dishes, Vendors..." 
                                className="Register-input" id="search" spellCheck={false} autoComplete="off"
                                onChange={this.handleSearch}
                                /> 
                                <img src={search} alt="fl" className="search-icon"/>
                        </div>
                        <div>
                            <button 
                                className={
                                    this.state.filter === 0 ? 
                                    "filter nearest selected-filter-n" : 
                                    "filter nearest"}
                                    onClick={() => this.filter(0)}
                                    >Nearest</button>
                            <button 
                                className={
                                    this.state.filter === 1 ? 
                                    "filter top selected-filter-t" : 
                                    "filter top"}
                                    onClick={() => this.filter(1)}
                                    >Top</button>
                        </div>
                    </div>
                    
                    {this.state.toShow.map((dish, i) => {
                        if (i % 3 === 0) {
                            img = "1";
                        } else if (i % 3 === 1) {
                            img = "2";
                        } else {
                            img = "3"
                        }
                        if (dish["image"]) {
                            img = dish["imagetype"] + "," + dish["image"];
                        }
                        return <Link key= { dish.did } to={"/DetailedDish/" + dish.did}><Dish
                            img={img}
                            name={dish.name}
                            seller={dish.seller}
                            rating={dish.rating}
                            type={dish.type}
                            message={dish.distance + " km(s) away from you"}
                        /></Link>
                    })}
                </div>
                {this.state.isLoading ? <Loader /> : null}
                </>
            );
        }
        catch {
            console.log("Error");
            return null;
        }
    }
}