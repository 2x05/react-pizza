import React from 'react';
import qs from 'qs';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';

import Sort from '../components/Sort/Sort';
import Categories from '../components/Categories/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import LoadingBlock from '../components/PizzaBlock/LoadingBlock';
import Pagination from '../components/Pagination/Pagination';
import { fetchPizzas } from '../redux/slices/pizzasSlice';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { categoryId, sortType, currentPage, searchValue } = useSelector(
    (state) => state.filterSlice,
  );
  const { items, status, pageCount } = useSelector((state) => state.pizzasSlice);

  const onCangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const getPizzas = async () => {
    const url = new URL('http://127.0.0.1:5000/api/pizzas');
    const params = new URLSearchParams();
    params.append('category', categoryId);
    params.append('sorttype', sortType);
    searchValue && params.append('search', searchValue);
    params.append('pagesize', 4);
    params.append('pagenumber', currentPage);
    url.search = params.toString();
    dispatch(fetchPizzas({ url }));
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
    currentPage > pageCount && dispatch(setCurrentPage(1));
  }, [categoryId, sortType, searchValue, currentPage, pageCount]);

  React.useEffect(() => {
    const queryString = qs.stringify({
      category: categoryId,
      sorttype: sortType,
      search: searchValue,
      pagesize: 4,
      pagenumber: currentPage,
    });
    navigate(`?${queryString}`);
  }, [categoryId, sortType, searchValue, currentPage, pageCount]);

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
          {pageCount > 0 && (
            <Pagination
              onCangePage={(number) => dispatch(setCurrentPage(number))}
              currentPage={currentPage}
              pageCount={pageCount}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Home;
