import React from 'react';
import './PopUpRanOutUnit.css';
import Card from '../Card/Index';
import Button from '../Button/Index';
import Exit from '../../share/assets/vector/Exit.svg';
import { useSelector } from 'react-redux';
import { selectUserState } from '../../features/auth/actions/auth';

type Props = {
  onClickContinueProceed?: React.MouseEventHandler<HTMLButtonElement>;
  handleClickBackForm: React.MouseEventHandler<HTMLButtonElement>;
  onClickExit?: React.MouseEventHandler<HTMLElement>;
};

const PopUpRanOutUnit = (props: Props) => {
  const { freeUnit } = useSelector(selectUserState);
  return (
    <Card className="card card--center">
      <img src={Exit} className="card-ran-out-unit__exit" onClick={props.onClickExit} alt="Exit" />
      <div className="pt-[40%]">
        <p className="card-ran-out-unit__title">You ran out of free units</p>
        {/* {freeUnit !== 0 ? (
          <p className="card-ran-out-unit__message">
            You have only {freeUnit} today.
            <br />
            Please change the quantity less than free unit you have.
          </p>
        ) : (
          <p className="card-ran-out-unit__message">
            Your Free unit in today is out.
            <br />
            Come back tomorrow and order.
          </p>
        )} */}
        <p className="card-ran-out-unit__message">
          You only have {freeUnit} today .Your free unit is less than quantity.
          <br />
          Do you want to proceed?.
        </p>
      </div>
      {/* TODO: Order over 3 unit each day*/}
      <div className="card-ran-out-unit__group">
        <Button
          onClick={props.onClickContinueProceed}
          className="btn btn-primary btn--enabled mb-1"
          type="submit"
          titleButton="YES, I WANT TO PROCEED"
        />
        <Button
          onClick={props.handleClickBackForm}
          className="btn btn-primary btn-secondary"
          type="submit"
          titleButton="NO, I CHANGE MY MIND"
        />
      </div>
      {/* {freeUnit === 0 ? (
        <div className="card-ran-out-unit__group">
          <Button
            onClick={props.onClickExit}
            className="btn btn-primary btn--enabled card-ran-out-unit__button"
            type="submit"
            titleButton="OKAY, I SEE"
          />
        </div>
      ) : (
        <div className="card-ran-out-unit__group">
          <Button
            onClick={props.handleClickBackForm}
            className="btn btn-primary btn--enabled card-ran-out-unit__button"
            type="submit"
            titleButton="YES, I WILL ORDER AGAIN"
          />
          <Button
            onClick={props.onClickExit}
            className="btn btn-primary btn-secondary card-ran-out-unit__button"
            type="submit"
            titleButton="NO, I WANT TO EXIT"
          />
        </div>
      )} */}
    </Card>
  );
};

export default PopUpRanOutUnit;
