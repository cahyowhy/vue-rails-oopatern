import {deserialize, deserializeAs} from 'cerialize';

export default class BaseEntity {
  @deserialize
  id: number = 0;

  @deserializeAs(Date)
  created_at: any = new Date();

  @deserializeAs(Date)
  updated_at: any = new Date();
}
