import { PositionToast } from '../enum';
import { NotificationType } from '../enum/NotificationType';

export type NotificationParams = {
  type: NotificationType;
  message: string;
  position?: PositionToast;
};
