import React, { useEffect, useState } from 'react';
import axios from '../../axios/axios';
import { Col } from 'reactstrap';
import './CategoriesPage.scss';
import { shallowEqual, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setCategories } from './../../redux/createActionTypes';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import Carousel from '../../components/Carousel/Carousel';

function CategoriesPage() {
  const categories = useSelector(state => (state.categories||[]).filter(x => x.enabled), shallowEqual);
  const dispatch = useDispatch();
  const [carousalItems, setCarousalItems] = useState([]);


  useEffect(() => {
    fetchCategories();
    fetchBanners();
  }, []);

  const fetchCategories = async () => {

    const { error, data } = await axios.get('/categories');
    if (!error) {
      dispatch(setCategories(data));
    }

  }

  const fetchBanners = async () => {
    const { error, data } = await axios.get('/banners');

    if (!error) {
      setCarousalItems(data.filter(x => x.isActive).map(({ id, bannerImageUrl, bannerImageAlt }) => {
        return {
          altText: bannerImageAlt,
          key: id,
          src: bannerImageUrl
        }
      }))
    }
  }
  return <section className="categories">
    <section className="row categories__item my-3 py-5 mx-0">
      <Col xs="12" className="px-0">
        <Carousel 
          items={carousalItems}
        />
      </Col>
    </section>
    {
      (categories || []).map((category, i) => {
        return category.enabled && <CategoryCard key={category.key} details={category} index={i} />
      })
    }
  </section>

}

export default CategoriesPage;
