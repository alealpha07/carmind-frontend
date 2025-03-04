import axios from 'axios';
const BASE_URL: string = import.meta.env.VITE_BASE_URL;
import { locale, waitLocale } from 'svelte-i18n';
await waitLocale();
let currentLocale: string;
$: locale.subscribe((value) => {
	currentLocale = value as string;
});

class VehicleService {
	static addVehicle(
		type: string,
		brand: string,
		model: string,
		registrationYear: number,
		plateNumber: string,
		isInsured: boolean,
		startDateInsurance: Date,
		endDateInsurance: Date,
		hasBill: boolean,
		endDateBill: Date,
		endDateRevision: Date
	) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.post(
					`${BASE_URL}/vehicle?lang=${currentLocale}`,
					{
						type,
						brand,
						model,
						registrationYear,
						plateNumber,
						isInsured,
						startDateInsurance,
						endDateInsurance,
						hasBill,
						endDateBill,
						endDateRevision
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

	static editVehicle(
		type: string,
		brand: string,
		model: string,
		registrationYear: number,
		plateNumber: string,
		isInsured: boolean,
		startDateInsurance: Date,
		endDateInsurance: Date,
		hasBill: boolean,
		endDateBill: Date,
		endDateRevision: Date,
		id: number
	) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.put(
					`${BASE_URL}/vehicle?lang=${currentLocale}`,
					{
						type,
						brand,
						model,
						registrationYear,
						plateNumber,
						isInsured,
						startDateInsurance,
						endDateInsurance,
						hasBill,
						endDateBill,
						endDateRevision,
						id
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
