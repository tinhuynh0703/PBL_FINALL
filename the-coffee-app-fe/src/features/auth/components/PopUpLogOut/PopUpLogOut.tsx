import React, { useContext } from 'react';
import './PopUpLogOut.css';
import Card from '../../../../components/Card/Index';
import Button from '../../../../components/Button/Index';
import { useAppDispatch } from '../../../../storage/hooks';
import { logout, selectUserState } from '../../actions/auth';
import { SocketContext } from '../../../../utils/socketContext';
import { leaveRoomCustomer } from '../../../../services/socketService';
import { useSelector } from 'react-redux';

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const PopUpLogOut = (props: Props) => {
  const user = useSelector(selectUserState);
  const dispatch = useAppDispatch();
  const socket = useContext(SocketContext);

  const { deviceToken } = useSelector(selectUserState);
  console.log(123, deviceToken);
  const LogOutHandler = async () => {
    dispatch(logout({ deviceToken }));
    leaveRoomCustomer(socket, user._id);
    socket.close();
  };

  return (
    <Card className="card card--right justify-center">
      <span className="span-log-out"> Are you sure you want to log out ?</span>
      <Button
        onClick={LogOutHandler}
        className="btn btn-primary btn--enabled mb-1.5"
        type="submit"
        titleButton="LOGOUT"
      />
      <Button onClick={props.onClick} className="btn btn-primary btn-secondary" type="submit" titleButton="CANCEL" />
    </Card>
  );
};

export default PopUpLogOut;
