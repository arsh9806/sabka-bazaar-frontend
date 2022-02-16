import React, { useEffect, useState } from 'react'
import './Carousel.scss';

function Carousel({ items = [] }) {
    const [currentItem, setCurrentItem] = useState(0);
    const itemLength = items.length;

    const nextSlide = () => {
        setCurrentItem((currentItem + 1) % itemLength);
    }

    const prevSlide = () => {
        setCurrentItem(currentItem ? currentItem - 1 : itemLength - 1);
    }


    return (
        <section className="carousel">
            <button className="carousel__controls carousel__controls--prev" onClick={prevSlide}>PREV</button>
            <button className="carousel__controls carousel__controls--next" onClick={nextSlide}>NEXT</button>
            <ul className="carousel__items" style={{ transform: `translateX(-${currentItem * 100}%)` }}>
                {
                    items.map(item => (
                        <li className="carousel__item" key={item.key}>
                            <img width={"100%"} height={"100"} src={item.src} alt={item.altText} />
                        </li>
                    ))
                }
            </ul>

            <div className="carousel__indicators d-flex">
                {
                    items.map((item, i) => (
                        <div onClick={() => setCurrentItem(i)} key={item.key} className={`carousel__indicator ${i == currentItem && "carousel__indicator--active"}`}></div>
                    ))
                }
            </div>
        </section>

    )
}

export default Carousel