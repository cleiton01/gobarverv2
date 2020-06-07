import {hash, compare} from 'bcrypt'
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

class FakeHashProvider implements IHashProvider{

  public async genarateHash(payload: string):Promise<string>{

    return payload;
  };
  public async compareHash(payload: string, hashed: string):Promise<boolean>{

    return payload === hashed;
  };

}

export default FakeHashProvider;
