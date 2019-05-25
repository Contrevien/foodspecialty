import React from 'react';
import './FAQ.css';
import NavBar from '../NavBar/NavBar';

export default class FAQ extends React.Component {

    state = {
        questions: [
            "How does it work?",
            "How much does it cost to use the service?",
            "How can I contact Food Speciality?",
            "How do I check the status of my recent order?",
            "Is there a delivery charge?",
            "How can I sell my food/cuisine on Food Speciality?",
            "Can I cancel my order?",
            "What if I have a problem with my order?",
            "What about refund if the order is not delivered?",
            "Who can be a vendor?"
        ],
        answers: [
            "Enter your location to find your favorite cuisine available for delivery nearby you. Select the items you'd like to have delivered. Pay the order amount. Your favourite cuisine will be at your doorstep before yo know it.",
            "Free, if you collect your order directly fro the vendor. There is a standard delivery charge if you want your order to be delivered at your place.",
            "Raise a query in other types in the contact page and our admin will get in touch soon.",
            "If you’re logged in, you’ll see the status of your order on the Food Speciality homepage under 'Orders'",
            "Yes there is a delivery charge of 50 Rs.",
            "To sell your cuisine, first register on food speciality as a vendor. Complete your profile. Add your cuisine with other required information and you are all set to go.",
            "Not from the application but you can contact the admin or the vendor directly.",
            "Raise a request under the 'Order related' type in the COntact page and our admin will get in touch soon.",
            "The refund will take a few business days as it is not automated as of now.",
            "Anyone as long as they can cook!"
        ]
    }

    render() {
        return (
            <div className="FAQ">
                <NavBar selected="4" logout={this.props.logout} />
                <div className="FAQ-display">
                    <h1 style={{
                        fontFamily: "Lobster"
                    }}>FAQ</h1>
                    {
                        this.state.questions.map((q, i) => {
                            return <>
                                <p className="FAQ-question">{q}</p>
                                <p className="FAQ-answer">{this.state.answers[i]}</p>
                            </>
                        })
                    }
                </div>
                
            </div>
        )
    }
}