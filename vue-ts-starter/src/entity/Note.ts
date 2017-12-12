import {Length} from 'class-validator';
import {serialize, deserialize, inheritSerialization} from 'cerialize';
import BaseEntity from './BaseEntity';
import User from './User';
const lodash = require('lodash');

@inheritSerialization(BaseEntity)
export default class Note extends BaseEntity {
  @Length(8, 20, {
    message: 'kamu harus mengisi minimal 8 karakter, maximal 20 karakter'
  })
  @deserialize
  @serialize
  title: string = '';

  @Length(80, 500, {
    message: 'kamu harus mengisi minimal 80 karakter, maximal 500 karakter'
  })
  @deserialize
  @serialize
  description: string = '';

  @serialize
  @deserialize
  user_id: number = 0;

  @deserialize
  user: User = null;

  public static OnSerialized(instance: Note, json: any): void {
    if (json.user_id === 0) {
      delete json.notes;
    }
  }

  formatedNoteIntro (): string {
    let formatedText = `note ini berjudul ${this.title} dengan deskripsi ${this.description}`;
    if (!lodash.isNil(this.user)) {
      formatedText = formatedText + `dengan user ber-username ${this.user.username}`;
    }

    return formatedText;
  }
}
