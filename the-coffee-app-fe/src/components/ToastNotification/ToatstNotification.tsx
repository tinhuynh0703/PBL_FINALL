import { NotificationType, PositionToast } from '../../enum';
import './ToastNotfication.scss';
import IconFail from '../../share/assets/vector/IconFail.svg';
import IconSuccess from '../../share/assets/vector/IconSucess.svg';

type Props = {
  type: NotificationType;
  message: string;
  position?: PositionToast;
};

const ToastNotification = (props: Props) => {
  const iconSrc = props.type === NotificationType.SUCCESS ? IconSuccess : IconFail;

  return (
    <div
      className={`toast-notification toast-notification--${props.type} toast-notification--${
        props.position ?? PositionToast.TOP_CENTER
      }`}
    >
      <div className="toast-container">
        <img className="toast-container__icon" src={iconSrc} alt={iconSrc} />
        <p className="toast-container__message"> {props.message}</p>
      </div>
    </div>
  );
};

export default ToastNotification;
