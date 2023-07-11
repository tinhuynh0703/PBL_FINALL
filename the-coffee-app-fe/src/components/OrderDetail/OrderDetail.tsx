import './OrderDetail.css';
import CoffeeImg from '../../share/assets/img/blackcoffee.png';
import avatarDefaultUser from '../../share/assets/vector/AvatarDefault.svg';
import Order from '../../interfaces/order';
import Exit from '../../share/assets/vector/Exit.svg';
import { moneyFormat } from '../../utils/MoneyFormat';
import React, { useState } from 'react';
import PopUpConfirmCancelOrder from '../../features/orderStatus/components/PopUpCancelOrder/PopUpConfirmCancelOrder';
import { OrderStatus } from '../../enum';

interface Props {
  order: Order;
  onClickExit: React.MouseEventHandler<HTMLImageElement>;
  onClosePopUpConfirmCancel: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrderDetail = (props: Props) => {
  const [isShowConfirmCancel, setIsShowConfirmCancel] = useState(false);
  const product = props.order.product;
  const user = props.order.user;

  const onShowPopUpConfirmCancel = () => {
    setIsShowConfirmCancel(true);
  };

  return (
    <>
      {isShowConfirmCancel ? (
        <PopUpConfirmCancelOrder order={props.order} onClosePopUpConfirmCancel={props.onClosePopUpConfirmCancel} />
      ) : (
        <div className="order-detail">
          <div className="order-detail__title">
            <b>Order Details</b>
            <img className="order-detail__title-btn-exit" src={Exit} alt="Exit Icon" onClick={props.onClickExit} />
          </div>
          <div className="order-detail__information">
            <div className="dp-center">
              <img className="order-detail__img" src={props.order.product.images || CoffeeImg} alt="Avatar Drink" />
              <div className="order-detail__information-drink dp-center">
                <p>{product?.name}</p>
                <div className="flex">
                  <p>
                    {moneyFormat(product.price)} - Qty: {props.order.quantity} -&nbsp;
                  </p>
                  <pre className={`order-detail--${props.order.orderStatus.name}`}> {props.order.orderStatus.name}</pre>
                </div>
                {props.order.note && <p>Note: {props.order.note}.</p>}
              </div>
            </div>
            <div className="dp-center">
              <div className="product-detail">
                <img className="order-detail__img" src={user.avatarUrl || avatarDefaultUser} alt="Avatar Customer" />
                <div className="order-detail__information-drink dp-center">
                  <p>Customer info:</p>
                  <p>{user.name}</p>
                </div>
              </div>
            </div>
          </div>
          {![OrderStatus.READY_FOR_PICKUP, OrderStatus.CANCELED].includes(
            props.order.orderStatus.name as OrderStatus,
          ) ? (
            <div className="order-detail__bottom">
              <button className="order-detail__btn-cancel" onClick={onShowPopUpConfirmCancel}>
                Cancel Order
              </button>
            </div>
          ) : (
            ''
          )}
        </div>
      )}
    </>
  );
};

export default OrderDetail;
