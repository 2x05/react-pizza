import React from 'react';
import axios from 'axios';
import qs from 'qs';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  setCategoryId,
  setCurrentPage,
  setPageCount,
  setFilters,
} from '../redux/slices/filterSlice';

import { SearchContext } from '../App';

import Sort from '../components/Sort/Sort';
import Categories from '../components/Categories/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import LoadingBlock from '../components/PizzaBlock/LoadingBlock';
import Pagination from '../components/Pagination/Pagination';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sortType, currentPage, pageCount } = useSelector(
    (state) => state.filterSlice,
  );

  const { searchValue } = React.useContext(SearchContext);
  const [item, setItem] = React.useState([]);
  const [isLoadind, setIsLoading] = React.useState(false);

  const onCangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const fetchPizzas = () => {
    setIsLoading(true);
    const url = new URL('http://127.0.0.1:5000/api/pizzas');
    const params = new URLSearchParams();
    params.append('category', categoryId);
    params.append('sorttype', sortType);
    params.append('search', searchValue);
    params.append('pagesize', 4);
    params.append('pagenumber', currentPage);
    url.search = params.toString();
    axios.get(url).then((res) => {
      currentPage > res.data.pagecount && dispatch(setCurrentPage(1));
      setItem(res.data.data);
      dispatch(setPageCount(res.data.pagecount));
      setIsLoading(false);
    });
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(
        setFilters({
          ...params,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        category: categoryId,
        sorttype: sortType,
        search: searchValue,
        pagesize: 4,
        pagenumber: currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage]);

  const skeleton = [...new Array(12)].map((_, index) => <LoadingBlock key={index} />);
  const pizzas = item.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories activeIndex={categoryId} onCangeCategory={onCangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoadind ? skeleton : pizzas}</div>
      {pageCount > 0 && (
        <Pagination
          onCangePage={(number) => dispatch(setCurrentPage(number))}
          currentPage={currentPage}
          pageCount={pageCount}
        />
      )}
    </div>
  );
};

export default Home;
