import Product from '../../features/product/page/Product/Product';
import NotificationOrder from '../../interfaces/notificationOrder';
import Order from '../../interfaces/order';
import PopUpReceiveCanceledOrderCustomer from '../../features/orderStatus/components/PopUpReceiveCanceledOrderCustomer/PopUpReceiveCanceledOrderCustomer';
import Notification from '../../components/Notification/Notification';
import SplashScreen from '../SplashScreen/SplashScreen';
import SearchVector from '../../share/assets/vector/iconSearch.svg';
import MaskGroup from '../../share/assets/img/banner.jpg';
import useComponentVisible from '../../utils/useComponentVisible';
import MyOrder from '../../features/my-order/page/MyOrder/MyOrder';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import Footer from '../../components/Footer/Footer';

import { onMessageListener } from '../../services/firebase';
import { MessagingPayload } from 'firebase-admin/lib/messaging/messaging-api';
import React, { useEffect, useState } from 'react';
import { initSocket, joinRoomCustomer, onListenEventCustomer } from '../../services/socketService';
import { SocketContext } from '../../utils/socketContext';
import { useSelector } from 'react-redux';
import { getFreeUnit, selectLoginState, selectUserState } from '../../features/auth/actions/auth';
import { customerAccessRole, TabNameNavbar, timeoutNotification, timeOutSplashScreen } from '../../constant';
import { ROLE, SocketEvent } from '../../enum';
import { useAppDispatch } from '../../storage/hooks';

import '../../components/WrapperPage/WrapperPage.css';
import './HomePage.scss';
import CustomerInformationMobile from '../../components/CustomerInformationMobile/CustomerInformationMobile';
import PopUpLoginRight from '../../features/auth/components/PopUpLoginRight/PopUpLoginRight';
import LoadingButton from '../../components/LoadingButton/LoadingButton';

type NavbarBottomDirectionType = {
  [key: string]: () => void;
};

const HomePage = () => {
  const [navbarActive, setNavbarActive] = useState(TabNameNavbar.HOME_PAGE);
  const [dataNotification, setDataNotification] = useState({} as NotificationOrder);
  const [dataFormCanceledOrder, setDataFormCanceledOrder] = useState({} as Order);
  const [isAccessed, setIsAccessed] = useState(!!window.sessionStorage.getItem('isAccessed'));
  const [popUpRef, isPopUpOpen, setIsPopUpOpen] = useComponentVisible(false);
  const [isOpenCustomerInformation, setIsOpenCustomerInformation] = useState(false);
  const dispatch = useAppDispatch();
  const socket = initSocket();
  const user = useSelector(selectUserState);
  const isLoggedInCustomer = customerAccessRole.includes(user.role as ROLE);

  useEffect(() => {
    !isAccessed &&
      setTimeout(() => {
        setIsAccessed(true);
        window.sessionStorage.setItem('isAccessed', 'true');
      }, timeOutSplashScreen);
  }, []);

  useEffect(() => {
    if (isLoggedInCustomer) {
      joinRoomCustomer(socket, user._id);
      onListenEventCustomer(socket, SocketEvent.ORDER_CANCELED, receiveCanceledOrder);
    }

    return () => {
      socket.off(SocketEvent.ORDER_CANCELED);
      socket.close();
    };
  }, [user]);

  useEffect(() => {
    if (Object.entries(dataNotification).length > 0) {
      const timer = setTimeout(() => {
        setDataNotification({} as NotificationOrder);
      }, timeoutNotification);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [dataNotification]);

  const receiveCanceledOrder = (order: Order) => {
    setDataFormCanceledOrder(order);
    dispatch(getFreeUnit());
  };

  const onCloseFormCanceledOrder = () => {
    setDataFormCanceledOrder({} as Order);
  };

  onMessageListener().then((payload: MessagingPayload) => {
    if (payload.data?.data) {
      const dataOrder = JSON.parse(payload.data.data);
      setDataNotification(dataOrder);
    }
  });

  const showMyOderPopUp = () => {
    setIsPopUpOpen(true);
  };
  const { role } = useSelector(selectUserState);
  const auth = useSelector(selectLoginState);
  const checkUser = auth && customerAccessRole.includes(role as ROLE);
  const [popUpLoginRightRef, isShowPopUpLoginRight, setIsShowPopupLoginRight] = useComponentVisible(false);

  // TODO: Add logic to open/close CustomerInformation in object below

  const switchNavbarBottom: NavbarBottomDirectionType = {
    homePage: () => {
      setIsPopUpOpen(false);
      setIsOpenCustomerInformation(false);
    },
    myOrder: () => {
      setIsPopUpOpen(true);
      setIsOpenCustomerInformation(false);
    },
    information: () => {
      setIsOpenCustomerInformation(true);
      setIsShowPopupLoginRight(true);
      setIsPopUpOpen(false);
    },
  };
  const onClickChangeTabNavbarBottom = (navbar: string) => {
    if (navbar === navbarActive) {
      return;
    }

    switchNavbarBottom[navbar]();

    setNavbarActive(navbar);
  };

  return isAccessed ? (
    <>
      <SocketContext.Provider value={socket}>
        <div className="home-page">
          <div className="w-full sm:h-screen md:h-fit relative bg-white">
            <div className="md:block hidden">
              <Header />
            </div>

            <div className="background">
              <img src={MaskGroup} alt="Mask Group Background" className="background-img" />
            </div>
            <div className="w-full h-full">
              {Object.entries(dataNotification).length > 0 ? (
                <div onClick={showMyOderPopUp}>
                  <Notification
                    price={dataNotification.price}
                    title={dataNotification.title}
                    quantity={dataNotification.quantity}
                    status={dataNotification.status}
                    image={dataNotification.image}
                  />
                </div>
              ) : (
                <></>
              )}
              <div>
                <Product />
              </div>
            </div>
            <div className="w-full bottom-0 left-0">
              <Footer navbarIsActive={navbarActive} onClickChangeTab={onClickChangeTabNavbarBottom} />
            </div>
          </div>
        </div>
      </SocketContext.Provider>

      {isPopUpOpen && (
        <div ref={popUpRef} className="background-blur">
          <MyOrder />
        </div>
      )}
      {isOpenCustomerInformation && checkUser ? (
        <div className="md:hidden sm:block">
          <CustomerInformationMobile />
        </div>
      ) : (
        !checkUser &&
        isShowPopUpLoginRight && (
          <div ref={popUpLoginRightRef} className="background-blur">
            <PopUpLoginRight />
          </div>
        )
      )}

      {Object.keys(dataFormCanceledOrder).length > 0 && (
        <div className="background-blur">
          <PopUpReceiveCanceledOrderCustomer order={dataFormCanceledOrder} onCloseForm={onCloseFormCanceledOrder} />
        </div>
      )}
    </>
  ) : (
    <SplashScreen />
  );
};
export default HomePage;
