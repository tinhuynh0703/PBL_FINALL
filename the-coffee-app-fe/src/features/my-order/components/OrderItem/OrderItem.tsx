import './OrderItem.scss';
import { moneyFormat } from '../../../../utils/MoneyFormat';
import { camelCase, startCase } from 'lodash';
import Order from '../../../../interfaces/order';
import CoffeeImg from '../../../../share/assets/img/CoffeeImg.png';
import EditIcon from '../../../../share/assets/vector/EditButton.svg';
import { useAppDispatch } from '../../../../storage/hooks';
import { resetOrder, selectOrderState, setOrderData } from '../../../order/actions/order';
import useComponentVisible from '../../../../utils/useComponentVisible';
import DrinkItemDetail from '../../../order/components/DrinkDetail/DrinkItemDetail';
import { useEffect, useState } from 'react';
import FormPopUpConfirm from '../../../../components/FormPopUpConfirm/FormPopUpConfirm';
import { useSelector } from 'react-redux';
import { updateOrder } from '../../../order/actions/updateOrder';
import { updateFreeUnit } from '../../../auth/actions/auth';
import { cancelMyOrder, getMyOrders } from '../../actions/historyOrder';
import PopUpFinishOrder from '../../../../components/PopUpFinishOrder/PopUpFinishOrder';
type Props = {
  item: Order;
};
enum ShowPopupCase {
  showDrinkItemDetail = 1,
  showPopUpConfirmCancel = 2,
  showPopUpCanNotCancel = 3,
}
enum OrderStatus {
  new = 'new',
  processing = 'processing',
  readyForPickUp = 'ready for pickup',
  pickedUp = 'picked up',
  canceled = 'canceled',
}

const setColorStatus = (status: string) => {
  switch (status) {
    case OrderStatus.new:
      return 'text-accent-1';
    case OrderStatus.processing:
      return 'text-warning';
    case OrderStatus.readyForPickUp:
      return 'text-success';
    case OrderStatus.canceled:
      return 'text-error';
  }
};

const OrderItem = (props: Props) => {
  const status = props.item.orderStatus.name;
  const dispatch = useAppDispatch();
  const order = useSelector(selectOrderState);

  const [ref, isShowFormEditOrder, setIsShowFormEditOrder] = useComponentVisible(false);
  const [step, setStep] = useState<ShowPopupCase>(ShowPopupCase.showDrinkItemDetail);

  const icon = props.item.orderStatus.name === OrderStatus.new && EditIcon;

  const handleClickIcon = () => {
    const orderData = {
      orderId: props.item.id,
      quantity: props.item.quantity,
      note: props.item.note,
      productId: props?.item?.product?.id,
    };
    dispatch(setOrderData(orderData));
    setIsShowFormEditOrder(true);
  };

  const handleConfirmCancelOrder = async () => {
    const cancelStatusNumber = -1;
    const updateOrderData = {
      status: cancelStatusNumber,
    };
    const response = await dispatch(updateOrder({ orderId: order.orderId as string, body: updateOrderData }));
    if (updateOrder.fulfilled.match(response)) {
      dispatch(updateFreeUnit(-order.quantity));
      dispatch(cancelMyOrder(order.orderId as string));
      setIsShowFormEditOrder(false);
    } else {
      setStep(ShowPopupCase.showPopUpCanNotCancel);
    }
  };

  useEffect(() => {
    if (!isShowFormEditOrder) {
      dispatch(resetOrder());
    }
  }, [isShowFormEditOrder]);

  const handleCanNotCancelOrder = () => {
    setIsShowFormEditOrder(false);
    dispatch(getMyOrders());
  };

  const switchPopUp = () => {
    switch (step) {
      case ShowPopupCase.showDrinkItemDetail:
        return (
          <DrinkItemDetail
            loading={false}
            item={props?.item?.product}
            handleClickExitPopUp={() => setIsShowFormEditOrder(false)}
            handleClickCancelOrder={() => setStep(ShowPopupCase.showPopUpConfirmCancel)}
            isFormEditOrder={true}
          />
        );
      case ShowPopupCase.showPopUpConfirmCancel:
        return (
          <FormPopUpConfirm
            title="Hủy đơn hàng"
            content="Bạn chắc chắn muốn hủy đơn hàng này chứ ?"
            titleButton1="Vâng, tôi muốn hủy"
            titleButton2="Khoan đã, chờ một chút"
            onClickExit={() => setStep(ShowPopupCase.showDrinkItemDetail)}
            handleClickConfirm={handleConfirmCancelOrder}
          />
        );
      case ShowPopupCase.showPopUpCanNotCancel:
        return (
          <PopUpFinishOrder
            onClick={handleCanNotCancelOrder}
            title="YOU CAN NOT CANCEL THIS ORDER"
            description="You can not cancel this order because it is already processed"
          />
        );
      default:
        break;
    }
  };

  return (
    <>
      <div className="order-item">
        <div className="order-item__contain">
          <div className="order-item__contain-left">
            <img
              src={props?.item?.product?.images || CoffeeImg}
              alt="Drink"
              className="w-[100px] h-[100px] object-contain"
            />
          </div>
          <div className="order-item__contain-center">
            <p className="order-item__name">{props?.item?.product?.name}</p>
            <p className="order-item__desc">
              {moneyFormat(Number(props?.item?.product?.price))}đ - Qty: {props.item.quantity}{' '}
              <span className="sm:hidden md:contents"> - </span>
              <span className={`sm:block md:contents ${setColorStatus(status)}`}>{startCase(camelCase(status))}</span>
            </p>
            {props.item.note && <p className="order-item__note">Note: {props.item.note}</p>}
            {props.item.reason && <p className="order-item__note text-error">Reason: {props.item.reason}</p>}
          </div>
          <div className="flex items-center">
            <div className="order-item__contain-icon">
              {icon && <img src={icon} alt={icon} onClick={handleClickIcon} />}
            </div>
          </div>
        </div>
      </div>

      {isShowFormEditOrder && (
        <div ref={ref} className="background-blur">
          {switchPopUp()}
        </div>
      )}
    </>
  );
};
export default OrderItem;
