import Button from '../../../../components/Button/Index';
import Card from '../../../../components/Card/Index';
import DrinkItem from '../../../product/components/DrinkItem/DrinkItem';
import Exit from '../../../../share/assets/vector/Exit.svg';
import Order from '../../../../interfaces/order';
import './PopUpReceiveCanceledOrderCustomer.css';
import '../../../order/components/DrinkDetail/DrinkItemDetail.css';
import React from 'react';

type Props = {
  order: Order;
  onCloseForm: React.MouseEventHandler;
};

const PopUpReceiveCanceledOrderCustomer = (props: Props) => {
  const { product, reason } = props.order;

  return (
    <>
      <Card className="card card--center ">
        <img src={Exit} className="popup-detail__exit" alt="Exit Icon" onClick={props.onCloseForm} />
        <div className="order-canceled">
          <p className="order-canceled__title">ORDER CANCELED</p>
          <DrinkItem item={product} />
          <div className="sm:py-[10%] md:py-[30%]">
            <p className="order-canceled__reason mb-[16px]">We’re sorry that your order has been canceled.</p>
            <p className="order-canceled__reason">Reason: {reason}.</p>
          </div>
          <Button className="btn btn-primary btn--enabled" titleButton="OKAY, I SEE" onClick={props.onCloseForm} />
        </div>
      </Card>
    </>
  );
};

export default PopUpReceiveCanceledOrderCustomer;
