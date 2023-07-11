import './DrinkItem.scss';
import { moneyPattern } from '../../../../utils/moneyRegex';
import { Product, ProductItem } from '../../../../interfaces';
import React from 'react';

type Props = {
  item: Product | ProductItem;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

function DrinkItem(props: Props) {
  const moneyFormat = (price: number) => {
    return price.toString().replace(moneyPattern, ',');
  };
  return (
    <div className="drink-item" onClick={props.onClick}>
      <img className="sm:w-[100px] md:w-[140px] xxl:w-[160px]" src={props.item.images} alt={props.item.name} />
      <div>
        <div>
          <span className="drink-item__name ">
            {props.item.name}
            <br />
          </span>
        </div>
        <div>
          <span className="drink-item__price">{moneyFormat(props.item.price)}đ</span>
        </div>
      </div>
    </div>
  );
}

export default DrinkItem;
