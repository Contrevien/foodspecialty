import React from 'react';
import './AdminController.css';
import { Link } from 'react-router-dom';

export default class AdminController extends React.Component {
    state = {
        email: "",
        password: "",
        emailError: 0,
        passwordError: 0,
        message: ""
    }

    handleEmail = (e) => {
        let email = e.target.value;
        // eslint-disable-next-line
        let emailPat = /[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/;
        if (email === '' || !emailPat.test(email)) {
            this.setState({ emailError: 1, message: "Please check the email" });
        }
        else {
            this.setState({ emailError: 0, message: "" });
        }
        this.setState({ email: email })
    }

    handlePassword = (e) => {
        let pass = e.target.value;

        if (pass === '') {
            this.setState({ passError: 1, message: "Please check the password" });
        }
        else {
            this.setState({ passError: 0, message: "" });
        }
        this.setState({ password: pass })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.email === '' || this.state.emailError === 1) {
            this.setState({ emailError: 1 });
            return;
        }
        if (this.state.password === '' || this.state.passError === 1) {
            this.setState({ passError: 1 });
            return;
        }

        fetch('/Users/GetUser/' + this.state.email.toLowerCase())
            .then(res => res.json())
            .then(res => {
                if (res === null) {
                    this.setState({ message: 'Invalid email', password: '', email: '', emailError: 1 });
                }
                else if (res["password"] === this.state.password && res["uid"][0] === "A") {
                    this.props.loggedIn(2, res);
                }
                else {
                    this.setState({ message: 'Invalid credentials', password: '', passError: 1 });
                }
            })
            .catch(err => { this.setState({ message: 'Something went wrong' }); })
    }

    render() {

        return (<div className="Login">
            <h2 className="Login-spl-msg">Admin Login</h2>
            <input type="email" name="email" value={this.state.email}
                onChange={this.handleEmail} onKeyDown={(e) => e.key === "Enter" ? this.handleSubmit(e) : null}
                spellCheck={false} autoComplete="off" className="Login-input"
                placeholder="Email"
            />
            <input type="password" name="password" value={this.state.password}
                onChange={this.handlePassword} onKeyDown={(e) => e.key === "Enter" ? this.handleSubmit(e) : null}
                spellCheck={false} autoComplete="false" className="Login-input"
                placeholder="Password"
            />
            <button className="btn Login-btn" onClick={this.handleSubmit}>Login</button>
            <p className="Login-error-message">{this.state.message}</p>
            <div className="Login-misc-links">
                <Link to="/">User Login</Link>  <Link to="/VendorLogin">Vendor Login</Link>
            </div>
        </div>)
    }
}