import React from 'react';
import qs from 'qs';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  setCategoryId,
  setCurrentPage,
  // setPageCount,
  setFilters,
} from '../redux/slices/filterSlice';

import { SearchContext } from '../App';

import Sort from '../components/Sort/Sort';
import Categories from '../components/Categories/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import LoadingBlock from '../components/PizzaBlock/LoadingBlock';
import Pagination from '../components/Pagination/Pagination';
import { fetchPizzas } from '../redux/slices/pizzasSlice';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { categoryId, sortType, currentPage, pageCount } = useSelector(
    (state) => state.filterSlice,
  );
  const { items, status } = useSelector((state) => state.pizzasSlice);

  const { searchValue } = React.useContext(SearchContext);

  const onCangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const getPizzas = async () => {
    const url = new URL('http://127.0.0.1:5000/api/pizzas');
    const params = new URLSearchParams();
    params.append('category', categoryId);
    params.append('sorttype', sortType);
    params.append('search', searchValue);
    params.append('pagesize', 4);
    params.append('pagenumber', currentPage);
    url.search = params.toString();
    dispatch(fetchPizzas({ url }));
    // currentPage > data.pagecount && dispatch(setCurrentPage(1));
    // dispatch(setPageCount(data.pagecount));
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(
        setFilters({
          ...params,
        }),
      );
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    getPizzas();
  }, [categoryId, sortType, searchValue, currentPage]);

  React.useEffect(() => {
    const queryString = qs.stringify({
      category: categoryId,
      sorttype: sortType,
      search: searchValue,
      pagesize: 4,
      pagenumber: currentPage,
    });
    navigate(`?${queryString}`);
  }, [categoryId, sortType, searchValue, currentPage]);

  const skeleton = [...new Array(12)].map((_, index) => <LoadingBlock key={index} />);
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories activeIndex={categoryId} onCangeCategory={onCangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <>
          <div className="content__items">{status === 'loading' ? skeleton : pizzas}</div>
          <Pagination
            onCangePage={(number) => dispatch(setCurrentPage(number))}
            currentPage={currentPage}
            // pageCount={pageCount}
          />
        </>
      )}
    </div>
  );
};

export default Home;
