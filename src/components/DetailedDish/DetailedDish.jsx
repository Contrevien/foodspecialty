import React from 'react';
import './DetailedDish.css';
import NavBar from '../NavBar/NavBar';
import NotFound from '../NotFound/NotFound';
import a from '../../assets/images/1.jpg';
import Payment from '../Payment/Payment';
import Loader from '../Loader/Loader';
import { Promise } from 'q';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import Ratings from '../Ratings/Ratings';

class DetailedDish extends React.Component {

    state = {
        dishDetails: {},
        makePayment: false,
        qty: 1,
        paymentChoice: "",
        paymentDone: false,
        paymentId: "",
        delChoice: "C",
        isLoading: true,
        errorMessage: "",
        oid: "",
        pid: "",
        amount: 0,
        price: 0,
        delChargeAdded: false
    }

    togglePaymentDone = (e) => {
        let upiPat = /[a-zA-Z]+@[a-zA-z]+/
        if (this.state.paymentChoice === "" || this.state.paymentId === "") {
            this.setState({ errorMessage: "Please select/fill all the fields" });
            return;
        } else if (this.state.paymentChoice === "upi" && !upiPat.test(this.state.paymentId)) {
            this.setState({ errorMessage: "UPI ID is invalid" });
            return;
        } else if (this.state.paymentChoice === "paytm" && this.state.paymentId.length !== 10) {
            this.setState({ errorMessage: "Paytm number is invalid" });
            return;
        }
        else {
            this.setState({ errorMessage: "" });
        }
        this.setState({ isLoading: true });
        let time = new Date();
        let month = (time.getMonth() + 1);
        let formedTime = time.getFullYear() + "-" + month + "-" +
            time.getDate() + " " + time.getHours() + ":" +
            time.getMinutes() + ":" + time.getSeconds();
        let order = {
            oid: this.state.oid,
            uid: this.props.user["uid"],
            vid: this.state.dishDetails["vid"],
            vname: this.state.dishDetails["seller"],
            vphone: this.state.dishDetails["sellerPhone"],
            vadd: this.state.dishDetails["sellerAddress"],
            did: this.state.dishDetails["did"],
            dname: this.state.dishDetails["name"],
            quantity: this.state.qty,
            delStatus: this.state.delChoice,
            orderTime: formedTime
        }
        fetch('/Order/AddOrder', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({
                    Oid: this.state.oid,
                    Uid: this.props.user["uid"],
                    Vid: this.state.dishDetails["vid"],
                    Did: this.state.dishDetails["did"],
                    Quantity: this.state.qty,
                    DelStatus: this.state.delChoice,
                    OrderTime: formedTime
                })
        })
                .then(res => res.json())
                .then(res => {
                    if (res == true) {
                        fetch('/Payment/AddPayment', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                Pid: this.state.pid,
                                Uid: this.props.user["uid"],
                                Oid: this.state.oid,
                                Source: this.state.paymentId,
                                Destination: "My account",
                                Amount: this.state.amount,
                                PaymentTime: formedTime
                            })
                        })
                                .then(res => res.json())
                                .then(res => {
                                    if (res == true) {
                                        this.setState({ isLoading: false, makePayment: false, paymentDone: true });
                                        this.props.updateOrder(order);
                                        this.props.history.push('/');
                                    } else {
                                        this.setState({ isLoading: false, errorMessage: "Something went wrong" });
                                    }
                                })
                                .catch(err => console.log(err));
                    } else {
                        this.setState({ isLoading: false, errorMessage: "Something went wrong" });
                    }
                })
                .catch(err => console.log(err))
    }

    togglePaymentDetails = (e, name, value) => {
        this.setState({ [name]: value });
    }

    handleQty = (e, flag) => {
        let curr = this.state.qty;
        let currAmount = this.state.amount;
        let price = this.state.price;
        if (flag) {
            this.setState({ qty: (curr + 1), amount: currAmount + price });
        } else if (curr - 1 !== 0) {
            this.setState({ qty: (curr - 1), amount: currAmount - price });
        } else {
            return;
        }
    }

    handleDelChoice = (e) => {
        let curr = this.state.amount;
        if (e.target.value === "V") {
            this.setState({
                delChoice: e.target.value,
                amount: curr + 50,
                delChargeAdded: true
            });
        } else if (this.state.delChargeAdded) {
            this.setState({
                delChoice: e.target.value,
                amount: curr - 50,
                delChargeAdded: false
            })
        } else {
            this.setState({
                delChoice: e.target.value
            })
        }
    }

    toggleMakePayment = (e) => {
        let curr = this.state.makePayment;
        if (this.state.oid === "") {
            fetch('/Order/GetNextOrderId')
                .then(res => res.json())
                .then(res => {
                    fetch('/Payment/GetNextPaymentId')
                        .then(res => res.json())
                        .then(res1 => this.setState({ oid: res, pid: res1 }));
                })
        }
        this.setState({ makePayment: !curr });
    }

    toggleLoader = () => {
        let curr = this.state.isLoading;
        this.setState({
            isLoading: !curr
        });
    }

    componentDidMount() {
        fetch('/Dish/GetDish/' + this.props.match.params.id)
            .then(res => res.json())
            .then(res => {
                if(res) {
                    this.setState({
                        dishDetails: res,
                        isLoading: false,
                        price: res["price"],
                        amount: res["price"]
                     })
                }
            })
            .catch(err => console.log(err));
    }

    render() {

        const mapStyles = {
            width: '95%',
            minHeight: '50vh',
            maxHeight: '50vh',
            borderRadius: '4px',
            boxShadow: 'inset 2px 7px 25px rgba(0,0,0,0.36)'
        }

        let toDisplay = this.state.dishDetails === null ? <NotFound message="Hmm.. Something's wrong" /> : <>
            <div className="DetailedDish-map">
                {this.state.dishDetails["sellerAddress"] ? <Map
                    ref="map"
                    google={this.props.google}
                    zoom={15}
                    zoomControl={false}
                    scrollwheel={false}
                    streetViewControl={false}
                    fullscreenControl={false}
                    mapTypeControl={false}
                    style={mapStyles}
                    initialCenter={{
                        lat: this.state.dishDetails["sellerAddress"] ? parseFloat(this.state.dishDetails["sellerAddress"].split('$')[0]) : 12.1,
                        lng: this.state.dishDetails["sellerAddress"] ? parseFloat(this.state.dishDetails["sellerAddress"].split('$')[1]) : 76.1,
                    }}
                    >
                    <Marker />
                </Map> : null }
            </div>
            <div className="DetailedDish-details">
                <img src={this.state.dishDetails["image"] ?
                    this.state.dishDetails["imagetype"] + "," + this.state.dishDetails["image"] :
                    a
                    }
                    alt = "" className="DetailedDish-food-img" />
                <h1>{this.state.dishDetails["name"]} - <span className="DD-price">&#8377; {this.state.dishDetails["price"] ? this.state.dishDetails["price"] : ""}</span>
                    <span className="DetailedDish-rating"
                        style={{ color: this.state.dishDetails["rating"] === "3" ? 'var(--yellow)' : 
                        this.state.dishDetails["rating"] > 3 ? 'var(--green)' : 'rgba(255,0,0,0.8)' }}
                    >{
                    this.state.dishDetails["rating"] == "0" 
                    || this.state.dishDetails["rating"] == "-1"
                    || !this.state.dishDetails["rating"] ?
                        "-" : this.state.dishDetails["rating"] + "★"
                }</span></h1>
                <p className="DetailedDish-desc">{this.state.dishDetails["description"] ? this.state.dishDetails["description"] : ""}</p>
                <p className="DetailedDish-type"><span style={{ color: '#444' }}>served in</span> <span style={{ fontStyle: 'italic', color: '#444' }}>{this.state.dishDetails["type"] ? this.state.dishDetails["type"] : ""}</span></p>
                <p className="DetailedDish-ordered"><span style={{ color: '#444' }}>it has been ordered </span> {this.state.dishDetails["ordered"] ? this.state.dishDetails["ordered"] : ""} time(s)</p>
                <hr />
                <h2>Seller Details</h2>
                <p className="DetailedDish-seller">{this.state.dishDetails["seller"]}</p>
                <p className="DetailedDish-seller">Phone: <span style={{ fontStyle: 'italic' }}>{this.state.dishDetails["sellerPhone"] ? this.state.dishDetails["sellerPhone"] :""}</span></p>
                <p className="DetailedDish-seller"> lives in <span style={{ fontStyle: 'italic' }}>{this.state.dishDetails["sellerAddress"] ? this.state.dishDetails["sellerAddress"].split('$')[2] : ""}</span></p>
                <p className="DetailedDish-seller">{this.state.dishDetails["sellerEmail"] ? this.state.dishDetails["sellerEmail"] : ""}</p>
                <button className="btn DetailedDish-btn" disabled={this.props.hasPendingOrder} onClick={this.toggleMakePayment}>Buy</button>
                <Ratings user={this.props.user} did={this.props.match.params.id} />
            </div>
            {this.state.makePayment ?
                <>
                    <div className="Backdrop" onClick={this.toggleMakePayment}></div>
                    <Payment
                        name={this.state.dishDetails["name"]}
                        did={this.state.dishDetails["did"]}
                        price={this.state.dishDetails["price"]}
                        paymentDone={this.state.paymentDone}
                        paymentDoneHandler={this.togglePaymentDone}
                        qty={this.state.qty}
                        amount={this.state.amount}
                        qtyHandler={this.handleQty}
                        paymentChoice={this.state.paymentChoice}
                        paymentId={this.state.paymentId}
                        paymentDetailsHandler={this.togglePaymentDetails}
                        delChoice={this.state.delChoice}
                        handleDelChoice={this.handleDelChoice}
                        errorMessage={this.state.errorMessage}
                    />
                </> :
                null
            }
        </>

        return (
            <div className="DetailedDish">
                <NavBar selected="0" logout={this.props.logout} />
                <div className="DetailedDish-display">
                    {toDisplay}
                </div>
                {this.state.isLoading ? <Loader /> : null}
            </div>
            );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAV9ac8VzlYvmYhy3uSXJyAVUOq_TySMw4'
  })(DetailedDish);