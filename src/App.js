import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect, Link, BrowserRouter as Router } from 'react-router-dom';
import Login from './components/Login/Login';
import VendorHome from './components/VendorHome/VendorHome';
import UserHome from './components/UserHome/UserHome';
import VendorLogin from './components/VendorLogin/VendorLogin';
import Register from './components/Register/Register';
import Loader from './components/Loader/Loader';
import UserProfile from './components/UserProfile/UserProfile';
import DetailedDish from './components/DetailedDish/DetailedDish';
import NotFound from './components/NotFound/NotFound';
import OrderedBubble from './components/OrderedBubble/OrderedBubble';
import OrderModal from './components/OrderModal/OrderModal';
import Contact from './components/Contact/Contact';
import FAQ from './components/FAQ/FAQ';
import VendorProfile from './components/VendorProfile/VendorProfile';
import UsersOrder from './components/UsersOrder/UsersOrder';
import VendorsOrder from './components/VendorsOrder/VendorsOrder';
import AdminController from './components/AdminController/AdminController';
import AdminHome from './components/AdminHome/AdminHome';
import AdminUsers from './components/AdminUsers/AdminUsers';
import AdminVendors from './components/AdminVendors/AdminVendors';
import AdminCat from './components/AdminCat/AdminCat';
import AdminOrders from './components/AdminOrders/AdminOrders';
import AdminPendingDishes from './components/AdminPendingDishes/AdminPendingDishes';
import AdminPendingQueries from './components/AdminPendingQueries/AdminPendingQueries';
import Map from './components/Map/Map';

class App extends Component {

    state = {
        type: 0,
        loggedIn: false,
        user: {
            uid: "",
            name: "",
            email: "",
            password: "",
            address: "",
            phone: ""
        },
        userUpdated: false,
        isLoading: true,
        hasClickedOnOrder: false,
        order: null,
        showOrderModal: false,
        hasPendingOrder: false
    }

    componentDidMount() {
        let email = localStorage.getItem('email');
        if (email) {
            let type = localStorage.getItem('type');
            if (type === "0") {
                fetch('/Users/GetUser/' + email)
                    .then(res => res.json())
                    .then(res => {
                        fetch('/Users/GetNotDeliveredForUser/' + email)
                            .then(res => res.json())
                            .then(res1 => {
                                if (res1 === null) {
                                    this.setState({
                                        loggedIn: true,
                                        user: res,
                                        isLoading: false
                                    })
                                }
                                else {
                                    this.setState({
                                        loggedIn: true,
                                        user: res,
                                        order: res1,
                                        hasPendingOrder: true,
                                        showOrderModal: true,
                                        isLoading: false
                                    })
                                }
                            })
                            .catch(err => console.log(err));
                    })
                    .catch(err => console.log(err));
            }
            else if (type === "1") {
                fetch('/Vendor/GetVendor/' + email)
                    .then(res => res.json())
                    .then(res => {
                        console.log(this.state.loggedIn, res)
                            this.setState({
                                loggedIn: true,
                                user: res,
                                type: 1,
                                isLoading: false
                            })
                    })
                    .catch(err => console.log(err));
            }
            
        } else {
            this.setState({ isLoading: false })
        }
    }

    updateOrder = (order) => {
        this.setState({
            order: order,
            hasPendingOrder: true,
            showOrderModal: true
        })
    }

