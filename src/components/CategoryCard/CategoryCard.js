import React from 'react'
import { Col } from 'reactstrap';
import CustomButton from '../CustomButton/CustomButton';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './CategoryCard.scss';

function CategoryCard({ details , index}) {
    const history = useHistory();
    const { key, name, imageUrl, description } = details;
    return (
        <section className="row categories__item my-3 py-5 mx-0" key={key}>
            <Col xs="12" sm="4" className={`categories__image order-sm-${index % 2} order-0 d-flex px-1 p${index % 2 ? 's' : 'e'}-sm-0 align-items-center`}>
                <img width={"100%"} height={"100%"} src={imageUrl} alt="" />
            </Col>
            <Col className="text-center d-flex flex-column px-2 justify-content-center align-items-center">
                <h3 className="my-2">{name}</h3>
                <small className="d-block mt-2 mb-4">{description}</small>
                <CustomButton text={`Explore ${key}`} onClick={() => history.push(`/products/${key}`)} className="w-fit-content p-2 px-3" />
            </Col>
        </section>
    )
}

export default CategoryCard