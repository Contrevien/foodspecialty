import React, { Component } from 'react';
import './VendorHome.css';
import Loader from '../Loader/Loader';
import NavBar from '../NavBar/NavBar';
import VendorDishes from '../VendorDishes/VendorDishes';
import VendorDetailedDish from '../VendorDetailedDish/VendorDetailedDish';
import AddDishBubble from '../AddDishBubble/AddDishBubble';
import AddDishModal from '../AddDishModal/AddDishModal';
import AreYouSure from '../AreYouSure/AreYouSure';
import PendingOrders from '../PendingOrders/PendingOrders';
import PendingOrdersBubble from '../PendingOrdersBubble/PendingOrdersBubble';

export default class VendorHome extends Component {

    state = {
        dishes: [],
        categories: [],
        isLoading: true,
        showDetailedDish: false,
        selectedDishDetails: {},
        message: "",
        changed: false,
        showAddModal: false,
        newDishDetails: {
            Did: "",
            Name: "",
            Price: "",
            Status: "",
            Vid: this.props.user["vid"],
            Description: "",
            CatId: "C1001",
            Image: "",
            ImageType: ""
        },
        file: "",
        imagePreviewUrl: "",
        addDishMessage: "",
        showAreYouSure: false,
        yes: null,
        showPendingOrders: false
    }

    togglePendingOrders = () => {
        let curr = !this.state.showPendingOrders;
        this.setState({
            showPendingOrders: curr
        });
    }

    toggleAddDishModal = () => {
        let curr = !this.state.showAddModal;
        if (curr) {
            this.setState({
                showAddModal: curr,
                yes: this.handleAddDish
            })
        } else {
            this.setState({
                showAddModal: curr,
                yes: null
            })
        }
    }

    toggleAreYouSure = () => {
        let curr = !this.state.showAreYouSure;
        this.setState({
            showAreYouSure: curr
        });
    }

