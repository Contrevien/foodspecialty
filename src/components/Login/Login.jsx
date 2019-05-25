import React, { Component } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

export default class Login extends Component {

    state = {
        email: '',
        password: '',
        emailError: 0,
        passError: 0,
        message: '',
        loading: false
    }

    handleEmail = (e) => {
        let email = e.target.value;
        // eslint-disable-next-line
        let emailPat = /[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/;
        if (email === '' || !emailPat.test(email)) {
            this.setState({ emailError: 1, message: "Please check the email" });
        }
        else {
            this.setState({ emailError: 0, message: ""  });
        }
        this.setState({ email: email})
    }

    handlePassword = (e) => {
        let pass = e.target.value;

        if (pass === '') {
            this.setState({ passError: 1, message: "Please check the password" });
        }
        else {
            this.setState({ passError: 0, message: ""  });
        }
        this.setState({ password: pass })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.email === '' || this.state.emailError === 1) {
            this.setState({ emailError: 1, message: "Email cannot be empty" });
            return;
        }
        if (this.state.password === '' || this.state.passError === 1) {
            this.setState({ passError: 1, message: "Password cannot be empty" });
            return;
        }

        fetch('/Users/GetUser/' + this.state.email.toLowerCase())
                .then(res => res.json())
                .then(res => {
                    if (res === null) {
                        this.setState({ message: 'Invalid email', password: '', email: '', emailError: 1 });
                    }
                    else if (res["password"] === this.state.password && res["status"] !== "B") {
                        this.props.loggedIn(0, res);
                    }
                    else if (res["status"] === "B") {
                        this.setState({ message: 'Your account has been blocked', password: '', passError: 1 });
                    }
                    else {
                        this.setState({ message: 'Invalid password', password: '', passError: 1 });
                    }
                })
                .catch(err => { this.setState({ message: 'Something went wrong' }); })
    }

    render() {

        return (<div className="Login">
            <h2 className="Login-spl-msg">Find the <span style={{ color: 'var(--white)', textShadow: '1px 1px 10px rgba(0,0,0,0.7)' }}>speciality</span> in your area</h2>
            <input type="email" name="email" value={this.state.email}
                onChange={this.handleEmail} 
                onKeyDown={(e) => e.key === "Enter" ? this.handleSubmit(e) : null}
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
                <Link to="/VendorLogin">Vendor Login</Link>  <Link to="/Register">Register</Link>
                <Link to="/AdminLogin" className="Login-misc-links-spl">Admin Login</Link>
            </div>
        </div>)
    }
}