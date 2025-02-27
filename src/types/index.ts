export type User = {
    email: string;
    name: string;
    surname: string;
    birthDate: Date;
    password: string;
    newPassword: string;
    confirmNewPassword: string;
  };


export type Field = {
  type: string,
  label: string,
  placeholder?: string,
  key: string,
  min?: number | Date,
  max?: number | Date
  step?: number,

};