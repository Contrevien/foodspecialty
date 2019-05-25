import React from 'react';
import './AdminCat.css';
import AdminNav from '../AdminNav/AdminNav';

export default class AdminCat extends React.Component {

    state = {
        name: "",
        cats: [],
        why: 0
    }

    addCat = () => {
        if (this.state.name === "") {
            this.setState({
                why: 1
            })
            return;
        } else {
            this.setState({
                why: 0
            })
        }

        fetch('/Dish/AddCategory', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                CatId: "",
                Name: this.state.name
            })
        })
            .then(res => res.json())
            .then(res => {
                if (res) {
                    let cats = [...this.state.cats];
                    cats.push(this.state.name);
                    this.setState({
                        cats: cats
                    })
                }
            })
            .catch(err => this.setState({ why: 1 }));
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount() {
        fetch('/Dish/GetAllCategories')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    cats: res
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        return (<div className="AdminUsers">
            <AdminNav logout={this.props.logout} selected="3" />
            <div className="AdminUsers-display">
                <h2>Categories</h2>
                <div className="AdminCat-cats">
                    {this.state.cats.map((cat, i) => {
                        return <p key={i}>{cat["name"]}</p>
                    })}
                </div>
                <hr/>
                <h2>Enter new Category</h2>
                <input type="text" className="Register-input"
                    name="name" value={this.state.name} autoComplete="off"
                    spellCheck={false} onChange={this.handleChange}
                    onKeyDown={(e) => e.key === "Enter" ? this.addCat(e) : null}
                />
                <button className="Register-btn" onClick={this.addCat}>Add</button>
                <p className="Register-error-message">{this.state.why === 1 ? "Why?" : ""}</p>
            </div>
        </div>)
    }
}