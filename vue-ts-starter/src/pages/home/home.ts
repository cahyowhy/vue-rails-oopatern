import {Component, Vue} from 'vue-property-decorator';
import User from '../../entity/User';
import {validate} from 'class-validator';
import './home.scss';
import Note from '../../entity/Note';
import UserService from '../../services/UserService';
import NoteService from '../../services/NoteService';

@Component({
  template: require('./home.html')
})
export class HomeComponent extends Vue {
  user: any = new User();
  note: any = new Note();
  errorMessagesUser: string[] = [];
  errorMessagesNote: string[] = [];
  users: any = [];
  notes: any = [];
  defaultQueryParam: any = {
    offset: 0,
    limit: 6
  };
  userQueryParam: any = this.defaultQueryParam;
  noteQueryParam: any = this.defaultQueryParam;

  async mounted () {
    await this.loadData('user');
    await this.loadData('note');
  }

  async doSaveUser() {
    this.user.birth_date = new Date(this.user.birth_date);
    const err = await validate(this.user);
    if (err.length > 0) {
      this.errorMessagesUser = err.map((item) => {
        const firstProperty: any = item.constraints;
        return `${firstProperty[Object.keys(firstProperty)[0]]} pada input ${item.property}`;
      });
    } else {
      this.errorMessagesUser = [];
      const data = await new UserService().store(this.user);
      if (data) {
        console.log(data);
      }
    }
  }

  async doSaveNote() {
    const err = await validate(this.note);
    this.note.user_id = 12;

    if (err.length > 0) {
      this.errorMessagesNote = err.map((item) => {
        const firstProperty: any = item.constraints;
        return `${firstProperty[Object.keys(firstProperty)[0]]} pada input ${item.property}`;
      });
    } else {
      this.errorMessagesNote = [];
      const data = await new NoteService().store(this.note);
      if (data) {
        console.log(data);
      }
    }
  }

  doSave() {

  }

  async onLoadNote () {
    this.noteQueryParam.offset += this.noteQueryParam.limit;
    await this.loadData('note');
  }

  async onLoadUser () {
    this.userQueryParam.offset += this.userQueryParam.limit;
    await this.loadData('user');
  }

  async loadData (type: string) {
    if (type === 'user') {
      const data = await new UserService().findBy(this.userQueryParam);
      if (data) {
        this.users = this.users.concat(data);
      }
    } else {
      const data = await new NoteService().findBy(this.noteQueryParam);
      if (data) {
        this.notes = this.notes.concat(data);
      }
    }
  }
}
