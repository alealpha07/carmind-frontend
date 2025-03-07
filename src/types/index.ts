export type User = {
	id: number;
	email: string;
	name: string;
	surname: string;
	birthDate: Date;
	password: string;
	newPassword: string;
	confirmNewPassword: string;
};

export type Field = {
	type: string;
	label: string;
	placeholder?: string;
	key: string;
	min?: number | Date;
	max?: number | Date;
	step?: number;
};

export type Vehicle = {
	id: number;
	idUser: number;
	type: string;
	brand: string;
	model: string;
	registrationYear: number;
	plateNumber: string;
	isInsured: boolean;
	startDateInsurance: Date;
	endDateInsurance: Date;
	hasBill: boolean;
	endDateBill: Date;
	endDateRevision: Date;
	insuranceFileExtension: string | null;
	maintenanceFileExtension: string | null;
	registrationCardFileExtension: string | null;
	vehicleImageFileExtension: string | null;
};
