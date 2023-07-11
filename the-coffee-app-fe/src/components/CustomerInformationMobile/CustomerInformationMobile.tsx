import './CustomerInformationMobile.scss';
import React, { useMemo, useState } from 'react';
import MyOrder from '../../features/my-order/page/MyOrder/MyOrder';
import PopUpChangeWebhook from '../../features/auth/components/PopUpChangeWebhook/PopUpChangeWebhook';
import PopUpChangePassword from '../../features/auth/components/PopUpChangePassword/PopUpChangePassword';
import PopUpLogOut from '../../features/auth/components/PopUpLogOut/PopUpLogOut';
import useClearNotification from '../../utils/useClearNotification';
import ToastNotification from '../ToastNotification/ToatstNotification';
import useComponentVisible from '../../utils/useComponentVisible';
import Card from '../Card/Index';
type PopUpObjectType = {
  [key: string]: JSX.Element;
};
const CustomerInformationMobile = () => {
  const [popUpCase, setShowPopUpCase] = useState<string>('');
  const [typeShowNotification, setTypeShowNotification] = useClearNotification();
  const [popUpRef, isPopUpOpen, setIsPopUpOpen] = useComponentVisible(false);

  const onClickClosePopUp = () => {
    setIsPopUpOpen(false);
  };
  const showPopUpCase: PopUpObjectType = useMemo(() => {
    return {
      MY_ORDERS: <MyOrder />,
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
      <Card className="card--right information-mobile">
        {/* //TODO: Add component change avatar  */}
        {/* <div className="information-mobile__item" onClick={() => setShowPopUp('CHANGE_AVATAR')}>
                Change Avatar
              </div> */}
        <div className="information-mobile__item" onClick={() => setShowPopUp('CHANGE_WEBHOOK')}>
          Notification Settings
        </div>
        <div className="information-mobile__item" onClick={() => setShowPopUp('CHANGE_PASSWORD')}>
          Change Password
        </div>
        <div className="information-mobile__item text-accent-1" onClick={() => setShowPopUp('LOG_OUT')}>
          Log out
        </div>
      </Card>
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
export default CustomerInformationMobile;
