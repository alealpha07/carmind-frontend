import axios from 'axios';
const BASE_URL: string = import.meta.env.VITE_BASE_URL;
import { locale } from 'svelte-i18n';
let currentLocale: string;
$: locale.subscribe((value) => {
	currentLocale = value as string;
});

const DB_NAME = 'vehicle-files-db';
const STORE_NAME = 'files';

function openDB() {
    return new Promise<IDBDatabase>((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);
        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBRequest).result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

function saveToDB(vehicleId: Number, type: string, blob: Blob) {
	console.log("started")
    openDB().then(db => {
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        store.put({ id: `${vehicleId}-${type}`, blob });
    });
}

function getFromDB(vehicleId: Number, type: string) {
    return new Promise((resolve, reject) => {
        openDB().then(db => {
            const transaction = db.transaction(STORE_NAME, 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.get(`${vehicleId}-${type}`);
            
            request.onsuccess = () => {
                if (request.result) {
                    resolve(URL.createObjectURL(request.result.blob));
                } else {
                    reject('No cached file found');
                }
            };
            request.onerror = () => reject(request.error);
        });
    });
}

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
                if (navigator.onLine) {
                    const res = await axios.get(`${BASE_URL}/upload?id=${vehicleId}&type=${type}&lang=en`, {
                        withCredentials: true,
                        responseType: 'blob'
                    });
					console.log("diocan")
                    const blob = new Blob([res.data]);
                    saveToDB(vehicleId, type, blob);
                    resolve(URL.createObjectURL(blob));
                } else {
                    getFromDB(vehicleId, type).then(resolve).catch(reject);
                }
            } catch (error) {
                console.error('Fetch failed, trying to load from IndexedDB:', error);
                getFromDB(vehicleId, type).then(resolve).catch(reject);
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
