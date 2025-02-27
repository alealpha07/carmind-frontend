import axios from 'axios';
const BASE_URL: string = import.meta.env.VITE_BASE_URL;

class AuthService {

  static logout() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true, });
        const data = res.data;
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  static login(username: string, password: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${BASE_URL}/auth/login`, { username: username, password: password }, { withCredentials: true, });
        const data = res.data;
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  static register(username: string, password: string, confirmPassword: string, name: string, surname: string, birthDate: Date) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${BASE_URL}/auth/register`, { username: username, password: password, confirmPassword: confirmPassword, name: name, surname: surname, birthDate: birthDate }, { withCredentials: true, });
        const data = res.data;
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  static getUser() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${BASE_URL}/auth/user`, { withCredentials: true, });
        const data = res.data;
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  static resetPassword(password: string, newPassword: string, confirmNewPassword: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${BASE_URL}/auth/reset`, {password: password, newPassword: newPassword, confirmNewPassword: confirmNewPassword}, { withCredentials: true, });
        const data = res.data;
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  static editProfile(name: string, surname: string, birthDate: Date) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${BASE_URL}/auth/editprofile`, {name: name, surname: surname, birthDate: birthDate}, { withCredentials: true, });
        const data = res.data;
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

}

export default AuthService;