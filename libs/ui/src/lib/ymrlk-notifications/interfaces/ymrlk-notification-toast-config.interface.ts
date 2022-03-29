import {YmrlkNotificationPositionEnum} from '../enum/ymrlk-notification-position.enum';
import {YmrlkNotificationTypeEnum} from '../enum/ymrlk-notification-type.enum';

export interface YmrlkNotificationToastConfigInterface {
  duration?: number;

  position?: YmrlkNotificationPositionEnum;

  notificationType?: YmrlkNotificationTypeEnum;

  hideOnClick?: boolean;

  keepOnHover?: boolean;

  icon?: {
    src: string;
    alt: string;
  } | null;

  actionButton?: {
    label: string;
    action?: () => void
  } | null;

  closeButton?: {
    image: {
      src: string;
      alt: string;
    }
  } | null;

  maxStackSize?: number;
}
