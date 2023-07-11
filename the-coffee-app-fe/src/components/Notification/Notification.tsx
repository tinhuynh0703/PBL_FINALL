import './Notification.css';
import CoffeeImg from '../../share/assets/img/blackcoffee.png';
import { moneyFormat } from '../../utils/MoneyFormat';
// import EditIcon from '../../share/assets/vector/EditIcon.svg';
// import SuccessIcon from '../../share/assets/vector/SuccessIcon.svg';
// import { OrderStatus } from '../../enum';
import cart from '../../share/assets/vector/cart.svg'
import React from 'react';
interface Props {
  price: number;
  title: string;
  quantity: number;
  status: string;
  image: string;
  onClickButton?: React.MouseEventHandler<HTMLButtonElement>;
  onClickNotification?: React.MouseEventHandler<HTMLDivElement>;
}

const Notification = (props: Props) => {
  // TODO: Edit Order in Notification
  // let btnSrc = '';
  // if (props.status === OrderStatus.NEW) {
  //   btnSrc = EditIcon;
  // } else if (props.status === OrderStatus.READY_FOR_PICKUP) {
  //   btnSrc = SuccessIcon;
  // }

  return (
    <div className="notification" onClick={props.onClickNotification}>
      <div className="notification-item">
        <img src={props.image || CoffeeImg} className="notification-item__img" alt={CoffeeImg} />
        <div className="notification-item__detail flex flex-row justify-between">
          <div>
            <b className="notification-item__title">{props.title}</b>
            <div className="flex flex-row mt-[10px]">
              {props.status !== 'cart' ? <p>
                  {moneyFormat(Number(props.price))}đ - Qty: {props.quantity} -
              </p> : <p>
                  {moneyFormat(Number(props.price))}đ - Qty: {props.quantity}
              </p>
              }
              {props.status !== 'cart' ? <pre className={`notification--${props.status}`}> {props.status}</pre> : ''}
            </div>
          </div>
          {/* {btnSrc ? (
            <button className="notification__btn" onClick={props.onClickButton}>
              <img src={btnSrc} alt={btnSrc} />
            </button>
          ) : (
            ''
          )} */}
        </div>
        {props.status === 'cart' ? <img src={cart} className="h-[50px] w-[50px]" alt="cart icon" /> : ''}
      </div>
    </div>
  );
};
export default Notification;
