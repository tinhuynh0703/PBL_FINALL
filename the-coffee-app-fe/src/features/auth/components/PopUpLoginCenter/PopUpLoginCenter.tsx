import Card from '../../../../components/Card/Index';
import Exit from '../../../../share/assets/vector/Exit.svg';
import './PopUpLoginCenter.scss';
import HookForm from '../../../../components/HookForm/HookForm';
import React from 'react';
type Props = {
  onClick?: React.MouseEventHandler<HTMLElement>;
};

function PopUpLoginCenter(props: Props) {
  return (
    <Card className="card card--center card-login-center">
      <img src={Exit} className="card-login-center__exit" onClick={props.onClick} alt="Exit" />
      <p className="card-login-center__description">Vui lòng đăng nhập để thực hiện thao tác trên!</p>
      <div className="mt-100">
        <HookForm />
      </div>
    </Card>
  );
}

export default PopUpLoginCenter;
