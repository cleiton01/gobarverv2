import NotificationMongo from '@modules/notifications/infra/typeorm/entities/NotificationMongo';
import { MongoRepository, getMongoRepository } from 'typeorm';

import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';
import INotificationDTO from '@modules/notifications/dtos/INotificationDTO';


class NotificationRepository implements INotificationRepository {

  private ormRepository: MongoRepository<NotificationMongo>;

  constructir() {
    this.ormRepository = getMongoRepository(NotificationMongo, "mongo");
  }

  public async create({content, recipient_type,recipient_id}: INotificationDTO): Promise<NotificationMongo>{
    const notification = this.ormRepository.create({content, recipient_type,recipient_id});

    await this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationRepository;
