import {ObjectID} from 'mongodb';

import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';
import INotificationDTO from '@modules/notifications/dtos/INotificationDTO';
import Notification from '@modules/notifications/infra/typeorm/schema/Notification';

class FakesNotificationRepository implements INotificationRepository {
 private notifications:Notification[] = [];

  public async create({content, recipient_type,recipient_id}: INotificationDTO): Promise<Notification>{

    const notification = new Notification();

    Object.assign(notification, {id: new ObjectID(), content, recipient_type,recipient_id})

    this.notifications.push(notification);

    return notification;
  }
}

export default FakesNotificationRepository;
