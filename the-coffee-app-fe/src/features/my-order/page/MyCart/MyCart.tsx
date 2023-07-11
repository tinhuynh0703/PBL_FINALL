import Card from '../../../../components/Card/Index';
import OrderItem from '../../components/OrderItem/OrderItem';
import './MyCart.scss';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserState } from '../../../auth/actions/auth';
import Empty from '../../../../share/assets/animations/Empty.gif';
import { groupBy } from 'lodash';
import { datePattern } from '../../../../utils/dateRegex';
import dayjs from 'dayjs';
import { useAppDispatch } from '../../../../storage/hooks';
import { RequestState } from '../../../../enum';
import { getMyCart, getMyCartLoading, getMyCartState } from '../../actions/cart';
import Checkbox from '@mui/material/Checkbox';
import Button from '../../../../components/Button/Index';
import { ClipLoader } from 'react-spinners';

const MyCart = () => {
  const { freeUnit } = useSelector(selectUserState);
  const [checkList, setCheckList] = useState([] as any);
  const dispatch = useAppDispatch();
  const myCart = useSelector(getMyCartState);
  // setCheckList(new Array(myCart?.length).fill(false));
  const loading = useSelector(getMyCartLoading);
  useEffect(() => {
    dispatch(getMyCart()).unwrap();
  }, []);

  useEffect(() => {
    setCheckList(new Array(myCart?.length).fill(false));
    return () => {};
  }, [myCart]);

  const cartData = groupBy(myCart, function (date) {
    return dayjs(date.createdAt).format(datePattern);
  });

  const onChangeSelectCartHandler = (index: number) => {
    const a = checkList;
    a[index] = !checkList[index];
    setCheckList(a);
  };

  const onMakeOrder = () => {};

  return (
    <Card className="card--right my-order">
      {loading === RequestState.PENDING ? (
        <div className="card--right flex justify-center">
          <ClipLoader color="#36d7b7" size="80" />
        </div>
      ) : Object.keys(cartData).length > 0 ? (
        <div className="h-full pt-0.5">
          <div className="flex justify-between w-full pt-1">
            <p className="my-order__title">My Orders</p>
          </div>
          <div className="flex justify-end">
            <div className="w-[50%]">
              <Button titleButton="Make Order" onClick={onMakeOrder} />
            </div>
          </div>
          <div className="my-order__list-order">
            {Object.keys(cartData).map((date) => (
              <div className="my-order__list-order" key={date}>
                {cartData[date].map((order, index) => (
                  <div key={index} className="flex flex-row">
                    <OrderItem item={order} key={order.id} />
                    <Checkbox key={index} onChange={() => onChangeSelectCartHandler(index)} />
                  </div>
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
export default MyCart;
