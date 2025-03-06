import axios from 'axios';
const BASE_URL: string = import.meta.env.VITE_BASE_URL;
import { locale, waitLocale } from 'svelte-i18n';
await waitLocale();
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

	static getUrls(vehicleId: Number) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.get(`${BASE_URL}/upload/all?id=${vehicleId}&lang=${currentLocale}`, {
					withCredentials: true
				});
				let data = res.data;

				resolve({
					registrationCardUrl: data.registrationCardFileExtension
						? `${BASE_URL}/upload?id=${vehicleId}&type=${this.FileTypes.registrationCard}&lang=${currentLocale}`
						: '',
					maintenanceManualUrl: data.maintenanceFileExtension
						? `${BASE_URL}/upload?id=${vehicleId}&type=${this.FileTypes.maintenance}&lang=${currentLocale}`
						: '',
					insuranceUrl: data.insuranceFileExtension ? `${BASE_URL}/upload?id=${vehicleId}&type=${this.FileTypes.insurance}&lang=${currentLocale}` : ''
				});
			} catch (error) {
				reject(error);
			}
		});
	}

	static getUrlImage(vehicleId: Number) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.get(`${BASE_URL}/upload/image?id=${vehicleId}&lang=${currentLocale}`, {
					withCredentials: true,
				});
				resolve({
					vehicleImageUrl: res.data.vehicleImageFileExtension
						? `${BASE_URL}/upload?id=${vehicleId}&type=${this.FileTypes.vehicleImage}&lang=${currentLocale}`
						: ''});
			} catch (error) {
				reject(error);
			}
		});
	}

	static delete(vehicleId: Number, type: string) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.delete(`${BASE_URL}/upload?id=${vehicleId}&type=${type}&lang=${currentLocale}`, {
					withCredentials: true,
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
