// Firebase配置文件
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Firebase配置
const firebaseConfig = {
  apiKey: "AIzaSyCqQqu7w4K2Il4TuEK0bEGbICX3iPlwjRI",
  authDomain: "showyourself-baozaolaoxie.firebaseapp.com",
  projectId: "showyourself-baozaolaoxie",
  storageBucket: "showyourself-baozaolaoxie.appspot.com",
  messagingSenderId: "48173332594",
  appId: "1:48173332594:web:745bd46074b78b5b7f2aeb",
  measurementId: "G-6DYCNHTMC3"
};

// 初始化Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

// 认证相关函数
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// 存储相关函数
export const uploadFile = async (file, path) => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return { success: true, url: downloadURL };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// 导出Firebase实例
export { app, auth, storage, analytics };