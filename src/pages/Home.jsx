import React from 'react';
import { SearchContext } from '../App';

import Sort from '../components/Sort/Sort';
import Categories from '../components/Categories/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import LoadingBlock from '../components/PizzaBlock/LoadingBlock';
import Pagination from '../components/Pagination/Pagination';

const Home = () => {
  const { searchValue } = React.useContext(SearchContext);
  const [item, setItem] = React.useState([]);
  const [isLoadind, setIsLoading] = React.useState(false);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    setIsLoading(true);
    const url = new URL('http://127.0.0.1:5000/api/pizzas/');
    const params = new URLSearchParams();
    params.append('category', categoryId);
    params.append('sorttype', sortType);
    params.append('search', searchValue);
    params.append('pagesize', 4);
    params.append('pagenumber', currentPage);
    url.search = params.toString();
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItem(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);
  const skeleton = [...new Array(12)].map((_, index) => <LoadingBlock key={index} />);
  const pizzas = item.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  return (
    <div className="container">
      <div className="content__top">
        <Categories activeIndex={categoryId} setActiveIndex={setCategoryId} />
        <Sort activeSort={sortType} setActiveSort={setSortType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoadind ? skeleton : pizzas}</div>
      <Pagination onCangePage={(number) => setCurrentPage(number)} currentPage={currentPage} />
    </div>
  );
};

export default Home;
