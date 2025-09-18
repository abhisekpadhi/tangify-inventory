import { NextResponse } from "next/server";
import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { jwtUtils } from "@/lib/jwtUtils";

// https://firebase.google.com/docs/web/setup#available-libraries
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyCANsWugRND8-g22pcHqoQSCpoYb9ajd7Q",
    authDomain: "tangify-83e82.firebaseapp.com",
    projectId: "tangify-83e82",
    storageBucket: "tangify-83e82.firebasestorage.app",
    messagingSenderId: "743671851457",
    appId: "1:743671851457:web:e5cb7a1974f3ee8e7de740",
//   measurementId: "G-8G0WEPSF5T"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export async function getIdentitiesFromDB() {
    try {
        const docRef = doc(db, "staffs", "identities");
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
            const result = docSnap.data()
            return result;
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document - /staffs/db_identities");
          }
    } catch (error) {
      console.error("Error fetching staffs:", error);
    }
    return null
}

export async function getTokenDetails(token: string) {
    const response = await fetch("https://user-auth.otpless.app/auth/v1/validate/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "clientId": process.env.OTPLESS_CLIENT_ID || "",
          "clientSecret": process.env.OTPLESS_CLIENT_SECRET || "",
        },
        body: JSON.stringify({
          token: token,
        }),
      });
      
      const data = await response.json();
      return data
}




// Handle POST request
export async function POST(request: Request) {
    const body = await request.json();
    const dbIdentities = await getIdentitiesFromDB()
    // { EMAIL: ['avicool000@gmail.com'], MOBILE: [ '919439831236' ] }
    console.log("db_identities: ", dbIdentities)
    const tokenDetails = await getTokenDetails(body.token)
    console.log("Token details: ", tokenDetails)
    if (dbIdentities === null) {
        console.log("No db_identities found")
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
    try {
        const identity = tokenDetails.identities[0];
        if (dbIdentities[identity.identityType].includes(identity.identityValue)) {
            const response = NextResponse.json({ message: "Login successful", authenticated: true });
            const jwt = await jwtUtils.createJWT({identity: identity.identityValue, name: identity.name})
            console.log("JWT: ", jwt)
            // Set cookie
            response.cookies.set("session", jwt, {
                httpOnly: false,   // can’t be accessed by JS
                secure: true,     // only over HTTPS
                path: "/",        // available on entire site
                maxAge: 60 * 60,  // 1 hour
            });

            return response;
        }

        return NextResponse.json({ error: "Unauthorized. Not in staffs list." }, { status: 401 })
        
    } catch (error) {
        console.log("error in parsing identites", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}