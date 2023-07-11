import Card from '../../../../components/Card/Index';
import OrderItem from '../../components/OrderItem/OrderItem';
import './MyOrder.scss';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUserState } from '../../../auth/actions/auth';
import Empty from '../../../../share/assets/animations/Empty.gif';
import { groupBy } from 'lodash';
import { datePattern } from '../../../../utils/dateRegex';
import dayjs from 'dayjs';
import OrderDate from '../../components/OrderDate/OrderDate';
import { useAppDispatch } from '../../../../storage/hooks';
import { getMyOrderLoading, getMyOrders, getMyOrderState } from '../../actions/historyOrder';
import Spinner from '../../../../components/Spinner/Spinner';
import { RequestState } from '../../../../enum';
import ClipLoader from 'react-spinners/ClipLoader';

const MyOrder = () => {
  const { freeUnit } = useSelector(selectUserState);
  const dispatch = useAppDispatch();
  const myOrder = useSelector(getMyOrderState);
  console.log(myOrder);
  const loading = useSelector(getMyOrderLoading);
  console.log('my, my', myOrder);
  useEffect(() => {
    dispatch(getMyOrders()).unwrap();
  }, []);

  const orderData = groupBy(myOrder, function (date) {
    return dayjs(date.createdAt).format(datePattern);
  });
  return (
    <Card className="card--right my-order">
      {loading === RequestState.PENDING ? (
        <div className="card--right flex justify-center">
          <ClipLoader color="#36d7b7" size="80" />
        </div>
      ) : Object.keys(orderData).length > 0 ? (
        <div className="h-full pt-0.5">
          <div className="flex justify-between w-full pt-1">
            <p className="my-order__title">Danh sách đơn hàng</p>
            {/*<p className="my-order__freeUnit">*/}
            {/*  Today Free Units: <span className="accent">{freeUnit} </span>*/}
            {/*</p>*/}
          </div>
          <div className="my-order__list-order">
            {Object.keys(orderData).map((date) => (
              <div className="my-order__list-order" key={date}>
                <OrderDate date={date} />
                {orderData[date].map((order) => (
                  <OrderItem item={order} key={order.id} />
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <img src={Empty} alt="empty" />
          <h1 className="my-order__warning">No Order Yet!</h1>
        </div>
      )}
    </Card>
  );
};
export default MyOrder;