    handleAddDish = () => {
        let obj = { ...this.state.newDishDetails };
        if (obj.Name === "" ||
            obj.Price === "" ||
            obj.Description === "") {
            this.setState({
                addDishMessage: "Please fill all the details"
            });
            return;
        } else {
            this.setState({
                addDishMessage: ""
            })
        }

        if (isNaN(obj.Price)) {
            this.setState({
                addDishMessage: "Price should be all numbers"
            });
            return;
        } else {
            this.setState({
                addDishMessage: ""
            })
        }

        if (this.state.file === "") {
            this.setState({
                addDishMessage: "Please upload an image"
            });
            return;
        } else {
            this.setState({
                addDishMessage: ""
            })
        }

        let img = this.state.imagePreviewUrl.split(",")[1];
        let imgType = this.state.imagePreviewUrl.split(",")[0];

        this.setState({ isLoading: true, showAreYouSure: false });

        obj["Status"] = "N";
        obj["Image"] = img;
        obj["ImageType"] = imgType;
        console.log(obj);
        fetch('/Dish/AddDish', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(res => res.json())
            .then(res => {
                if (res) {
                    this.setState({
                        addDishMessage: "Addition Successful",
                        newDishDetails: {
                            Did: "",
                            Name: "",
                            Price: "",
                            Status: "",
                            Vid: this.props.user["vid"],
                            Description: "",
                            CatId: "C1001",
                            Image: "",
                            ImageType: ""
                        },
                        file: "",
                        imagePreviewUrl: "",
                        isLoading: false
                    })
                } else {
                    this.setState({ addDishMessage: "Something went wrong, try again", isLoading: false })
                }
            })
            .catch(err => this.setState({ addDishMessage: "Something went wrong, try again", isLoading: false }, () => console.log(err)))
    }

    handleNewDishDetails = (e, alt=null) => {
        if (alt === null) {
            let temp = { ...this.state.newDishDetails };
            let name = e.target.name;
            temp[name] = e.target.value
            this.setState({
                newDishDetails: temp
            });
        } else {
            let temp = { ...this.state.newDishDetails };
            temp["Did"] = alt;
            this.setState({
                newDishDetails: temp
            });
        }
    }

    handleDishClick = (dish = null) => {
        if (dish === null) {
            this.setState({
                selectedDishDetails: null,
                showDetailedDish: false,
                yes: null
            })
        } else {
            this.setState({
                selectedDishDetails: dish,
                showDetailedDish: true,
                yes: this.handleDeleteDish
            })
        }
    }

    handleImage = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            }, () => console.log(this.state.imagePreviewUrl));
        }

        reader.readAsDataURL(file);
    }

    removeImage = () => {
        this.setState({ file: "", imagePreviewUrl: "" });
    }

    handleDetailsChange = (e) => {
        let name = e.target.name;
        let message = "";
        let changed = this.state.changed;
        let dishObj = { ...this.state.selectedDishDetails };
        if (e.target.value === "" ||
            dishObj["name"] === "" ||
            dishObj["price"] === "" ||
            dishObj["description"] === "")
            message = "Please fill/select all the fields";
        dishObj[name] = e.target.value;
        if (name === "catId") {
            dishObj["type"] = this.state.categories.find(c => c["catId"] === e.target.value)["name"];
        }
        let foundObj = this.state.dishes.find(dish => dish["did"] == dishObj["did"]);
        if (foundObj["name"] === dishObj["name"] &&
            foundObj["price"] === dishObj["price"] &&
            foundObj["description"] === dishObj["description"] &&
            foundObj["catId"] === dishObj["catId"]) {
            changed = false;
        } else {
            changed = true;
        }
        this.setState({
            message: message,
            selectedDishDetails: dishObj,
            changed: changed
        })
    }

    updateDetails = () => {
        if (this.state.selectedDishDetails["name"] === "" ||
            this.state.selectedDishDetails["price"] === "" ||
            this.state.selectedDishDetails["description"] === "") {
            let message = "Please fill/select all the fields";
            this.setState({ message: message });
            return;
        }
        this.setState({ isLoading: true });
        fetch('/Dish/UpdateDish', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Did: this.state.selectedDishDetails["did"],
                Name: this.state.selectedDishDetails["name"],
                Description: this.state.selectedDishDetails["description"],
                Price: this.state.selectedDishDetails["price"],
                Vid: this.state.selectedDishDetails["vid"],
                CatId: this.state.selectedDishDetails["catId"],
                Status: "N",
                Image: this.state.selectedDishDetails["image"],
                ImageType: this.state.selectedDishDetails["imageType"]
            })
        })
            .then(res => res.json())
            .then(res => {
                if (res) {
                    let foundIndex = this.state.dishes.findIndex(d => d["did"] === this.state.selectedDishDetails["did"])
                    let copy = [...this.state.dishes];
                    copy[foundIndex] = { ...this.state.selectedDishDetails }
                    this.setState({
                        dishes: copy,
                        changed: false,
                        message: "Update Successful",
                        isLoading: false
                    })
                } else {
                    this.setState({ message: "Something went wrong, Try again.", isLoading: false})
                }
            })
            .catch(err => {
                this.setState({ message: "Something went wrong, Try again.", isLoading: false })
            })
    }

    handleDeleteDish = () => {
        this.setState({ isLoading: true, showAreYouSure: false })
        fetch('/Dish/UpdateDish', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Did: this.state.selectedDishDetails["did"],
                Name: this.state.selectedDishDetails["name"],
                Description: this.state.selectedDishDetails["description"],
                Price: this.state.selectedDishDetails["price"],
                Vid: this.state.selectedDishDetails["vid"],
                CatId: this.state.selectedDishDetails["catId"],
                Status: "R",
                Image: this.state.selectedDishDetails["image"],
                ImageType: this.state.selectedDishDetails["imageType"]
            })
        })
            .then(res => res.json())
            .then(res => {
                if (res) {
                    this.setState({
                        selectedDishDetails: {},
                        showDetailedDish: false,
                        changed: false,
                        isLoading: false
                    })
                } else {
                    this.setState({ message: "Something went wrong, Try again." })
                }
            })
            .catch(err => {
                this.setState({ message: "Something went wrong, Try again." })
            });
    }

    componentDidMount() {
        fetch('/Dish/GetAllDishesByVendor/' + this.props.user["vid"])
            .then(res => res.json())
            .then(res => {
                if (res !== null) {
                    fetch('/Dish/GetAllCategories')
                        .then(res => res.json())
                        .then(res1 => {
                            let toRemove = [];
                            for (var i in res) {
                                if (res[i]["status"] === "R") {
                                    toRemove.push(i);
                                }
                            }
                            for (var i = toRemove.length - 1; i >= 0; i--)
                                res.splice(toRemove[i], 1);
                            if (res1 !== null) {
                                this.setState({
                                    dishes: res,
                                    categories: res1,
                                    isLoading: false
                                });
                            }
                        })
                        .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));


    }

    render() {

        let displayDishSetup = <>
            <div className="Backdrop" onClick={() => this.handleDishClick()}></div>
            <VendorDetailedDish
                dish={this.state.selectedDishDetails}
                handleChange={this.handleDetailsChange}
                categories={this.state.categories}
                message={this.state.message}
                changed={!this.state.changed}
                updateDetails={this.updateDetails}
                deleteDish={this.handleDeleteDish}
                areYouSure={this.toggleAreYouSure}
            />
        </>

        let addDishSetup = <>
            <div className="Backdrop" onClick={() => this.toggleAddDishModal()}></div>
            <AddDishModal
                newDish={this.state.newDishDetails}
                handler={this.handleNewDishDetails}
                message={this.state.addDishMessage}
                categories={this.state.categories}
                addDish={this.handleAddDish}
                areYouSure={this.toggleAreYouSure}
                handleImage={this.handleImage}
                img={this.state.imagePreviewUrl}
                removeImage={this.removeImage}
            />
        </>

        let pendingOrdersSetup = <>
            <div className="Backdrop" onClick={() => this.togglePendingOrders()}></div>
            <PendingOrders user={this.props.user} close={this.togglePendingOrders} />
        </>

        return (<div className="VendorHome">
            <NavBar type="1" selected="0" logout={this.props.logout} />
            <VendorDishes
                user={this.props.user}
                mountDish={this.handleDishClick}
                dishes={this.state.dishes} />
            <AddDishBubble handler={this.toggleAddDishModal} />
            <PendingOrdersBubble handler={this.togglePendingOrders} />
            {this.state.showAreYouSure ? <AreYouSure yes={this.state.yes} no={this.toggleAreYouSure} /> : null}
            {this.state.showPendingOrders ? pendingOrdersSetup : null}
            {this.state.showAddModal ? addDishSetup : null}
            {this.state.showDetailedDish ? displayDishSetup : null}
            {this.state.isLoading ? < Loader /> : null}
        </div>);
    }
}