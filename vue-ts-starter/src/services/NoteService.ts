import BaseService from './BaseService';
import Note from '../entity/Note';
import MainService from './MainService';
import MethodHttp from './MethodHttp';
import {Serialize, Deserialize} from 'cerialize';

export default class NoteService extends MainService implements BaseService<Note> {
  constructor() {
    super(process.env.NOTE_SERVICE);
  }

  store(T): Promise<boolean> {
    const body: any = Serialize(T);

    return this.service(MethodHttp.POST, null, {note: body}, '').then(
      (response) => <Note> Deserialize(response.data, Note)
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
        item = <Note> Deserialize(item, Note);
        return item;
      });
    });
  }
}
