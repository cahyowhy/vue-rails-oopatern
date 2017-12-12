import BaseService from './BaseService';
import User from '../entity/User';
import MainService from './MainService';
import MethodHttp from './MethodHttp';
import {Serialize, Deserialize} from 'cerialize';

export default class UserService extends MainService implements BaseService<User> {
  constructor() {
    super(process.env.USER_SERVICE);
  }

  store(T): Promise<boolean> {
    const body: any = Serialize(T);

    return this.service(MethodHttp.POST, null, {user: body}, '').then(
      (response) => <User> Deserialize(response.data, User)
    );
  }

  destroy(id: number): Promise<boolean> {
    return null;
  }

  findById(id: string): Promise<boolean> {
    return null;
  }

  update(T, param: any): Promise<boolean> {
    return null;
  }

  findBy(param: any): Promise<boolean> {
    return this.service(MethodHttp.GET, param, null, '').then((response) => {
      return response.data.map((item) => {
        item = <User> Deserialize(item, User);
        return item;
      });
    });
  }
}
