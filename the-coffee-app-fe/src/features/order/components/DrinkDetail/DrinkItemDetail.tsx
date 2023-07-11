import Exit from '../../../../share/assets/vector/Exit.svg';
import Summation from '../../../../share/assets/vector/Summation.svg';
import Subtraction from '../../../../share/assets/vector/Subtraction.svg';
import VectorSub from '../../../../share/assets/vector/VectorSub.svg';
import Edit from '../../../../share/assets/vector/EditIcon.svg';
import Button from '../../../../components/Button/Index';
import Card from '../../../../components/Card/Index';
import Input from '../../../../components/Input/Input';
import './DrinkItemDetail.css';
import DrinkItem from '../../../product/components/DrinkItem/DrinkItem';
import { Product, ProductItem } from '../../../../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { getNote, getQuantity, selectOrderState } from '../../actions/order';
import React from 'react';

type Props = {
  loading: boolean;
  item: Product | ProductItem;
  handleClickExitPopUp?: React.MouseEventHandler<HTMLImageElement>;
  handleClickPlaceOrder?: () => void;
  handleClickCancelOrder?: () => void;
  handleClickAddCart?: () => void;
  isFormEditOrder?: boolean;
};

function DrinkItemDetail(props: Props) {
  const dispatch = useDispatch();
  const order = useSelector(selectOrderState);
  const onSubOneUnit = () => {
    if (order.quantity > 1) {
      dispatch(getQuantity(-1));
    }
  };

  const onPlusOneUnit = () => {
    dispatch(getQuantity(1));
  };

  const onChangeNote: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(getNote(e.target.value));
  };

  return (
    <Card className="card card--detail">
      <img src={Exit} className="popup-detail__exit" onClick={props.handleClickExitPopUp} alt="Exit Icon" />
      <div className="popup-detail__drink-item">
        <DrinkItem item={props.item} />
      </div>

      <div className="popup-detail__input-group">
        <Input
          // TODO: remove this line when do feature customer can edit order
          src2={props.isFormEditOrder ? '' : order.quantity <= 1 ? Subtraction : VectorSub}
          src={props.isFormEditOrder ? '' : Summation}
          className="popup-detail__input"
          type="number"
          value={order.quantity}
          onClickFirstIcon={onSubOneUnit}
          onClickSecondIcon={onPlusOneUnit}
          readOnly={true}
        />
        <Input
          placeholder="Ghi chú"
          src={Edit}
          onChange={onChangeNote}
          value={order.note}
          readOnly={props.isFormEditOrder}
        />
      </div>
      {props.isFormEditOrder ? (
        //TODO: Add Button Save Change and change button cancel order to paragraph

        <Button
          className="btn btn-primary btn--enabled popup-detail__button text-style-1440-button"
          titleButton="Hủy đơn hàng"
          onClick={props.handleClickCancelOrder}
        />
      ) : (
        <>
          <Button
            isLoading={props.loading}
            className="btn btn-primary btn--enabled popup-detail__button text-style-1440-button"
            titleButton="Đặt ngay!"
            onClick={props.handleClickPlaceOrder}
          />
        </>
      )}
    </Card>
  );
}

export default DrinkItemDetail;
