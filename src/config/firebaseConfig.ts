import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";
import { getFirestore, Firestore } from "firebase-admin/firestore";

import serviceAccount from "../../back-end-dev-rrc-firebase-adminsdk-fbsvc-0a34464590.json";

initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
});

const auth: Auth = getAuth();
const db: Firestore = getFirestore();

export { auth, db };
