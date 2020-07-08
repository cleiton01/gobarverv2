import INotificationDTO from '@modules/notifications/dtos/INotificationDTO';
import Notification from '@modules/notifications/infra/typeorm/schema/Notification';

export default interface INotificationRepository{
  create(data: INotificationDTO): Promise<Notification>;
}
