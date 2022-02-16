import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axios/axios'
import "./Sidebar.scss";
import { useDispatch, useSelector } from 'react-redux';
import { setCategories } from '../../redux/createActionTypes';
import { useParams } from 'react-router-dom';

function Sidebar({ className }) {

  const categories = useSelector(state => (state.categories || [])?.filter(x => x.enabled));
  const { categoryId } = useParams()
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (!categories || categories.length === 0) {
      fetchCategories();
    }

  }, [categories])

  const fetchCategories = async () => {
    const { error, data } = await axios.get('/categories');
    if (!error) {
      dispatch(setCategories(data));
    }
  }

  return <nav className={`sidebar ${className}`}>
    <ul className="sidebar__items">
      {
        (categories || []).map(category => <li key={category.id}>
          <Link className={`text-decoration-none sidebar__link ${categoryId === category.key && 'sidebar__link--selected'}`} to={category.key}>
            {category.name}
          </Link>
        </li>)
      }
    </ul>
  </nav>;
}

export default Sidebar;
