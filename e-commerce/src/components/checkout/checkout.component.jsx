import React from "react";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import {selectCartItems, selectCartTotal} from "../../redux/cart/cart.selector";
import CheckoutItem from "../checkout-item/checkout-item.component";

import "./checkout.styles.scss";


const CheckoutPage = ({cartItems, total}) => (
    <div className='checkout-page'>
        <div className='checkout-header'>
            <div className='header-block'>
                <span>Product</span>
            </div>
            <div className='header-block'>
                <span>Description</span>
            </div>
            <div className='header-block'>
                <span>Quantity</span>
            </div>
            <div className='header-block'>
                <span>Price</span>
            </div>
            <div className='header-block'>
                <span>Remove</span>
            </div>
        </div>
        {
            cartItems.map(item => {
                debugger
                return <CheckoutItem key={item.id} cartItem={item} />
            })
        }
        <div className='total'>
            <span>TOTAL: ${total}</span>
        </div>
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);