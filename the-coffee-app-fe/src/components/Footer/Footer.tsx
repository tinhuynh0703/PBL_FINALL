import IconHome from '../../share/assets/vector/IconHome.svg';
import IconManageOrder from '../../share/assets/vector/IconManageOrder.svg';
import IconProfile from '../../share/assets/vector/IconProfile.svg';
import IconHomeActive from '../../share/assets/vector/IconHomeActive.svg';
import IconManageOrderActive from '../../share/assets/vector/IconManageOrderActive.svg';
import IconProfileActive from '../../share/assets/vector/IconProfileActive.svg';
import Rectangle from '../../share/assets/vector/Rectangle.svg';

import { TabNameNavbar } from '../../constant';
import './Footer.css';

type Props = {
  onClickChangeTab: (tabName: string) => void;
  navbarIsActive: string;
};

const Footer = (props: Props) => {
  return (
    <div className="md:hidden block">
      <div className="footer fixed bottom-0">
        <div className="flex flex-col items-center " onClick={() => props.onClickChangeTab(TabNameNavbar.HOME_PAGE)}>
          {props.navbarIsActive === TabNameNavbar.HOME_PAGE ? (
            <>
              <img className="w-1.25 h-1.25" src={IconHomeActive} alt="Icon Home Active" />
              <img className="fixed bottom-0" src={Rectangle} alt="Line Below" />
            </>
          ) : (
            <img className="w-1.25 h-1.25" src={IconHome} alt="Icon Home" />
          )}
        </div>
        <div className="flex flex-col items-center" onClick={() => props.onClickChangeTab(TabNameNavbar.MY_ORDER)}>
          {props.navbarIsActive === TabNameNavbar.MY_ORDER ? (
            <>
              <img className="w-1.25 h-1.25" src={IconManageOrderActive} alt="Icon Order Active" />
              <img className="fixed bottom-0" src={Rectangle} alt="Line Below" />
            </>
          ) : (
            <img className="w-1.25 h-1.25" src={IconManageOrder} alt="Icon Order" />
          )}
        </div>
        <div className="flex flex-col items-center" onClick={() => props.onClickChangeTab(TabNameNavbar.INFORMATION)}>
          {props.navbarIsActive === TabNameNavbar.INFORMATION ? (
            <>
              <img className="w-1.25 h-1.25" src={IconProfileActive} alt="Icon Information Active" />
              <img className="fixed bottom-0" src={Rectangle} alt="Line Below" />
            </>
          ) : (
            <img className="w-1.25 h-1.25" src={IconProfile} alt="Icon Information" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Footer;
