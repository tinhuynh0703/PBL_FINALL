import DrinkItem from '../DrinkItem/DrinkItem';
import './ListDrinkItem.scss';
import { useState } from 'react';
import { Product } from '../../../../interfaces';
import { getProductId } from '../../../order/actions/order';
import { useAppDispatch } from '../../../../storage/hooks';
import useComponentVisible from '../../../../utils/useComponentVisible';
import OrderProcess from '../../../../components/OrderProcess/OrderProcess';
type Props = {
  listDrink: Product[];
  categoryId: string;
};

function ListDrinkItem(props: Props) {
  const [ref, isOpenPopUp, setIsOpenPopUp] = useComponentVisible(false);
  const [itemDrink, setItemDrink] = useState({} as Product);
  const dispatch = useAppDispatch();
  const togglePopup = (item: Product) => {
    setItemDrink(item);
    setIsOpenPopUp(!isOpenPopUp);
    dispatch(getProductId(item.id));
  };
  return (
    <div className="menu-drink">
      {props.listDrink.map((item) => (
        <DrinkItem item={item} key={item.id} onClick={() => togglePopup(item)} />
      ))}

      {isOpenPopUp && (
        <div ref={ref} className="background-blur">
          {<OrderProcess categoryId={props.categoryId} itemDrink={itemDrink} setIsOpenPopUp={setIsOpenPopUp} />}
        </div>
      )}
    </div>
  );
}

export default ListDrinkItem;
