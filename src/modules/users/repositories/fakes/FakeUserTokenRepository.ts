import {uuid} from 'uuidv4';

import IUserTokenRopository from '@modules/users/repositories/IUserTokenRopository';

import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

class FakeUserTokenRepository implements IUserTokenRopository{
  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken>{
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined>{
    const userToken = await this.userTokens.find(utoken => utoken.token == token );

    return userToken;

  }
}

export default FakeUserTokenRepository;
