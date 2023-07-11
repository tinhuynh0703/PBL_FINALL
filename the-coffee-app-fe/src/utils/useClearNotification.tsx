import { useState, useEffect } from 'react';
import { timeoutShowNotification } from '../constant';
import { NotificationParams } from '../interfaces';

export default function useClearNotification(
  timeOut?: number,
): [NotificationParams, React.Dispatch<React.SetStateAction<NotificationParams>>] {
  const [typeShowNotification, setTypeShowNotification] = useState<NotificationParams>({} as NotificationParams);

  useEffect(() => {
    if (typeShowNotification.message) {
      const timer = setTimeout(() => {
        setTypeShowNotification({} as NotificationParams);
      }, timeOut ?? timeoutShowNotification);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [typeShowNotification]);

  return [typeShowNotification, setTypeShowNotification];
}