    handleReceived = () => {
        let order = this.state.order;
        fetch('/Order/UpdateOrder', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Oid: this.state.order["oid"],
                Did: this.state.order["did"],
                Uid: this.state.order["uid"],
                Vid: this.state.order["vid"],
                OrderTime: this.state.order["orderTime"],
                Quantity: this.state.order["quantity"],
                DelStatus: this.state.order["delStatus"] + "A"
            })
        })
            .then(res => res.json())
            .then(res => {
                if (res === true) {
                    this.setState({
                        hasPendingOrder: false,
                        order: null
                    });
                }
            })
            .catch(err => console.log(err));
    }

    handleOrderModal = () => {
        var curr = this.state.showOrderModal;
        if (this.state.order !== null &&
            (this.state.order["delStatus"] === "R" ||
                this.state.order["delStatus"] === "D")) {
            this.handleReceived();
        } else if(this.state.order["delStatus"] === "RA" 
        || this.state.order["delStatus"] === "D") {
            this.setState({ 
                showOrderModal: !curr,
                hasClickedOnOrder: true,
                order: null,
                hasPendingOrder: false 
            });
            return;
        }
        this.setState({ showOrderModal: !curr, hasClickedOnOrder: true });
    }

    handleLogout = () => {
        localStorage.removeItem('email');
        localStorage.removeItem('type');
        this.setState({ loggedIn: false, user: null, type: 0 });
    }

    toggleLoggedIn = (type, user) => {
        let value = !this.state.loggedIn;
        if (type !== 2) {
            localStorage.setItem('email', user["email"]);
            localStorage.setItem('type', type.toString());
        }
        
        this.setState({ loggedIn: value, user: user, type: type, isLoading: false });
    }

    toggleLoader = () => {
        let value = !this.state.isLoading;
        this.setState({ isLoading: value });
    }

    updateUser = (user) => {
        localStorage.setItem('email', user["email"]);
        this.setState({ user: user, userUpdated: true });
    }

    render() {

        let orderModalSetup = <>
            <div className="Backdrop" onClick={this.handleOrderModal}></div>
            <OrderModal order={this.state.order} />
        </>

      return (
          <Router>
              <div className="App">
                  <Switch>
                  <Route exact path="/"
                      component={(props) => {
                          return !this.state.loggedIn?
                              <Login {...props} loggedIn={this.toggleLoggedIn}
                                  loader={this.toggleLoader} /> :
                              <Redirect to="/UserHome" />
                          }} />

                    <Route exact path="/AdminLogin"
                        component={(props) => {
                            return !this.state.loggedIn ?
                                <AdminController
                                    {...props}
                                    loggedIn={this.toggleLoggedIn}
                                    loader={this.toggleLoader} /> :
                                <Redirect to="/AdminHome" />
                        }} />

                <Route exact path="/VendorLogin" component={(props) => !this.state.loggedIn ?
                    <VendorLogin {...props} loggedIn={this.toggleLoggedIn} loader={this.toggleLoader} /> :
                    <Redirect to="/VendorHome" />
                } />
                <Route exact path="/Register" component={(props) =>
                    !this.state.loggedIn ?
                        <Register {...props} loggedIn={this.toggleLoggedIn} loader={this.toggleLoader} /> :
                        <Redirect to="/" />
                    } />

                <Route exact path="/UserHome" component={(props) =>
                        this.state.loggedIn && this.state.type === 0 ?
                        <UserHome
                            {...props}
                            user={this.state.user}
                            logout={this.handleLogout}
                            loader={this.toggleLoader}/> :
                        <Redirect to="/VendorHome" />
                } />

                <Route exact path="/VendorHome" component={(props) =>
                        this.state.loggedIn && this.state.type === 1 ?
                            <VendorHome
                                {...props}
                                user={this.state.user}
                                loader={this.toggleLoader}
                                logout={this.handleLogout}
                            /> :
                        <Redirect to="/" />
                    } />

                    <Route exact path="/AdminHome" component={(props) =>
                        this.state.loggedIn && this.state.type === 2 ?
                            <AdminHome
                                {...props}
                                user={this.state.user}
                                loader={this.toggleLoader}
                                logout={this.handleLogout}
                            /> :
                            <Redirect to="/" />
                    } />

                    <Route exact path="/AdminUsers" component={(props) =>
                        this.state.loggedIn ?
                            <AdminUsers
                                {...props}
                                user={this.state.user}
                                logout={this.handleLogout}
                            /> :
                            <Redirect to="/" />
                    } />

                    <Route exact path="/AdminVendors" component={(props) =>
                        this.state.loggedIn ?
                            <AdminVendors
                                {...props}
                                user={this.state.user}
                                logout={this.handleLogout}
                            /> :
                            <Redirect to="/" />
                    } />

                    <Route exact path="/AdminCat" component={(props) =>
                        this.state.loggedIn ?
                            <AdminCat
                                {...props}
                                user={this.state.user}
                                logout={this.handleLogout}
                            /> :
                            <Redirect to="/" />
                    } />

                    <Route exact path="/AdminOrders" component={(props) =>
                        this.state.loggedIn ?
                            <AdminOrders
                                {...props}
                                user={this.state.user}
                                logout={this.handleLogout}
                            /> :
                            <Redirect to="/" />
                    } />

                    <Route exact path="/PendingDishes" component={(props) =>
                        this.state.loggedIn ?
                            <AdminPendingDishes
                                {...props}
                                user={this.state.user}
                                logout={this.handleLogout}
                            /> :
                            <Redirect to="/" />
                    } />
                    
                    <Route exact path="/PendingQueries" component={(props) =>
                        this.state.loggedIn ?
                            <AdminPendingQueries
                                {...props}
                                user={this.state.user}
                                logout={this.handleLogout}
                            /> :
                            <Redirect to="/" />
                    } />

                  <Route exact path="/UserProfile" component={(props) =>
                      this.state.loggedIn ?
                          <UserProfile
                              {...props}
                              user={this.state.user}
                              updateUser={this.updateUser}
                              userUpdated={this.state.userUpdated}
                              logout={this.handleLogout}
                              loader={this.toggleLoader}
                          /> :
                          <Redirect to="/" />
                      } />

                      <Route exact path="/VendorProfile" component={(props) =>
                          this.state.loggedIn ?
                              <VendorProfile
                                  {...props}
                                  user={this.state.user}
                                  updateUser={this.updateUser}
                                  userUpdated={this.state.userUpdated}
                                  logout={this.handleLogout}
                                  loader={this.toggleLoader}
                              /> :
                              <Redirect to="/" />
                      } />

                      <Route exact path="/Contact" component={(props) => {
                          return this.state.loggedIn ?
                              <Contact
                                  {...props}
                                  closeModal={this.handleOrderModal}
                                  user={this.state.user}
                                  type={this.state.type}
                                  logout={this.handleLogout}
                                  updateUser={this.updateUser}
                              /> :
                              <Redirect to="/" />
                      }} />

                      <Route exact path="/FAQ" component={(props) =>
                          this.state.loggedIn ?
                              <FAQ
                                  {...props}
                                  user={this.state.user}
                                  logout={this.handleLogout}
                              /> :
                              <Redirect to="/" />
                      } />

                      <Route exact path="/VendorOrder" component={(props) =>
                          this.state.loggedIn ?
                              <VendorsOrder
                                  {...props}
                                  user={this.state.user}
                                  logout={this.handleLogout}
                              /> :
                              <Redirect to="/" />
                      } />

                      <Route exact path="/UserOrder" component={(props) =>
                          this.state.loggedIn ?
                              <UsersOrder
                                  {...props}
                                  user={this.state.user}
                                  logout={this.handleLogout}
                              /> :
                              <Redirect to="/" />
                      } />

                  <Route exact path="/DetailedDish/:id" component={(props) =>
                      this.state.loggedIn ?
                          <DetailedDish
                                  {...props}
                                  user={this.state.user}
                                  logout={this.handleLogout}
                                  loader={this.toggleLoader}
                                  updateOrder={this.updateOrder}
                                  hasPendingOrder={this.state.hasPendingOrder}
                          /> :
                          <Redirect to="/" />
                      } />

                    <Route exact path="/Map" component={(props) => <Map {...props}
                      message="The page was not found"/>} />

                      <Route component={(props) => <NotFound {...props}
                      message="The page was not found"/>} />
                  </Switch>

                  {this.state.isLoading ?
                      <Loader /> :
                      null}

                  {
                      this.state.loggedIn && this.state.hasPendingOrder ?
                          <OrderedBubble
                              order={this.state.order}
                              hasClickedOnOrder={this.state.hasClickedOnOrder}
                              handler={this.handleOrderModal}
                          />
                      : null
                  }

                  {
                      this.state.loggedIn && this.state.showOrderModal && this.state.order !== null ?
                          orderModalSetup : null
                  }

              </div>
          </Router>
    );
  }
}

export default App;
