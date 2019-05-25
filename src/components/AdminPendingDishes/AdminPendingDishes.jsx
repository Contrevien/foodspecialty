import React from 'react';
import Dish from '../Dish/Dish';
import './AdminPendingDishes.css';
import AdminNav from '../AdminNav/AdminNav';

export default class AdminPendingDishes extends React.Component {

    state = {
        dishes: [],
        mountedDish: {},
        showDetailedDish: false
    }

    componentDidMount() {
        fetch('/Dish/GetAllDishes')
            .then(res => res.json())
            .then(res => {
                let final = []
                for (var r of res) {
                    if (r["status"] === "N") {
                        final.push(r);
                    }
                }
                this.setState({ dishes: final });
            })
    }

    mountDish = (dish) => {
        this.setState({
            mountedDish: dish,
            showDetailedDish: true
        })
    }

    closeDetailedDish = () => {
        this.setState({
            showDetailedDish: false
        })
    }

    decision = (aOrR) => {
        if (aOrR) {
            fetch('/Dish/UpdateDish', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Did: this.state.mountedDish["did"],
                    Name: this.state.mountedDish["name"],
                    Description: this.state.mountedDish["description"],
                    Price: this.state.mountedDish["price"],
                    Vid: this.state.mountedDish["vid"],
                    CatId: this.state.mountedDish["catId"],
                    Status: "Verified",
                    Image: this.state.mountedDish["image"],
                    ImageType: this.state.mountedDish["imageType"]
                })
            })
                .then(res => res.json())
                .then(res => {
                    if (res) {
                        let foundIndex = this.state.dishes.findIndex(d => d["did"] === this.state.mountedDish["did"])
                        let copy = [...this.state.dishes];
                        copy.splice(foundIndex, 1);
                        this.setState({
                            dishes: copy,
                            showDetailedDish: false,
                            mountedDish: {}
                        })
                    } 
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            fetch('/Dish/UpdateDish', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Did: this.state.mountedDish["did"],
                    Name: this.state.mountedDish["name"],
                    Description: this.state.mountedDish["description"],
                    Price: this.state.mountedDish["price"],
                    Vid: this.state.mountedDish["vid"],
                    CatId: this.state.mountedDish["catId"],
                    Status: "R",
                    Image: this.state.mountedDish["image"],
                    ImageType: this.state.mountedDish["imageType"]
                })
            })
                .then(res => res.json())
                .then(res => {
                    if (res) {
                        let foundIndex = this.state.dishes.findIndex(d => d["did"] === this.state.mountedDish["did"])
                        let copy = [...this.state.dishes];
                        copy.splice(foundIndex, 1);
                        this.setState({
                            dishes: copy,
                            showDetailedDish: false,
                            mountedDish: {}
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
    
    render() {

        let detailedDishSetup = <>
            <div className="Backdrop" onClick={this.closeDetailedDish}></div>
            <div className="VendorDetailedDish-modal">
                <h2>Dish Details</h2>
                <div className="UserProfile-onebox VDDM">
                    <p>Dish Name</p>
                    <input disabled={true} type="text" name="name"
                        value={this.state.mountedDish["name"]}
                        spellCheck={false} autoComplete="off" className="UserProfile-input"
                        placeholder="Name" />
                </div>
                <div className="UserProfile-onebox VDDM">
                    <p>Description</p>
                    <textarea disabled={true} placeholder="Description"
                        name="description" className="UserProfile-input"
                        value={this.state.mountedDish["description"]}
                        spellCheck={false}
                    ></textarea>
                </div>
                <div className="UserProfile-onebox VDDM">
                    <p>Price (Rs.)</p>
                    <input disabled={true} type="text" name="price"
                        value={this.state.mountedDish["price"]}
                        spellCheck={false} autoComplete="off" className="UserProfile-input"
                        placeholder="Price" maxLength="4" />
                </div>
                <div className="UserProfile-onebox VDDM">
                    <p>Category</p>
                    <input disabled={true} type="text" name="cat"
                        value={this.state.mountedDish["type"]}
                        spellCheck={false} autoComplete="off" className="UserProfile-input"
                        placeholder="Name" />
                </div>
                <button
                    className="btn Register-btn"
                    id="VDDM-btn"
                    style={{ background: 'var(--green)', borderColor: 'var(--green)'}}
                    onClick={() => this.decision(true)}
                >
                    Approve
        </button>
                <button
                    className="btn Register-btn"
                    id="VDDM-btn-delete"
                    onClick={() => this.decision(false)}
                >
                    Reject
        </button>
            </div>
        </>

        let img = "1";
        return (
            <div className="AdminUsers">
                <AdminNav logout={this.props.logout} selected="5" />
                <div className="Dishes">
                    <h1 style={{
                        fontFamily: "Lobster"
                    }}>Pending Dishes</h1>
                    {this.state.dishes.map((dish, i) => {
                        if (i % 3 === 0) {
                            img = "1";
                        } else if (i % 3 === 1) {
                            img = "2";
                        } else {
                            img = "3"
                        }
                        if (dish["image"]) {
                            img = dish["imageType"] + "," + dish["image"];
                        }
                        return (
                            <Dish
                                key={dish.did}
                                mountDish={this.mountDish}
                                img={img}
                                name={dish.name}
                                seller={dish.vid}
                                type={dish.type}
                                dish={dish}
                                status={dish.status}
                                message={"ordered 0 times"}
                            />)
                    })}
                </div>
                {this.state.showDetailedDish ? detailedDishSetup : null}
            </div>
        );
    }
}