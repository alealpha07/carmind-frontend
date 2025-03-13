import type { Vehicle } from '$types';
import axios from 'axios';
const BASE_URL: string = import.meta.env.VITE_BASE_URL;
import { locale } from 'svelte-i18n';
let currentLocale: string;
$: locale.subscribe((value) => {
	currentLocale = value as string;
});

class VehicleService {
	static addVehicle(vehicle: Vehicle) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.post(`${BASE_URL}/vehicle?lang=${currentLocale}`, vehicle, {
					withCredentials: true
				});
				const data = res.data;
				resolve(data);
			} catch (error) {
				reject(error);
			}
		});
	}

	static getVehicles() {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.get(`${BASE_URL}/vehicle?lang=${currentLocale}`, {
					withCredentials: true
				});
				const data = res.data;
				resolve(data);
			} catch (error) {
				reject(error);
			}
		});
	}

	static editVehicle(vehicle: Vehicle, id: number) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.put(`${BASE_URL}/vehicle?lang=${currentLocale}`, { ...vehicle, ...{ id: id } }, { withCredentials: true });
				const data = res.data;
				resolve(data);
			} catch (error) {
				reject(error);
			}
		});
	}
	static deleteVehicle(id: number) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.delete(`${BASE_URL}/vehicle?id=${id}&lang=${currentLocale}`, {
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

export default VehicleService;
