import './LeftSideBar.css';
import logo from '../../share/assets/img/logo.svg';
import LogoutIcon from '../../share/assets/img/logout-icon.png';
import LeftSideBarItem from './Items/LeftSideBarItem';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../storage/hooks';
import { resetAuthState } from '../../features/auth/actions/auth';
import { useContext } from 'react';
import { SocketContext } from '../../utils/socketContext';
import { leaveRoomStaff } from '../../services/socketService';

type Props = {
  onClickChangeTab(tabName: string): void;
  listTabName: string[];
  listTabIcon: string[];
  currentTab: string;
};
const LeftSideBar = (props: Props) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const goHome = () => {
    const path = `/`;
    history.push(path);
  };
  const socket = useContext(SocketContext);

  const handleClickLogout = () => {
    dispatch(resetAuthState());
    leaveRoomStaff(socket);
  };

  return (
    <div className="left-side-bar">
      <div className="left-side-bar__img">
        <img src={logo} alt="logo" className="left-side-bar__img-logo" />
      </div>
      <div className="left-side-bar__group-item">
        {props.listTabName.map((val, index) => (
          <LeftSideBarItem
            key={index}
            isActive={props.currentTab === val}
            src={props.listTabIcon[index]}
            alt={val}
            title={val}
            onClickChangeTab={() => props.onClickChangeTab(val)}
          />
        ))}
      </div>
      <div className="left-side-bar__logout" onClick={() => handleClickLogout()}>
        <img
          src={LogoutIcon}
          alt=""
          className="md:mr-[5px] lg:mr-[10px] md:w-[12px] md:h-[12px] md:w-[16px] md:h-[16px]"
        />
        <span className="text-accent-1">Log Out</span>
      </div>
    </div>
  );
};
export default LeftSideBar;
