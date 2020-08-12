import { MongoRepository, getMongoRepository } from 'typeorm';

import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';
import INotificationDTO from '@modules/notifications/dtos/INotificationDTO';

import Notification from '@modules/notifications/infra/typeorm/schema/Notification';

class NotificationRepository implements INotificationRepository {

  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, "mongodb");
  }

  public async create({content, recipient_type,recipient_id}: INotificationDTO): Promise<Notification>{
    const notification = this.ormRepository.create({content, recipient_type,recipient_id});

    await this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationRepository;
