import {hash, compare} from 'bcrypt'
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

class BCryptHashProvider implements IHashProvider{

  public async genarateHash(payload: string):Promise<string>{

    return hash(payload, 8);
  };
  public async compareHash(payload: string, hashed: string):Promise<boolean>{

    return compare(payload, hashed);
  };

}

export default BCryptHashProvider;
