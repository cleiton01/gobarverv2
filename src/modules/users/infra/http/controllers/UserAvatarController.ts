import {Request, Response} from 'express';
import {container} from 'tsyringe';
import {classToClass} from 'class-transformer';

import UpdateUserAvatar from '@modules/users/services/updateUserAvatarService';

class UserAvatarController {
  public async update(req: Request,res: Response): Promise<Response>{

    const updateUserAvatar = container.resolve(UpdateUserAvatar);

    const user = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatarFileName: req.file.filename,
    });

    return res.json(classToClass(user));
  }
}

export default UserAvatarController;
