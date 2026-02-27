import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { environment } from "./environment/environment.dev";

const firebaseConfig = environment.firebase;

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);