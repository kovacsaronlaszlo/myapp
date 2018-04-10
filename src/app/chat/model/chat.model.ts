import getOwnPropertyDescriptor = Reflect.getOwnPropertyDescriptor;

export class ChatMessageModel {
  $id: string;
  msg: string;
  userId: string;
  userName: string;
  userPictureUrl: string;

  constructor(data?: ChatMessageModel) {
    if(data != null) {
      Object.assign(this, data);
    }

    const $idPropertyDescriptior = Object.getOwnPropertyDescriptor(this, '$id');
    $idPropertyDescriptior.enumerable = false;
    Object.defineProperty(this, '$id', $idPropertyDescriptior);
  }
}
