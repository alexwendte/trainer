export interface IUser {
  _id: string;
  email?: string;
  name: string;
  password: string;
  token: string;
  username: string;
}

export interface IFullUser extends IUser {
  email: string
  career: string
  bio: string
  isMentor: boolean
  phoneNumber: string
  avatar: string
}

export interface IForm {
  currentTarget: {
    elements: {
      [key: string]: HTMLInputElement | HTMLTextAreaElement;
    };
  };
}

export interface IApiError {
  response: {
    status: number;
  };
}

export interface IMentor extends IFullUser{
  rate: string;
  review: string;
  category: string;
}

export interface IMeeting {
  _id: string,
  title: string,
  isAccepted: boolean,
  meetingDate: string,
  meetingStudent: IFullUser,
  meetingMentor: IMentor
}