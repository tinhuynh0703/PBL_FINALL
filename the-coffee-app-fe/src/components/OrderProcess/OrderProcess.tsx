import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { customerAccessRole } from '../../constant';
import { ROLE } from '../../enum';
import { getFreeUnit, selectUserState, updateFreeUnit } from '../../features/auth/actions/auth';
import PopUpLoginCenter from '../../features/auth/components/PopUpLoginCenter/PopUpLoginCenter';
import { addCart, placeOrder, resetOrder, selectOrderState } from '../../features/order/actions/order';
import DrinkItemDetail from '../../features/order/components/DrinkDetail/DrinkItemDetail';
import { getProductsByCategory } from '../../features/product/actions/getProductData';
import { Product } from '../../interfaces';
import { useAppDispatch } from '../../storage/hooks';
import PopUpFinishOrder from '../PopUpFinishOrder/PopUpFinishOrder';
import PopUpRanOutUnit from '../PopUpRanOutUnit/PopUpRanOutUnit';

type Props = {
  categoryId?: string;
  itemDrink: Product;
  setIsOpenPopUp: React.Dispatch<React.SetStateAction<boolean>>;
};

enum showPopupCase {
  showDrinkItemDetail = 1,
  showPopUpRanOutUnit = 2,
  PopUpFinishOrder = 3,
  PopUpLoginCenter = 4,
  PopUpOutOfStock = 5,
}
const OrderProcess = (props: Props) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([] as any);
  const dispatch = useAppDispatch();
  const order = useSelector(selectOrderState);
  console.log(order.productId);
  const user = useSelector(selectUserState);

  const handleClickBackForm = () => {
    setStep(step - 1);
  };

  const handleClickPlaceOrder = async () => {
    setLoading(true);
    if (!customerAccessRole.includes(user.role as ROLE)) {
      setStep(showPopupCase.PopUpLoginCenter);
      return;
    }
    const freeUnit = await dispatch(getFreeUnit()).unwrap();
    if (typeof freeUnit !== 'number' && freeUnit >= 0) return;
    if (freeUnit < order.quantity) {
      setStep(showPopupCase.showPopUpRanOutUnit);
    } else {
      const response = await dispatch(placeOrder(order));
      if (placeOrder.fulfilled.match(response)) {
        dispatch(resetOrder());
        dispatch(updateFreeUnit(order.quantity));
        setStep(showPopupCase.PopUpFinishOrder);
      } else {
        setStep(showPopupCase.PopUpOutOfStock);
        props.categoryId && dispatch(getProductsByCategory(props.categoryId));
      }
    }
    setLoading(false);
  };

  const handleClickAddCart = async () => {
    if (!customerAccessRole.includes(user.role as ROLE)) {
      setStep(showPopupCase.PopUpLoginCenter);
      return;
    }
    const freeUnit = await dispatch(getFreeUnit()).unwrap();
    if (typeof freeUnit !== 'number' && freeUnit >= 0) return;
    if (freeUnit < order.quantity) {
      setStep(showPopupCase.showPopUpRanOutUnit);
    } else {
      console.log('order', order);
      const response = await dispatch(addCart(order));
      if (addCart.fulfilled.match(response)) {
        // dispatch(resetOrder());
        exitPopUp();
      } else {
        setStep(showPopupCase.PopUpOutOfStock);
        props.categoryId && dispatch(getProductsByCategory(props.categoryId));
      }
    }
  };

  console.log(cart);

  useEffect(() => {
    if (customerAccessRole.includes(user.role as ROLE)) {
      setStep(showPopupCase.showDrinkItemDetail);
    }
  }, [user.role]);

  const continueOrderRanoutUnit = () => {
    dispatch(placeOrder(order));
    dispatch(updateFreeUnit(order.quantity));
    setStep(showPopupCase.PopUpFinishOrder);
  };

  const exitPopUp = () => {
    //dispatch(resetOrder());
    props.setIsOpenPopUp(false);
    setStep(showPopupCase.showDrinkItemDetail);
  };

  const switchStep = () => {
    switch (step) {
      case showPopupCase.showDrinkItemDetail:
        return (
          <DrinkItemDetail
            loading={loading}
            item={props.itemDrink}
            handleClickExitPopUp={exitPopUp}
            handleClickPlaceOrder={handleClickPlaceOrder}
            handleClickAddCart={handleClickAddCart}
          />
        );
      case showPopupCase.showPopUpRanOutUnit:
        return (
          <PopUpRanOutUnit
            onClickContinueProceed={continueOrderRanoutUnit}
            handleClickBackForm={handleClickBackForm}
            onClickExit={exitPopUp}
          />
        );
      case showPopupCase.PopUpFinishOrder:
        return <PopUpFinishOrder onClick={exitPopUp} />;
      case showPopupCase.PopUpLoginCenter:
        return <PopUpLoginCenter onClick={exitPopUp} />;
      case showPopupCase.PopUpOutOfStock:
        return (
          <PopUpFinishOrder
            onClick={exitPopUp}
            title="HẾT HÀNG"
            description="Xin lỗi! Hiện sản phẩm này đã hết, Vui lòng chọn sản phẩm khác !"
          />
        );
      default:
        break;
    }
  };
  return <>{switchStep()}</>;
};
export default OrderProcess;
