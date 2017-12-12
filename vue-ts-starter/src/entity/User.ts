import {Length, IsNotEmpty} from 'class-validator';
import {serialize, serializeAs, deserialize, deserializeAs, inheritSerialization} from 'cerialize';
import Note from './Note';
import BaseEntity from './BaseEntity';
import moment from 'moment';

@inheritSerialization(BaseEntity)
export default class User extends BaseEntity {
  @Length(8, 15, {
    message: 'kamu harus mengisi minimal 8 karakter, maximal 15 karakter'
  })
  @serialize
  @deserialize
  username: string = '';

  @IsNotEmpty({
    message: 'field wajib di isi'
  })
  @serialize
  @deserialize
  name: string = '';

  @serializeAs(Date)
  @deserializeAs(Date)
  birth_date: Date = new Date();

  @serializeAs(Note, 'notes')
  @deserializeAs(Note)
  notes: any = null;

  formatedUserIntro (): string {

    return `hallo perkenalkan nama saya ${this.name} dengan
      username ${this.username}`;
  }

  public static OnSerialized(instance: User, json: any): void {
    if (json.notes === null) {
      delete json.notes;
    }

    json.birth_date = moment(json.birth_date).format('YYYY-MM-DD');
  }
}
