// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { ref, uploadBytes, uploadString, getDownloadURL, getBlob, deleteObject } from 'firebase/storage';

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const folderPath = 'gs://mento-8c9e0.appspot.com';
export let firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
// Initialize Firebase
// export const firebaseAnalyticApp = getAnalytics(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp, folderPath);

export const uploadFile = async (filename: string, file: File) => {
	try {
		const storageRef = ref(firebaseStorage, `public/files/${filename.replace(/ /g, '_')}`);
		const res = await uploadBytes(storageRef, file);

		return res.metadata.fullPath;
	} catch (error) {
		throw error;
	}
};

export const getFile = async (reference: string) => {
	try {
		const fileRef = ref(firebaseStorage, reference);
		return getDownloadURL(fileRef);
	} catch (error) {
		throw error;
	}
};
