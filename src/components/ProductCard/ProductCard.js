import React from 'react';
import "./ProductCard.scss";
import { Col, Row } from 'reactstrap';
import CustomButton from './../CustomButton/CustomButton';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../redux/createActionTypes'

function ProductCard({ details }) {
    const { name, description, price, imageURL } = details;
    const dispatch = useDispatch();

    const getLimitedDescription = (description) => {
        const result = description.split(" ");
        return result.length < 20 ? result.join(" ") : result.slice(0, 18).join(" ").concat("...")
    }

    return <article className="product-card row mx-0 px-0 px-1 align-items-center mt-4">
        <header className="col-12 px-0">
            <h6 className="product-card__heading overflow-hidden p-2 ps-0">{name}</h6>
        </header>
        <div className="col-12">
            <div className="row px-2">

                <section className="col-6 col-sm-12 product-card__details px-0">
                    <Row className="mx-0">
                        <Col xs="12" sm="6" lg="12" className="px-0 d-flex align-items-center">
                            <img width={"100%"} src={imageURL} alt={name} />
                        </Col>
                        <Col xs="6" lg="12" className="px-0 d-none ps-lg-0 d-sm-block product-card__descriptioncol">
                            <small className="product-card__description overflow-hidden d-block px-2 pt-2 h-100">{getLimitedDescription(description)}</small>
                        </Col>
                    </Row>
                </section>
                <footer className="col-6 col-sm-12 product-card__footer px-0 py-0 py-sm-3 d-flex d-sm-block">
                    <Row className="mx-0 flex-column flex-md-row justify-content-sm-between">
                        <Col className="d-flex px-0 align-items-center pl-2 d-none d-lg-flex">
                            <small className="product-card__price">MRP Rs. <span>{price}</span></small>
                        </Col>
                        <Col xs="12" className="mb-4 d-sm-none product-card__descriptioncol px-0">
                            <small className="product-card__description overflow-hidden d-block px-2 py-2 h-100">{getLimitedDescription(description)}</small>
                        </Col>
                        <Col className="px-0" xs="12" lg="6">
                            <CustomButton text="Buy Now" className="product-card__action px-1 d-none d-lg-block" onClick={() => dispatch(addItemToCart(details))} />
                            <CustomButton text={`Buy Now @ Rs.${price}`} className="product-card__action px-1 mb-2 mb-sm-0 d-lg-none" onClick={() => dispatch(addItemToCart(details))} />
                        </Col>
                    </Row>
                </footer>
            </div>

        </div>
    </article>

}

export default ProductCard;
