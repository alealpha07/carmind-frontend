import axios from 'axios';
const BASE_URL: string = import.meta.env.VITE_BASE_URL;
import { locale } from 'svelte-i18n';
let currentLocale: string;
$: locale.subscribe((value) => {
	currentLocale = value as string;
});

class FileService {
	public static FileTypes = {
		vehicleImage: 'vehicleImageFileExtension',
		registrationCard: 'registrationCardFileExtension',
		maintenance: 'maintenanceFileExtension',
		insurance: 'insuranceFileExtension'
	};

	static upload(file: FormData, vehicleId: Number, type: string) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.post(`${BASE_URL}/upload?id=${vehicleId}&type=${type}&lang=${currentLocale}`, file, {
					withCredentials: true,
					headers: { 'Content-Type': 'multipart/form-data' }
				});
				const data = res.data;
				resolve(data);
			} catch (error) {
				reject(error);
			}
		});
	}

	static get(vehicleId: Number, type: string) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.get(`${BASE_URL}/upload?id=${vehicleId}&type=${type}&lang=${currentLocale}`, {
					withCredentials: true,
					responseType: 'blob'
				});
				let url = URL.createObjectURL(new Blob([res.data]));
				resolve(url);
			} catch (error) {
				reject(error);
			}
		});
	}

	static getAvailableFilesUrls(vehicleId: Number) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.get(`${BASE_URL}/upload/available?id=${vehicleId}&lang=${currentLocale}`, {
					withCredentials: true
				});

				resolve({
					registrationCardUrl: res.data.registrationCardFileExtension
						? `${BASE_URL}/upload?id=${vehicleId}&type=${this.FileTypes.registrationCard}&lang=${currentLocale}`
						: '',
					maintenanceManualUrl: res.data.maintenanceFileExtension
						? `${BASE_URL}/upload?id=${vehicleId}&type=${this.FileTypes.maintenance}&lang=${currentLocale}`
						: '',
					insuranceUrl: res.data.insuranceFileExtension
						? `${BASE_URL}/upload?id=${vehicleId}&type=${this.FileTypes.insurance}&lang=${currentLocale}`
						: '',
					vehicleImageUrl: res.data.vehicleImageFileExtension
						? `${BASE_URL}/upload?id=${vehicleId}&type=${this.FileTypes.vehicleImage}&lang=${currentLocale}&t=${Date.now()}`
						: ''
				});
			} catch (error) {
				reject(error);
			}
		});
	}

	static delete(vehicleId: Number, type: string) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.delete(`${BASE_URL}/upload?id=${vehicleId}&type=${type}&lang=${currentLocale}`, {
					withCredentials: true
				});
				const data = res.data;
				resolve(data);
			} catch (error) {
				reject(error);
			}
		});
	}
}

export default FileService;
