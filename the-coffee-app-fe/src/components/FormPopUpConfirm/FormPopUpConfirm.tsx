import React from 'react';
import './FormPopUpConfirm.css';
import Card from '../Card/Index';
import Button from '../Button/Index';
import Exit from '../../share/assets/vector/Exit.svg';

type Props = {
  title: string;
  content: string;
  handleClickConfirm?: React.MouseEventHandler<HTMLButtonElement>;
  onClickExit?: React.MouseEventHandler<HTMLElement>;
  titleButton1?: string;
  titleButton2?: string;
};

const FormPopUpConfirm = (props: Props) => {
  return (
    <Card className="card card--center">
      <img src={Exit} className="form-popup-confirm__exit" onClick={props.onClickExit} alt="Exit" />
      <div className="pt-[40%]">
        <p className="form-popup-confirm__title">{props.title}</p>
        <p className="form-popup-confirm__message">{props.content}</p>
      </div>

      <div className="form-popup-confirm__group">
        {props.titleButton1 && (
          <Button
            onClick={props.handleClickConfirm}
            className="btn btn-primary btn--enabled form-popup-confirm__button"
            type="submit"
            titleButton={props.titleButton1}
          />
        )}
        {props.titleButton2 && (
          <Button
            onClick={props.onClickExit}
            className="btn btn-primary btn-secondary form-popup-confirm__button"
            type="submit"
            titleButton={props.titleButton2}
          />
        )}
      </div>
    </Card>
  );
};

export default FormPopUpConfirm;
