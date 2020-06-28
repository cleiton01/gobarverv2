import INotificationDTO from '@modules/notifications/dtos/INotificationDTO';
import NotificationMongo from '@modules/notifications/infra/typeorm/entities/NotificationMongo';

export default interface INotificationRepository{
  create(data: INotificationDTO): Promise<NotificationMongo>;
}
