import React, { useEffect, useState } from 'react';
import './MyCart.scss';
import { Col } from 'reactstrap';
import { Row } from 'reactstrap';
import { shallowEqual, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { decrementQuantity, incrementQuantity, removeItemFromCart } from '../../redux/createActionTypes';
import { ReactComponent as XMark } from '../../assets/xmark-solid.svg';
import { ReactComponent as MinusIcon } from '../../assets/square-minus-solid.svg';
import { ReactComponent as PlusIcon } from '../../assets/square-plus-solid.svg';
import { ReactComponent as RightAngleIcon } from '../../assets/angle-right-solid.svg';
import { useHistory } from 'react-router-dom';


function MyCart({ toggleCart }) {
    const [cartItems, setCartItems] = useState([]);
    const cart = useSelector(state => Object.values(state.cart), shallowEqual);
    const categoryId = useSelector(state => (state.categories)?.[0]?.key, shallowEqual);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        setCartItems(cart);
    }, [cart]);

    const getTotalPrice = () => {
        return cartItems.reduce((acc, curr) => {
            acc += curr.price * curr.quantity;
            return acc;
        }, 0)
    }

    const redirectToProducts = () => {
        history.push(`/products/${categoryId}`);
        toggleCart();
    }

    return <section className={'my-cart row flex-nowrap d-flex flex-column'}>
        <header className="row mx-0 my-cart__header mt-4 mb-3 p-3">
            <h5 className="mb-0">My Cart <span>({cartItems.length} Item)</span></h5>
        </header>
        <section className='my-cart__items mx-0 px-0 justify-content-center'>
            {
                cartItems.map(item => (
                    <article className="row mx-0 px-0 my-2 w-100 my-cart__item" key={item.id}>
                        <Col xs="3" className="d-flex align-items-center my-cart__itemimage">
                            <img width={100} height={100} className="w-100" src={item.imageURL} alt="" />
                        </Col>
                        <Col className="px-0 d-flex justify-content-center flex-column">
                            <Row className="px-0 p-1 mx-0 d-flex justify-content-between">
                                <Col>
                                    <h6 className="mb-0 p-1">{item.name}</h6>
                                </Col>
                                <Col xs="1" className="p-0">
                                    <small role="button" aria-label="Remove item" tabIndex="0" onClick={() => dispatch(removeItemFromCart(item.sku))}>X</small>
                                </Col>
                            </Row>
                            <Row className="px-0 p-1 pe-3 mx-0">
                                <Col xs="12" className="d-flex justify-content-between px-0">
                                    <div className="d-flex align-items-center">
                                        <div className="minus-icon mx-2" role="button" aria-label="Decrease Quantity" tabIndex={'0'} onClick={() => dispatch(decrementQuantity(item.sku))}>
                                            <MinusIcon />
                                        </div>
                                        <p className="mx-2 mb-0">{item.quantity}</p>
                                        <div className="plus-icon mx-2" role="button" aria-label="Increase Quantity" tabIndex={'0'} onClick={() => dispatch(incrementQuantity(item.sku))}>
                                            <PlusIcon />
                                        </div>
                                        <XMark className="x-icon" />
                                        <p className="mx-2 mb-0">Rs. {item.price * item.quantity}</p>
                                    </div>
                                    <p className="mb-0 align-self-center">Rs.{item.price * item.quantity}</p>
                                </Col>
                            </Row>

                        </Col>
                    </article>
                ))
            }
            {cartItems && cartItems.length ? <div className="my-cart__extracontent d-flex align-items-center">
                <img height={"100%"} src="/static/images/lowest-price.png" alt="Lowest price" />
                <p className="mb-0 ps-3">You won't find it cheaper anywhere</p>
            </div> :
                <div className="text-center h-100 d-flex justify-content-center flex-column">
                    <p className="my-cart__noitems mb-1">No Items in Your cart</p>
                    <p className="my-cart__noitems-description">Your Favourite items are just a click away</p>
                </div>}
        </section>
        <footer className="row mx-0 px-0 my-cart__footer d-flex flex-column w-100 align-items-center">
            {cartItems && cartItems.length ? <>
                <p className="mb-0 text-center">Promocode can be applied on payment page</p>
                <div className="my-cart__checkout d-flex justify-content-between mb-1" role="button" tabIndex="0">
                    <p className="my-cart_proceed mb-0 ms-1 p-0">Proceed to Checkout</p>
                    <p className="my-cart__mrp d-flex mr-1 mb-0 align-items-center p-0">Rs. <span>{getTotalPrice()}</span><span className="right-angle-icon">
                        <RightAngleIcon />
                    </span></p>
                </div>
            </>
                : <button className="my-cart__start-shopping" onClick={redirectToProducts}>Start Shopping</button>}
        </footer>
    </section>
}

export default MyCart;
