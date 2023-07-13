import React from 'react';

function Categories({ activeIndex, onCangeCategory }) {
  const categories = [
    { name: 'Все' },
    { name: 'Мясные' },
    { name: 'Вегетарианская' },
    { name: 'Гриль' },
    { name: 'Острые' },
    { name: 'Закрытые' },
  ];
  return (
    <div className="categories">
      <ul>
        {categories.map(({ name }, index) => (
          <li
            key={index}
            onClick={() => onCangeCategory(index)}
            className={activeIndex === index ? 'active' : ''}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
