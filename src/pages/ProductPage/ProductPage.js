import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import ProductCard from '../../components/ProductCard/ProductCard';
import Sidebar from './../../components/Sidebar/Sidebar';
import axios from '../../axios/axios';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReactComponent as UpIcon } from "../../assets/angle-up-solid.svg";
import { ReactComponent as DownIcon } from "../../assets/angle-down-solid.svg";
import './ProductPage.scss';

function ProductPage() {
  const { categoryId } = useParams();
  const categories = useSelector(state => (state.categories || [])?.filter(x => x.enabled));
  const [products, setProducts] = useState([]);
  const [isAccordianOpen, setIsAccordianOpen] = useState(true);
  const history = useHistory();

  useEffect(() => {
    getProducts();
  }, [categoryId]);


  /**
   * Fetch products as per category id
   * */
  const getProducts = async () => {
    const { error, data } = await axios.get('/products', { sku: categoryId });

    if (!error) {
      setProducts(data);
    }
  }


  /**
   * Render Product cards
   * */
  const renderProducts = () => {
    return products.map(product => <Col xs="12" sm="6" lg="3" key={product.name} className="px-0"><ProductCard details={product} /></Col>)
  }

  /**
   * Handle Accordian open close
   * */
  const handleButtonClick = (id) => {
    if (id == categoryId) {
      setIsAccordianOpen(!isAccordianOpen);
    }
    else {
      setIsAccordianOpen(true);
      history.push(`/products/${id}`);
    }
  }

  const shouldShowAccordian = (id) => {
    return categoryId == id && isAccordianOpen;
  }

  return <section className="d-flex product-page">
    <Sidebar className="d-none d-sm-flex" />
    
    {/* Desktop and tablet View of products */}
    <section className="row mx-0 ms-2 d-none d-sm-flex">
      {
        renderProducts()
      }
    </section>

    {/* Mobile view of Product */}
    <Row className="d-flex w-100 mx-0 d-sm-none mt-4">
      <Col className="px-0">
        <div className="accordion" id="accordionExample">
          {categories.map(x =>
            <div key={x.key} className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button" type="button" onClick={() => handleButtonClick(x.key)} data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" tabIndex="0" aria-controls="collapseOne">
                  {x.name}
                  <div className="accordion-icon">
                    {shouldShowAccordian(x.key) ? <UpIcon /> : <DownIcon />}
                  </div>
                </button>
              </h2>
              <div id="collapseOne" className={`accordion-collapse collapse ${shouldShowAccordian(x.key) && 'show'}`} aria-label="headingOne" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  {
                    categoryId == x.key && renderProducts()
                  }
                </div>
              </div>
            </div>
          )
          }
        </div>
      </Col>
    </Row>
  </section>
}

export default ProductPage;
