import React, { useState } from 'react';
import { useAppDispatch } from '../../../../storage/hooks';
import { OrderStatus } from '../../../../enum';
import { updateStatusOrder } from '../../../updateOrder/action/updateOrder';
import { sendNotificationRemindPickUpOrder } from '../../../notifications/action/notification';
import { moneyFormat } from '../../../../utils/MoneyFormat';
import { VN_CURRENCY_SYMBOL } from '../../../../constant';
import { Draggable } from 'react-beautiful-dnd';

import avatarMiniUser from '../../../../share/assets/vector/AvatarMiniUser.svg';
import nextIcon from '../../../../share/assets/vector/nextIcon.svg';
import iconPickedUp from '../../../../share/assets/vector/iconpickedUp.svg';
import alarmIcon from '../../../../share/assets/vector/AlarmIcon.svg';
import BlackCoffeeImg from '../../../../share/assets/img/blackcoffee.png';
import useComponentVisible from '../../../../utils/useComponentVisible';
import OrderDetail from '../../../../components/OrderDetail/OrderDetail';
import Order from '../../../../interfaces/order';

import './OrderItemStaff.css';
import { updateOrder } from '../../../orderStatus/action/orderStatus';
interface Props {
  order: Order;
  setIsShowNotification?: React.Dispatch<React.SetStateAction<boolean>>;
  index: number;
}

const OrderItemStaff = (props: Props) => {
  const [isDisabledUpdateOrder, setIsDisabledUpdateOrder] = useState(false);
  const [ref, isComponentVisible, setIsComponentVisible] = useComponentVisible(false);

  const dispatch = useAppDispatch();

  const icon = props.order.orderStatus.name === OrderStatus.READY_FOR_PICKUP ? iconPickedUp : nextIcon;

  const onUpdateStatusHandler = (e: React.SyntheticEvent) => {
    e.stopPropagation();

    if (isDisabledUpdateOrder) {
      return;
    }
    setIsDisabledUpdateOrder(true);

    const valueNewStatus = props.order.orderStatus.value + 1;
    dispatch(updateStatusOrder({ id: props.order.id, newStatus: valueNewStatus }));

    setIsDisabledUpdateOrder(false);
  };

  const onShowDetailOrder = () => {
    setIsComponentVisible(true);
  };

  const onRemindOrder = async (e: React.SyntheticEvent) => {
    e.stopPropagation();

    const bodyNotificationPickUpOrderApi = {
      orderId: props.order.id,
    };
    await dispatch(sendNotificationRemindPickUpOrder(bodyNotificationPickUpOrderApi));
    props.setIsShowNotification?.(true);
  };

  const onExitFormHandler = () => {
    setIsComponentVisible(false);
  };

  const onSubmitCancelOrder = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(updateOrder(props.order, OrderStatus.CANCELED));
  };

  return (
    <>
      <Draggable
        draggableId={props.order.id}
        index={props.index}
        isDragDisabled={props.order.orderStatus.name === 'ready for pickup'}
      >
        {(provided) => {
          return (
            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
              <div
                className={`order-item-staff ${
                  props.order.orderStatus.name === OrderStatus.CANCELED ? 'bg-grey-2' : 'bg-white'
                }`}
                onClick={onShowDetailOrder}
              >
                <img
                  src={props.order.product.images || BlackCoffeeImg}
                  className="order-item-staff__img"
                  alt="Avatar Drink"
                />
                <div className="order-detail-staff">
                  <div className="order-detail-staff__group">
                    <div className="flex flex-row items-start justify-between">
                      <b className="order-detail-staff__product">{props.order.product.name}</b>
                      <img className="order-detail-staff__avatar" src={avatarMiniUser} alt="Avatar Customer" />
                    </div>
                    <div className="flex">
                      <p className="order-detail-staff__price">
                        {moneyFormat(Number(props.order.product.price))}
                        {VN_CURRENCY_SYMBOL} - Qty: {props.order.quantity}
                      </p>
                      {props.order.orderStatus.name === OrderStatus.READY_FOR_PICKUP && (
                        <img
                          src={alarmIcon}
                          alt="Icon Alarm"
                          className="order-detail-staff__alarm"
                          onClick={onRemindOrder}
                        />
                      )}
                      {props.order.orderStatus.name === OrderStatus.CANCELED ? (
                        <button className="order-detail-staff__cancel-button" onClick={onSubmitCancelOrder}>
                          Cancel
                        </button>
                      ) : (
                        <img
                          src={icon}
                          alt={icon}
                          className={
                            props.order.orderStatus.name === OrderStatus.READY_FOR_PICKUP
                              ? 'order-detail-staff__icon'
                              : 'order-detail-staff__icon__next'
                          }
                          onClick={onUpdateStatusHandler}
                        />
                      )}
                    </div>
                    {props.order.note ? <p className="order-detail-staff__note">Note: {props.order.note}</p> : ''}
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Draggable>
      {isComponentVisible && (
        <div ref={ref} className="background-blur">
          <OrderDetail
            order={props.order}
            onClickExit={onExitFormHandler}
            onClosePopUpConfirmCancel={setIsComponentVisible}
          />
        </div>
      )}
    </>
  );
};

export default OrderItemStaff;
