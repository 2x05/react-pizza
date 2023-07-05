import React from 'react';

import Header from './components/Header/Header';
import Sort from './components/Sort/Sort';
import Categories from './components/Categories/Categories';
import PizzaBlock from './components/PizzaBlock/PizzaBlock';

import './scss/app.scss';

const items = [
  { title: 'Мексиканская', price: '2234' },
  { title: 'Веганская', price: '5643' },
  { title: 'Угандская', price: '9566' },
  { title: 'Итальянская', price: '1234' },
  { title: '4 сыра', price: '2345' },
  { title: 'Неополитана', price: '5632' },
  { title: 'С салом', price: '6674' },
  { title: 'С брынзой', price: '7375' },
];

function App() {
  return (
    <div class="wrapper">
      <Header />
      <div class="content">
        <div class="container">
          <div class="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 class="content__title">Все пиццы</h2>
          <div class="content__items">
            {items.map(({ title, price }) => (
              <PizzaBlock title={title} price={price} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
