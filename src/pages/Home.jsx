import React from 'react';

import Sort from '../components/Sort/Sort';
import Categories from '../components/Categories/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import LoadingBlock from '../components/PizzaBlock/LoadingBlock';

const Home = () => {
  const [item, setItem] = React.useState([]);
  const [isLoadind, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    fetch('http://127.0.0.1:5000/pizzas')
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItem(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoadind
          ? [...new Array(12)].map((_, index) => <LoadingBlock key={index} />)
          : item.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};

export default Home;
