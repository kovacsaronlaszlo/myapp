export class UserModel {
  id: number;
  name: string;
  email: string;
  address: string;
  dateOfBirth: string;
  gender: string;

  constructor(param?: UserModel) {
    if (param)
      Object.assign(this, param);
  }


  static get exampleUser(): UserModel {
    return {
      id: 0,
      name: 'Kovács Áron László',
      email: 'k.aron.laszlo@gmail.com',
      address: 'Hadak útja',
      dateOfBirth: '1988.01.05',
      gender: 'male'
    };
  }

  static get emptyUser(): UserModel {
    return {
      id: 0,
      name: '',
      email: '',
      address: '',
      dateOfBirth: '',
      gender: ''
    }
  }
}
