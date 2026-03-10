import { initializeApp } from "firebase/app";
import { environment } from "./environment/environment.dev";

const firebaseConfig = environment.firebase;

const app = initializeApp(firebaseConfig);