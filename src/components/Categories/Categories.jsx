import React from 'react';

function Categories() {
  const [activeIndex, setActiveIndex] = React.useState(0);
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
            onClick={() => setActiveIndex(index)}
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
