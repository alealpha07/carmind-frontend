import axios from 'axios';
const BASE_URL: string = import.meta.env.VITE_BASE_URL;

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
					`${BASE_URL}/vehicle`,
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
				const res = await axios.get(`${BASE_URL}/vehicle`,{ withCredentials: true });
				const data = res.data;
				resolve(data);
			} catch (error) {
				reject(error);
			}
		});
	}
}

export default VehicleService;
