import React from 'react';
import Dish from '../Dish/Dish';
import TopBar from '../TopBar/TopBar';
import './VendorDishes.css';

export default class VendorDishes extends React.Component {

    render() {
        let img = "1";
        return (
            <div className="Dishes">
                <TopBar location={this.props.user.address.split(',')[this.props.user.address.split(',').length-5]}/>
                <h1 style={{
                    marginTop: "-20px",
                    marginBottom: "20px",
                    fontFamily: "Lobster"
                }}>Your Dishes</h1>
                {this.props.dishes.map((dish, i) => {
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
                    return (    
                        <Dish
                            key={dish.did}
                            mountDish={this.props.mountDish}
                            img={img}
                            name={dish.name}
                            seller="You"
                            type={dish.type}
                            dish={dish}
                            status={dish.status}
                            message={"ordered " + dish.sold + " times"}
                        />)
                })}
            </div>
        );
    }
}