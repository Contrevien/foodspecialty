import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Register.css';
import { Link } from 'react-router-dom';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class Register extends Component {
    state = {
        step: 1,
        type: "0",
        name: "",
        email: "",
        password: "",
        repass: "",
        phone: "",
        phoneError: 0,
        nameError: 0,
        emailError: 0,
        emailExistsError: 0,
        emailVerificationReqSent: false,
        passwordError: 0,
        repassError: 0,
        passMatch: 0,
        addressError: 0,
        address: "",
        message: "",
        uid: "",
        accountInfo: "",
        accountType: "",
        accountError: 0,
        vid: "",
        someError: 0,
        lat: "",
        lon: ""
    }

    handleType = (e) => {
        this.setState({
            type: e.target.value
        })
    }

    handleAccount = (e) => {
        console.log(this.state.accountType);
        this.setState({
            accountType: e.target.name
        });
    }

    incrementStep = (e) => {
        let curr = this.state.step + 1;
        let dependent = false;

        if (this.state.step === 1 && this.state.type === "0") {
            fetch('Users/GetNextUserId')
                .then(res => res.json())
                .then(res => {
                    this.setState({ uid: res });
                })
        }

        if (this.state.step === 1 && this.state.type === "1") {
            fetch('Vendor/GetNextVendorId')
                .then(res => res.json())
                .then(res => {
                    this.setState({ vid: res });
                })
        }


        if (this.state.step === 2 && (
            this.state.nameError !== 0 ||
            this.state.name === '' ||
            this.state.emailError !== 0 ||
            this.state.email === '' ||
            this.state.passwordError !== 0 ||
            this.state.password === '' ||
            this.state.repassError !== 0 ||
            this.state.repass === '')) {
                this.setState({someError: 1});
                return;
        }

        if (this.state.step === 2 &&
            !this.state.emailVerificationReqSent &&
            this.state.emailError === 0 &&
            this.state.email !== '') {
            dependent = true;
            if (this.state.type === 0) {
                fetch('/Users/GetUser/' + this.state.email.toLowerCase())
                    .then(res => res.json())
                    .then(res => {
                        if (res !== null) {
                            this.setState({ emailExistsError: 1, emailVerificationReqSent: true });
                            return;
                        } else {
                            this.setState({ emailExistsError: 0, emailVerificationReqSent: true, step: curr });
                        }
                    })
            } else {
                fetch('/Vendor/GetVendor/' + this.state.email.toLowerCase())
                    .then(res => res.json())
                    .then(res => {
                        if (res !== null) {
                            this.setState({ emailExistsError: 1, emailVerificationReqSent: true });
                            return;
                        } else {
                            this.setState({ emailExistsError: 0, emailVerificationReqSent: true, step: curr });
                        }
                    })
            }
        }

        if (this.state.step === 3) {
            if ((this.state.phone === '' ||
                this.state.phoneError !== 0 ||
                this.state.addressError !== 0 ||
                this.state.address === '')){
                    this.setState({someError: 1});
                    return;
                }
            else {

                if (this.state.type === "0") {
                    this.props.loader();
                    fetch('/Users/AddUser', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            Uid: this.state.uid,
                            Name: this.state.name,
                            Email: this.state.email.toLowerCase(),
                            Password: this.state.password,
                            Phone: this.state.phone,
                            Address: this.state.lat + "$" + this.state.lon + "$" + this.state.address,
                            Query: "",
                            Response: "",
                            Status: "U"
                        })
                    })
                        .then(res => {

                            let user = {
                                uid: this.state.uid,
                                email: this.state.email.toLowerCase(),
                                name: this.state.name,
                                phone: this.state.phone,
                                address: this.state.lat + "$" + this.state.lon + "$" +  this.state.address,
                                password: this.state.password,
                                query: "",
                                response: "",
                                status: "U"
                            }
                            // eslint-disable-next-line
                            if (res == false) {
                                this.setState({ message: "Something went wrong, Retry" });
                                this.props.loader();
                            } else {
                                this.props.loggedIn(0, user);
                            }
                        })
                        .catch(err => { this.setState({ message: "Something went wrong, Retry" }); this.props.loader(); });
                }
            }
        }

        if (this.state.step === 4) {
            if ((this.state.accountInfo === '' || this.state.accountType === "")) {
                this.setState({someError: 1});
                return;
            }
            else {
                this.props.loader();
                fetch('/Vendor/AddVendor', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Vid: this.state.vid,
                        Name: this.state.name,
                        Email: this.state.email.toLowerCase(),
                        Password: this.state.password,
                        Phone: this.state.phone,
                        Address: this.state.lat + "$" + this.state.lon + "$" + this.state.address,
                        AccountInfo: this.state.accountType + ":" + this.state.accountInfo,
                        Query: "",
                        Response: "",
                        Status: "U"
                    })
                })
                    .then(res => {

                        let vendor = {
                            vid: this.state.vid,
                            email: this.state.email.toLowerCase(),
                            name: this.state.name,
                            password: this.state.password,
                            phone: this.state.phone,
                            address: this.state.lat + "$" + this.state.lon + "$" + this.state.address,
                            query: "",
                            response: "",
                            status: "U"
                        }
                        // eslint-disable-next-line
                        if (res == false) {
                            this.setState({ message: "Something went wrong, Retry" });
                            this.props.loader();
                        } else {
                            this.props.loggedIn(1, vendor);
                        }
                    })
                    .catch(err => { this.setState({ message: "Something went wrong, Retry" }); this.props.loader(); });

            }
        }

        
        if (!dependent) {
            this.setState({ step: curr });
        }
    }

    handleInput = (e) => {
        let input = e.target["name"];
        let value = e.target.value;
        if (input === "email") {
            // eslint-disable-next-line
            let emailPat = /[a-zA-Z]+([-\.]?[a-zA-Z0-9]+)?@([a-zA-Z0-9-]+\.)+[a-zA-Z-]{2,3}/;
            if (value === '' || !emailPat.test(value) || value.split('@')[1].split('.')[1].length > 3) {
                this.setState({ emailError: 1, emailVerificationReqSent: false });
            }
            else {
                this.setState({ emailError: 0, emailVerificationReqSent: false });
            }
        }

        else if (input === "phone") {
            let phPatt = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/
            if (value === '' || !phPatt.test(value)) {
                this.setState({ phoneError: 1 });
            }
            else if (isNaN(value)) {
                return;
            }
            else {
                this.setState({ phoneError: 0 });
            }
        }

        else if (input === "name") {
            let namePatt = /^[a-zA-Z ]*$/
            if (value === '' || !namePatt.test(value)) {
                this.setState({ nameError: 1 });
            }
            else {
                this.setState({ nameError: 0 });
            }
        }

        else if (input === "password") {
            if (value === '' || value.length < 3 || value.length > 16) {
                this.setState({ passwordError: 1 });
            }
            else {
                this.setState({ passwordError: 0 });
            }
        }

        else if (input === "address") {
            if (value === '' || value.length < 1) {
                this.setState({ addressError: 1 });
            }
            else {
                this.setState({ addressError: 0 });
            }
        }

        else if (input === "accountInfo") {
            if(this.state.accountType === "upi") {
                let upiPatt = /[a-zA-Z0-9\.]+@[a-zA-Z]+/
                if (value === '' || !upiPatt.test(value)) {
                    this.setState({ accountError: 1 });
                }
                else {
                    this.setState({ accountError: 0 });
                }
            } else if(this.state.accountType === "paytm") {
                let phPatt = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/
                if (value === '' || !phPatt.test(value)) {
                    this.setState({ accountError: 1 });
                }
                else {
                    this.setState({ accountError: 0 });
                }
            }
        }

        else {
            let inputError = input + "Error";
            if (value === '') {
                this.setState({ [inputError]: 1 });
            }
            else {
                this.setState({ [inputError]: 0 });
            }
        }

        if (input === "password") {
            if (value !== this.state.repass)
                this.setState({ passMatch: 1 });
            else
                this.setState({ passMatch: 0 });
        }

        if (input === "repass") {
            if (value !== this.state.password)
                this.setState({ passMatch: 1 });
            else
                this.setState({ passMatch: 0 });
        }
        this.setState({
            [input]: value,
            someError: 0
        })
    }

    searchLocation = (e) => {
        let value = e.target.value;
        if(!value.includes('*')) {
            return;
        }
        let [lat, lon] = value.split(' ');
        console.log(lat, lon)
            fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + lat + ',' + lon.slice(0,lon.length-1) + '&key=' + 'AIzaSyAV9ac8VzlYvmYhy3uSXJyAVUOq_TySMw4')
        .then((response) => response.json())
        .then((responseJson) => {
            let finalAddress = "";
            for(var x of responseJson.results[0].address_components) {
                finalAddress += x["long_name"] + ", "
            }
            this.setState({
                lat: lat,
                lon: lon.slice(0,lon.length-1),
                address: finalAddress
            }, () => {
                console.log(this.map)
            })
    })

    }

    componentDidMount() {

        new this.props.google.maps.places.SearchBox(document.getElementById("address"))
    }

    render() {
        

        const mapStyles = {
            width: '600px',
            height: '200px',
            marginLeft: '-100px',
            borderRadius: '5px',
            boxShadow: '2px 7px 25px rgba(0,0,0,0.36)'
          };

        let message = "";
        if (this.state.emailError === 1) {
            message = "Please check the Email"
        } else if (this.state.passwordError === 1)
            message = "Password must be from 3 to 16 characters"
        else if (this.state.phoneError === 1)
            message = "Please check the phone number"
        else if (this.state.nameError === 1)
            message = "Please check the name"
        else if (this.state.addressError=== 1)
            message = "Address cannot be empty"
        else if (this.state.passMatch === 1)
            message = "Passwords do not match"
        else if (this.state.emailExistsError === 1)
            message = "This email already exists"
        else if (this.state.accountError === 1)
            message = "Please check the account information"
        else if (this.state.someError === 1)
            message = "Please check the fields"
        else
            message = "";

        let step = null;

        let step1 = <div className="Register-step-display step1">
            <h2>Choose your role</h2>
            <select onChange={this.handleType} onKeyDown={(e) => e.key === "Enter" ? this.incrementStep(e) : null}>
                <option value="0">Customer</option>
                <option value="1">Vendor</option>
            </select>
            <button className="btn Register-btn" onClick={this.incrementStep}>Next</button>
        </div>

        let step2 = <div className="Register-step-display step2">
            <h2>Enter your details</h2>

            <input type="text" name="name" value={this.state.name}
                onChange={this.handleInput}
                onKeyDown={(e) => e.key === "Enter" ? this.incrementStep(e) : null}
                spellCheck={false} autoComplete="off" className="Register-input"
                placeholder="Name" />

            <input type="email" name="email" value={this.state.email}
                onChange={this.handleInput}
                onKeyDown={(e) => e.key === "Enter" ? this.incrementStep(e) : null}
                spellCheck={false} autoComplete="off" className="Register-input"
                placeholder="Email" />

            <input type="password" name="password" value={this.state.password}
                onChange={this.handleInput}
                onKeyDown={(e) => e.key === "Enter" ? this.incrementStep(e) : null}
                spellCheck={false} autoComplete="off" className="Register-input"
                placeholder="Password" />

            <input type="password" name="repass" value={this.state.repass}
                onChange={this.handleInput}
                onKeyDown={(e) => e.key === "Enter" ? this.incrementStep(e) : null}
                spellCheck={false} autoComplete="off" className="Register-input"
                placeholder="Re-Type Password"
                 />

            <button className="btn Register-btn" onClick={this.incrementStep}>Next</button>
        </div>

        let step3 = <div className="Register-step-display step3">
            <h2>Enter contact details</h2>
            <input type="text" name="phone" value={this.state.phone}
                onChange={this.handleInput}
                style={{display: 'inline-block'}}
                onKeyDown={(e) => e.key === "Enter" ? this.incrementStep(e) : null}
                spellCheck={false} autoComplete="off" className="Register-input"
                placeholder="Mobile" maxLength="10" />

            <input type="text" placeholder="Your Address" 
                style={{display: 'inline-block'}}
                name="address" className="Register-input"
                onKeyDown={(e) => e.key === "Enter" ? this.incrementStep(e) : null}
                value={this.state.address} spellCheck={false} id="address"
                onChange={(e) => {this.handleInput(e); this.searchLocation(e);}}/>

            <div className="map-container">
                <Map
                    ref="map"
                    google={this.props.google}
                    zoom={15}
                    zoomControl={false}
                    scrollwheel={false}
                    streetViewControl={false}
                    fullscreenControl={false}
                    mapTypeControl={false}
                    style={mapStyles}
                    center = {{
                        lat: this.state.lat ? parseFloat(this.state.lat) : 12.1,
                        lng: this.state.lon ? parseFloat(this.state.lon) : 76.1
                    }}
                    initialCenter={{
                        lat: this.state.lat ? parseFloat(this.state.lat) : 12.1,
                        lng: this.state.lon ? parseFloat(this.state.lon) : 76.1
                    }}
                    >
                </Map>
                {this.state.lat ? <div className="mapMarker"></div> : null}
            </div>

            <button className="btn Register-btn" onClick={this.incrementStep}>Next</button>
        </div>

        let step4 = <div className="Register-step-display step4">
            <h2>Choose your payment option</h2>
            <div className="Register-payment-choice">
                <button
                    name="upi"
                    className="payment-optn upi"
                    onClick={this.handleAccount}
                    style={{
                        border: this.state.accountType === "upi" ? "3px solid #444" : 'none',
                        color: this.state.accountType === "upi" ? "#444" : "#555"
                    }}
                >
                    UPI
                </button>
                <button
                    name="paytm"
                    className="payment-optn paytm"
                    onClick={this.handleAccount}
                    style={{
                        border: this.state.accountType === "paytm" ? "3px solid #333" : 'none',
                        color: this.state.accountType === "paytm" ? "#444" : "#555"
                    }}
                >
                    Paytm
                </button>
            </div>

            <textarea placeholder="Enter details, UPI ID for UPI/Mobile number for PayTM"
                name="accountInfo" className="Register-input"
                onKeyDown={(e) => e.key === "Enter" ? this.incrementStep(e) : null}
                value={this.state.accountInfo} spellCheck={false}
                onChange={this.handleInput}>
            </textarea>
            <button className="btn Register-btn" onClick={this.incrementStep}>Submit</button>

        </div>

        if (this.state.step === 1) {
            step = step1;
        }
        else if (this.state.step === 2) {
            step = step2;
        }
        else if (this.state.step === 3) {
            step = step3;
        }
        else if (this.state.step === 4) {
            step = step4;
        }
        else {
            step = step1;
        }

        return (<div className="Register">
            {step}
            <p className="Register-error-message">{message}</p>
            <div className="Register-misc-links">
                <Link to="/">Back to Login</Link>
            </div>
        </div>)
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAV9ac8VzlYvmYhy3uSXJyAVUOq_TySMw4'
  })(Register);