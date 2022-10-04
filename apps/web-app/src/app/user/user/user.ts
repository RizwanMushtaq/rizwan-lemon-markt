import { Role } from '../../auth/auth.enum';

export interface IUser {
  _id: string;
  email: string;
  name: IName;
  picture: string;
  role: Role | string;
  userStatus: boolean;
  dateOfBirth: Date | null | string;
  level: number;
  address: IAddress;
  phones: Iphone[];
  readonly fullName?: string;
}

export interface IName {
  first: string;
  middle?: string;
  last: string;
}

export interface IAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
}

export interface Iphone {
  type: PhoneType;
  digits: string;
  id: number;
}

export enum PhoneType {
  None = 'none',
  Mobile = 'mobile',
  Home = 'home',
  Work = 'work',
}

export class User implements IUser {
  constructor(
    public _id: string = '',
    public email: string = '',
    public name: IName = { first: '', middle: '', last: '' },
    public picture: string = '',
    public role: Role = Role.None,
    public dateOfBirth: Date | null | string = null,
    public userStatus: boolean = false,
    public level: number = 0,
    public address: IAddress = {
      line1: '',
      city: '',
      state: '',
      zip: '',
    },
    public phones: Iphone[] = []
  ) {}

  static Build(user: IUser) {
    if (!user) {
      return new User();
    }

    if (typeof user.dateOfBirth === 'string') {
      user.dateOfBirth = new Date(user.dateOfBirth);
    }

    return new User(
      user._id,
      user.email,
      user.name,
      user.picture,
      user.role as Role,
      user.dateOfBirth,
      user.userStatus,
      user.level,
      user.address,
      user.phones
    );
  }

  public get fullName() {
    if (!this.name) {
      return '';
    }

    if (this.name.middle) {
      return `${this.name.first} ${this.name.middle} ${this.name.last}`;
    }

    return `${this.name.first} ${this.name.last}`;
  }

  toJSON(): object {
    const serialized = Object.assign(this);
    delete serialized._id;
    delete serialized.fullName;
    return serialized;
  }
}
