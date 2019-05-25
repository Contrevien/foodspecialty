import React from 'react';
import './Payment.css';
import AreYouSure from '../AreYouSure/AreYouSure';

export default class Payment extends React.Component {

    state = {
        showAreYouSure: false
    }

    toggleAreYouSure = () => {
        let curr = !this.state.showAreYouSure;
        this.setState({
            showAreYouSure: curr
        });
    }

    render() {
        return (
            <>
            <div className="Payment">
                <h2>Confirm order</h2>
                <div className="Payment-dish">
                    <p>{this.props.name}</p>
                    <div className="Payment-qty">
                        <button
                            style={{ color: 'rgba(255,0,0,0.8)' }} 
                            onClick={(e) => this.props.qtyHandler(e, false)}>
                            -
                            </button>
                        <p>{this.props.qty}</p>
                        <button style={{ color: '#34a33d'}} onClick={(e) => this.props.qtyHandler(e, true)}>+</button>
                    </div>
                </div>
                <div className="Payment-delivery-choice">
                    Choose delivery option
                    <div>
                        <input
                            type="radio"
                            name="delChoice"
                            value="C"
                            onChange={this.props.handleDelChoice}
                            checked={this.props.delChoice === "C"}
                        /> 
                        I will pick it up myself
                    </div>
                    <div>
                        <input
                            type="radio"
                            name="delChoice"
                            value="V"
                            onChange={this.props.handleDelChoice}
                            checked={this.props.delChoice === "V"}
                        />
                        Get it delivered to me
                    </div>
                </div>
                <hr />
                <div className="Payment-type">
                    <div className="Payment-total">
                        <p>Select the method to pay <strong>&#8377;{this.props.amount}</strong></p>
                    </div>
                    <div className="Payment-select-payment">
                        <button
                            name="upi"
                            className={this.props.paymentChoice === "upi" ? "Payment-choice Payment-choice-selected" : "Payment-choice"}
                            onClick={(e) => this.props.paymentDetailsHandler(e, "paymentChoice", "upi")}
                        >UPI</button>
                        <button
                            name="paytm"
                            className={this.props.paymentChoice === "paytm" ? "Payment-choice Payment-choice-selected" : "Payment-choice"}
                            onClick={(e) => this.props.paymentDetailsHandler(e, "paymentChoice", "paytm")}
                        >Paytm</button>
                    </div>
                    <input
                        type="text"
                        name="paymentId"
                        autoComplete="off"
                        placeholder="Enter UPI ID or Paytm number"
                        value={this.props.paymentId}
                        onChange={(e) => this.props.paymentDetailsHandler(e, "paymentId", e.target.value)}
                    />
                </div>
                    <p className="Payment-error-message">{this.props.errorMessage}</p>
                    <button className="pay" onClick={this.toggleAreYouSure}>Confirm</button>
                </div>
                {this.state.showAreYouSure ?
                    <AreYouSure
                        yes={() => {
                            this.toggleAreYouSure();
                            this.props.paymentDoneHandler();
                        }}
                        no={this.toggleAreYouSure}
                    /> : null}
            </>
        );
    }
}