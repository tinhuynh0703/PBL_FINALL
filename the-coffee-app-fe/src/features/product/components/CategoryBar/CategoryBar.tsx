import './CategoryBar.scss';
import CategoryItem from '../CategoryItem/CategoryItem';
import Category from '../../../../interfaces/category';
import React, { createRef, useMemo, useRef } from 'react';

type Props = {
  onGetIdHandler(id: number | string): void;
  listCategory: Category[];
  categoryId: string;
};

function CategoryBar(props: Props) {
  const divRef = useRef([]);

  divRef.current = useMemo(
    () => props.listCategory.map((_, i) => divRef.current[i] ?? createRef()),
    [props.listCategory],
  );

  const handleClickCategoryItem = (itemId: string, index: number) => {
    props.onGetIdHandler(itemId);
    (divRef.current[index] as React.MutableRefObject<HTMLDivElement>).current.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
    });
  };

  return (
    <>
      {props.listCategory.map((item, i) => (
        <div
          ref={divRef.current[i]}
          key={item.id}
          className={`category-item ${item.id === props.categoryId ? 'active' : ''}`}
          onClick={() => handleClickCategoryItem(item.id, i)}
        >
          <CategoryItem item={item} />
        </div>
      ))}
    </>
  );
}

export default CategoryBar;
