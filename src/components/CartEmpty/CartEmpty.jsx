import React from 'react';
import { Link } from 'react-router-dom';
import CartEmptyImg from '../../assets/empty-cart.png';

const CartEmpty = () => {
  return (
    <div className="cart cart--empty">
      <h2>
        Корзина пустая <icon>😕</icon>
      </h2>
      <p>
        Вероятнее всего, вы не заказывали ещё пиццу.
        <br />
        Для того, чтобы заказати пиццу, перейдите на главную страницу.
      </p>
      <img src={CartEmptyImg} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Вернутья назад</span>
      </Link>
    </div>
  );
};

export default CartEmpty;
