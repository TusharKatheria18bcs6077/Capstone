import React, { useState } from 'react'
import './paymentpage.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom'
import axios from 'axios'
import SplitPane, {
    Divider,
    SplitPaneBottom,
    SplitPaneLeft,
    SplitPaneRight,
    SplitPaneTop,
} from "./SplitPane";
import QuoteContext from "./QuoteContext";
import { MDBBtn } from "mdb-react-ui-kit";


function PaymentPage(props) {

    const navigate = useNavigate()
    const location = useLocation()
    const quotes = [];
    const [result, setResult] = useState(location.state)
    const [currQuote, setCurrQuote] = useState(1);
    const clickHandler = () => {
        navigate("/confirmpayment", { state: result })
    }
    const clickHome = () => {
        navigate("/home", { state: result })
    }

    return (
        <div >
            <QuoteContext.Provider value={{ quotes, currQuote, setCurrQuote }}>
                <SplitPane className="split-pane-row">
                    <SplitPaneLeft>
                        <SplitPane className="split-pane-col">
                            <h2>Free</h2><br />
                            <div className="ldiv">
                                <img src="data:image/png;base64,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" className="symbol"></img>
                                <h6>Personalised Diet Plan</h6><br /><br />
                                <img src="data:image/png;base64,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" className="symbol"></img>
                                <h6>Personalised Workout Plan</h6><br /><br />
                                <img src="data:image/png;base64,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" className="symbol"></img>
                                <h6>Early Access</h6><br /><br />
                            </div>
                        </SplitPane>
                    </SplitPaneLeft>
                    <Divider className="separator-col" />
                    <SplitPaneRight>
                        <h2>Paid</h2><br />
                        <div className="rdiv">
                            <img src="data:image/png;base64,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"
                                className="symbol"></img>

                            <h6>Personalised Diet Plan</h6><br /><br />
                            <img src="data:image/png;base64,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" className="symbol"></img>

                            <h6>Personalised Workout Plan</h6><br /><br />
                            <img src="data:image/png;base64,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" className="symbol"></img>

                            <h6>Early Access</h6><br /><br />
                        </div>

                    </SplitPaneRight>

                </SplitPane>
                <div className="border d-flex justify-content-center">
                    <MDBBtn onClick={clickHandler}>Pay $3.99</MDBBtn>
                    <MDBBtn onClick={clickHome}>Go Back</MDBBtn>
                </div>
            </QuoteContext.Provider>
        </div>
    );
}

export default PaymentPage;