import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Row } from "reactstrap";
import MyCart from '../MyCart/MyCart';
import { ReactComponent as CartLogo } from '../../assets/cart-shopping-solid.svg';
import './Header.scss';

function Header() {
    const [showCart, setShowCart] = useState(false);
    const [cartItemsLength, setCartItemsLength] = useState(0);
    const cart = useSelector(state => Object.values(state.cart), shallowEqual);
    const categoryId = useSelector(state => (state.categories)?.[0]?.key, shallowEqual);

    useEffect(() => {
        setCartItemsLength(cart.length);
    }, [cart]);

    return <nav className="header">
        <div className="app-container">
            <Row className="align-items-center mx-0">
                <Col className="col-3 px-0 py-2 p-sm-2 px-md-0 header__logo">

                    <img src={'/static/images/logo.png'} alt="Sabka Bazaar" width={"100%"} height={100} />

                </Col>
                <Col className="d-flex flex-column align-self-stretch px-0">
                    <Row className="w-100 m-0 p-0 d-none d-md-block">

                        <ul className="header__listitems header__listitems--end">
                            <li><Link to="/signin">Signin</Link></li>
                            <li className="me-lg-0"><Link to="/register">Register</Link></li>
                        </ul>

                    </Row>
                    <Row className="w-100 m-0 p-0 h-100 h-md-auto">
                        <Col className="d-flex align-items-center justify-content-end justify-content-md-between px-0">
                            <ul className="header__listitems header__listitems--start header__listitems--light d-none d-md-flex">
                                <li><Link to="/categories">Home</Link></li>
                                <li><Link to={`/products/${categoryId}`}>Products</Link></li>
                            </ul>

                            <div className="header-cartitems h-100 d-flex align-items-center">
                                <div className="d-flex align-items-center pr-0 p-3" role="button" tabIndex={'0'} onClick={() => setShowCart(!showCart)}>
                                    <CartLogo className="shopping-cart-icon" />
                                    <p className="mx-1 my-0"><span id="header-cartitems__count">{cartItemsLength}</span> Items</p>
                                </div>
                                {showCart && <MyCart toggleCart={() => setShowCart(false)}/>}
                            </div>
                        </Col>

                    </Row>
                </Col>
            </Row>
        </div>
    </nav>;
}

export default Header;
