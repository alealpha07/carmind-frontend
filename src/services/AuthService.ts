import axios from 'axios';
import { locale } from 'svelte-i18n';
const BASE_URL: string = import.meta.env.VITE_BASE_URL;

let currentLocale: string;
$: locale.subscribe((value) => {
	currentLocale = value as string;
});

class AuthService {
	static logout() {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.post(`${BASE_URL}/auth/logout?lang=${currentLocale}`, {}, { withCredentials: true });
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
				const res = await axios.post(
					`${BASE_URL}/auth/login?lang=${currentLocale}`,
					{ username: username, password: password },
					{ withCredentials: true }
				);
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
				const res = await axios.post(
					`${BASE_URL}/auth/register?lang=${currentLocale}`,
					{
						username: username,
						password: password,
						confirmPassword: confirmPassword,
						name: name,
						surname: surname,
						birthDate: birthDate
					},
					{ withCredentials: true }
				);
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
				const res = await axios.get(`${BASE_URL}/auth/user?lang=${currentLocale}`, {
					withCredentials: true
				});
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
				const res = await axios.post(
					`${BASE_URL}/auth/reset?lang=${currentLocale}`,
					{ password: password, newPassword: newPassword, confirmNewPassword: confirmNewPassword },
					{ withCredentials: true }
				);
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
				const res = await axios.post(
					`${BASE_URL}/auth/editprofile?lang=${currentLocale}`,
					{ name: name, surname: surname, birthDate: birthDate },
					{ withCredentials: true }
				);
				const data = res.data;
				resolve(data);
			} catch (error) {
				reject(error);
			}
		});
	}
}

export default AuthService;
