import NotificationMongo from '@modules/notifications/infra/typeorm/entities/NotificationMongo';
import {ObjectID} from 'mongodb';

import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';
import INotificationDTO from '@modules/notifications/dtos/INotificationDTO';


class NotificationRepository implements INotificationRepository {
 private notifications:NotificationMongo[] = [];

  public async create({content, recipient_type,recipient_id}: INotificationDTO): Promise<NotificationMongo>{

    const notification = new NotificationMongo();

    Object.assign(notification, {id: new ObjectID(), content, recipient_type,recipient_id})

    this.notifications.push(notification);

    return notification;
  }
}

export default NotificationRepository;
