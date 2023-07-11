import React, { useEffect, useMemo, useState } from 'react';
import UserInformation from '../../share/assets/vector/UserInformation.svg';
import ExpandMore from '../../share/assets/vector/ExpandMore.svg';
import './CustomerInformation.scss';
import { useSelector } from 'react-redux';
import { selectUserState } from '../../features/auth/actions/auth';
import PopUpChangeWebhook from '../../features/auth/components/PopUpChangeWebhook/PopUpChangeWebhook';
import useComponentVisible from '../../utils/useComponentVisible';
import MyOrder from '../../features/my-order/page/MyOrder/MyOrder';
import PopUpChangePassword from '../../features/auth/components/PopUpChangePassword/PopUpChangePassword';
import PopUpChangeAvatar from '../../features/auth/components/PopUpChangeAvatar/PopUpChangeAvatar';
import PopUpLogOut from '../../features/auth/components/PopUpLogOut/PopUpLogOut';
import useClearNotification from '../../utils/useClearNotification';
import ToastNotification from '../ToastNotification/ToatstNotification';
import MyCart from '../../features/my-order/page/MyCart/MyCart';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import axios from 'axios';

type PopUpObjectType = {
  [key: string]: JSX.Element;
};

const CustomerInformation = () => {
  const { name, avatarUrl, cartNumber } = useSelector(selectUserState);
  const [cartItems, setCartItems] = useState(null);
  const [dropdownMenuRef, isMenuOpen, setIsMenuOpen] = useComponentVisible(false);
  const [popUpRef, isPopUpOpen, setIsPopUpOpen] = useComponentVisible(false);
  const [popUpCase, setShowPopUpCase] = useState<string>('');

  useEffect(() => {
    const getListCart = async () => {
      const data = await axios.get('http://localhost:8080/orders/user/cart');
      setCartItems(data.data.length);
      console.log(data.data);
    };

    isMenuOpen && getListCart();
  }, [isMenuOpen]);

  const [typeShowNotification, setTypeShowNotification] = useClearNotification();

  const handleClickInside = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const onClickClosePopUp = () => {
    setIsPopUpOpen(false);
  };
  const showPopUpCase: PopUpObjectType = useMemo(() => {
    return {
      MY_ORDERS: <MyOrder />,
      CHANGE_AVATAR: (
        <PopUpChangeAvatar onClickClosePopUp={onClickClosePopUp} setShowNotification={setTypeShowNotification} />
      ),
      CHANGE_WEBHOOK: (
        <PopUpChangeWebhook setShowNotification={setTypeShowNotification} onClickClosePopUp={onClickClosePopUp} />
      ),
      CHANGE_PASSWORD: (
        <PopUpChangePassword setShowNotification={setTypeShowNotification} onClickClosePopUp={onClickClosePopUp} />
      ),
      LOG_OUT: <PopUpLogOut onClick={onClickClosePopUp} />,
    };
  }, []);

  const setShowPopUp = (popUp: string) => {
    setShowPopUpCase(popUp);
    setIsPopUpOpen(true);
  };

  const switchPopUp = () => {
    return showPopUpCase[popUpCase];
  };

  return (
    <>
      <div ref={dropdownMenuRef} className="block-customer-information" onClick={handleClickInside}>
        <img className="block-customer-information__img" src={avatarUrl} alt="Customer Information" />
        <span className="block-customer-information__span">Xin chào, {name} !</span>
        <div className="menu-dropdown">
          <img src={ExpandMore} className="menu-dropdown__img" alt="expand more" />
          {isMenuOpen && (
            <div className="menu-dropdown__content">
              <div className="menu-dropdown__item" onClick={() => setShowPopUp('MY_ORDERS')}>
                <Badge color="secondary" badgeContent={cartItems}>
                  <LocalMallIcon style={{ color: '#D4A969' }} className="h-[24px] w-[24px] " />
                </Badge>
                <span>Đơn hàng của tôi</span>
              </div>
              <div className="menu-dropdown__item" onClick={() => setShowPopUp('CHANGE_AVATAR')}>
                <Badge color="secondary" badgeContent={cartItems}>
                  <AccountBoxIcon style={{ color: '#D4A969' }} className="h-[24px] w-[24px] " />
                </Badge>
                <span>Thay đổi ảnh đại diện</span>
              </div>
              <div className="menu-dropdown__item" onClick={() => setShowPopUp('CHANGE_PASSWORD')}>
                <Badge color="secondary" badgeContent={cartItems}>
                  <VpnKeyIcon style={{ color: '#D4A969' }} className="h-[24px] w-[24px] " />
                </Badge>
                <span>Thay đổi mật khẩu</span>
              </div>
              <div className="menu-dropdown__item" onClick={() => setShowPopUp('LOG_OUT')}>
                <Badge color="secondary" badgeContent={cartItems}>
                  <ExitToAppIcon style={{ color: '#D4A969' }} className="h-[24px] w-[24px] " />
                </Badge>
                <span>Đăng xuất</span>
              </div>
              {/*<span className="menu-dropdown__item" onClick={() => setShowPopUp('CHANGE_WEBHOOK')}>*/}
              {/*  Notification Settings*/}
              {/*</span>*/}
            </div>
          )}
        </div>
      </div>

      {isPopUpOpen && (
        <div ref={popUpRef} className="background-blur">
          {switchPopUp()}
        </div>
      )}

      {typeShowNotification.message && (
        <ToastNotification
          type={typeShowNotification.type}
          message={typeShowNotification.message}
          position={typeShowNotification.position}
        />
      )}
    </>
  );
};

export default CustomerInformation;
