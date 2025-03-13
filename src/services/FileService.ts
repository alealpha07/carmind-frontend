import axios from 'axios';
const BASE_URL: string = import.meta.env.VITE_BASE_URL;
import { locale } from 'svelte-i18n';
let currentLocale: string;
$: locale.subscribe((value) => {
	currentLocale = value as string;
});

const CACHE_DB_NAME = 'vehicle-files-db';
const CACHE_STORE_NAME = 'files';
const MAX_CACHE_SIZE = 50;

function openDB() {
    return new Promise<IDBDatabase>((resolve, reject) => {
        const request = indexedDB.open(CACHE_DB_NAME, 1);
        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBRequest).result;
            if (!db.objectStoreNames.contains(CACHE_STORE_NAME)) {
                db.createObjectStore(CACHE_STORE_NAME, { keyPath: 'id' });
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

function saveToDB(vehicleId: Number, type: string, blob: Blob) {
    openDB().then(db => {
        const transaction = db.transaction(CACHE_STORE_NAME, 'readwrite');
        const store = transaction.objectStore(CACHE_STORE_NAME);
        
        const request = store.getAllKeys();
        request.onsuccess = () => {
            if (request.result.length >= MAX_CACHE_SIZE) {
                deleteOldestEntry(db).then(() => {
                    addNewEntry(store, vehicleId, type, blob);
                });
            } else {
                addNewEntry(store, vehicleId, type, blob);
            }
        };
        request.onerror = () => console.error('Failed to check item count', request.error);
    });
}

function addNewEntry(store: IDBObjectStore, vehicleId: Number, type: string, blob: Blob) {
    store.put({ id: `${vehicleId}-${type}`, blob, timestamp: Date.now() });
}

function deleteOldestEntry(db: IDBDatabase) {
    return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(CACHE_STORE_NAME, 'readwrite');
        const store = transaction.objectStore(CACHE_STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => {
            const items = request.result;
            if (items.length > 0) {
                const oldest = items.reduce((a, b) => (a.timestamp < b.timestamp ? a : b));
                store.delete(oldest.id).onsuccess = () => resolve();
            } else {
                resolve();
            }
        };
        request.onerror = () => reject(request.error);
    });
}

function getFromDB(vehicleId: Number, type: string) {
    return new Promise((resolve, reject) => {
        openDB().then(db => {
            const transaction = db.transaction(CACHE_STORE_NAME, 'readonly');
            const store = transaction.objectStore(CACHE_STORE_NAME);
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
