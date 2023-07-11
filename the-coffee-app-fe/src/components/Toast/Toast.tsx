import { useState, forwardRef, useImperativeHandle } from 'react';
import './Toast.scss';
import success from '../../share/assets/img/success.png';
import cancel from '../../share/assets/img/cancel.png';
import '../../share/assets/scss/variables.scss';

type ToastType = {
  type: string;
  message: string;
};
const Toast = forwardRef((props: ToastType, ref) => {
  const [showToast, setShowToast] = useState(false);

  useImperativeHandle(ref, () => ({
    show() {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    },
  }));

  return (
    <div
      className="toast-container"
      id={showToast ? 'show' : 'hide'}
      style={{ backgroundColor: props.type === 'success' ? '#499E3B' : '#E51616' }}
    >
      <div className="toast-container__symbol">
        {props.type === 'success' ? <img src={success} alt="success" /> : <img src={cancel} alt="cancel" />}
      </div>

      <div className="toast-container__message">{props.message}</div>
    </div>
  );
});

export default Toast;
