import React from 'react';
import NavBar from '../NavBar/NavBar';

export default class VendorProfile extends React.Component {

    state = {
        name: this.props.user["name"],
        email: this.props.user["email"],
        password: this.props.user["password"],
        phone: this.props.user["phone"],
        phoneError: 0,
        nameError: 0,
        emailError: 0,
        passwordError: 0,
        origAddress: this.props.user["address"],
        address: this.props.user["address"].split('$')[2],
        message: "",
        updated: 0,
        changed: false
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

        else {
            let inputError = input + "Error";
            if (value === '') {
                this.setState({ [inputError]: 1 });
            }
            else {
                this.setState({ [inputError]: 0 });
            }
        }

        this.setState({
            [input]: value,
            changed: true
        })
    }

    componentDidMount() {
        console.log(this.props.user);
    }

    saveDetails = (e) => {
        if (this.state.nameError !== 0 ||
            this.state.name === '' ||
            this.state.emailError !== 0 ||
            this.state.email === '' ||
            this.state.passwordError !== 0 ||
            this.state.password === '' ||
            this.state.phoneError !== 0 ||
            this.state.phone === '') {
            return;
        }
        fetch('/Vendor/UpdateVendor', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Vid: this.props.user["vid"],
                Name: this.state.name,
                Email: this.state.email,
                Password: this.state.password,
                Phone: this.state.phone,
                Address: this.state.origAddress,
                AccountInfo: this.props.user["accountInfo"],
                Query: this.props.user["query"],
                Response: this.props.user["response"],
                Status: this.props.user["status"]
            })
        })
            .then(res => res.json())
            .then(res => {
                let user = {
                    vid: this.props.user["vid"],
                    email: this.state.email,
                    password: this.state.password,
                    name: this.state.name,
                    phone: this.state.phone,
                    address: this.state.origAddress,
                    accountInfo: this.props.user["accountInfo"],
                    query: this.props.user["query"],
                    response: this.props.user["response"],
                    status: this.props.user["status"]
                }
                // eslint-disable-next-line
                if (res == true) {
                    this.props.updateUser(user);
                } else {
                    this.setState({ updated: -1 });
                }
            })
            .catch(err => { this.setState({ updated: -1 }); });
    }

    render() {

        let message = "";
        if (this.state.emailError === 1) {
            message = "Please check the Email"
        } else if (this.state.passwordError === 1)
            message = "Password must be between 3 to 16 characters"
        else if (this.state.phoneError === 1)
            message = "Please check the phone number"
        else if (this.state.nameError === 1)
            message = "Name must contain only alphabets and spaces"
        else if (this.props.userUpdated && !this.state.changed)
            message = "Update Successful"
        else if (this.state.updated === -1)
            message = "Something went wrong"
        else
            message = "";



        return (
            <div className="UserProfile">
                <NavBar type="1" selected="1" logout={this.props.logout} />
                <div className="UserProfile-display">
                    <h2>Edit your profile</h2>
                    <div className="UserProfile-onebox">
                        <p>Name</p>
                        <input type="text" name="name" value={this.state.name}
                            onChange={this.handleInput}
                            spellCheck={false} autoComplete="off" className="UserProfile-input"
                            placeholder="Name" />
                    </div>
                    <div className="UserProfile-onebox">
                        <p>Email</p>
                        <input type="email" name="email" value={this.state.email}
                            onChange={this.handleInput}
                            spellCheck={false} autoComplete="off" className="UserProfile-input"
                            placeholder="Email" />
                    </div>
                    <div className="UserProfile-onebox">
                        <p>Password</p>
                        <input type="text" name="password" value={this.state.password}
                            onChange={this.handleInput}
                            spellCheck={false} autoComplete="off" className="UserProfile-input"
                            placeholder="Password" />
                    </div>
                    <div className="UserProfile-onebox">
                        <p>Phone</p>
                        <input type="text" name="phone" value={this.state.phone}
                            onChange={this.handleInput}
                            spellCheck={false} autoComplete="off" className="UserProfile-input"
                            placeholder="Mobile" maxLength="10" />
                    </div>
                    <div className="UserProfile-onebox">
                        <p>Address</p>
                        <textarea placeholder="Your Address" disabled
                            name="address" className="UserProfile-input"
                            value={this.state.address} spellCheck={false}
                            onChange={this.handleInput}>
                        </textarea>
                    </div>
                    <button className="btn UserProfile-btn" onClick={this.saveDetails}>Save</button>
                    <p className="error-message">{message}</p>
                </div>
            </div>
        );
    }
}