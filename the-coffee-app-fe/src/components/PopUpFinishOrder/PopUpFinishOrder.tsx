import Card from '../Card/Index';
import Button from '../Button/Index';
import Exit from '../../share/assets/vector/Exit.svg';
import OrderImage from '../../share/assets/img/finish-order.png';
import './PopUpFinishOrder.css';
import React from 'react';

type Props = {
  onClick?: React.MouseEventHandler<HTMLElement>;
  description?: string;
  title?: string;
};

function PopUpFinishOrder(props: Props) {
  return (
    <Card className="card card--center flex flex-col justify-around">
      <img src={Exit} className="card-confirm-order__exit" onClick={props.onClick} alt="Exit Icon" />

      <div className="card-confirm-order__img">
        <img className="w-[200px]" src={OrderImage} alt="Order Confirmed" />
      </div>
      <div className="text-center">
        <h2 className="card-confirm-order__title">{props.title ?? 'Đơn hàng đang được xử lý !!'}</h2>
        <p className="card-confirm-order__description">
          {props.description ?? 'Bạn sẽ nhận được thông báo sau khi hoàn tất.'}
        </p>
      </div>

      <Button
        onClick={props.onClick}
        className="btn btn-primary btn--enabled card-confirm-order__btn "
        titleButton="VÂNG, CẢM ƠN!"
      />
    </Card>
  );
}

export default PopUpFinishOrder;
