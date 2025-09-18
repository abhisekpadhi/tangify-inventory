"use client";
import { useEffect } from "react";

export type OtplessIdentity = {
  identityType: string;        // e.g. "EMAIL", "PHONE"
  identityValue: string;       // actual email/phone
  channel: string;             // e.g. "OAUTH", "SMS"
  methods: string[];           // e.g. ["GOOGLE"]
  name?: string;               // optional full name
  verified: boolean;           // whether verified
  verifiedAt?: string;         // ISO timestamp if verified
  isCompanyEmail?: string;     // "true" | "false" (string from API)
};

export type OtplessNetwork = {
  ip?: string;
  timezone?: string;
  ipLocation?: Record<string, unknown>;
};

export type OtplessResponse = {
  status: "SUCCESS" | "FAILURE" | string;
  token: string;
  userId: string;
  timestamp: string;          // ISO timestamp
  identities: OtplessIdentity[];
  idToken?: string;
  network?: OtplessNetwork;
  deviceInfo?: Record<string, unknown>;
  sessionInfo?: Record<string, unknown>;
  firebaseInfo?: Record<string, unknown>;
};


const Page = () => {
  useEffect(() => {
  // Define the global callback before script loads
  (window as any).otpless = (otplessUser: OtplessResponse) => {
    const token = otplessUser.token;
    console.log("Token:", token);
    console.log("User Details:", JSON.stringify(otplessUser));
    // alert("token: " + otplessUser.token)
    // 👉 You can also send token/user details to your backend here
    fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
    .then(response => response.json())
    .then(data => {
      console.log("Backend Response:", data)
      if (data?.authenticated ?? false) {
        window.location.href = '/inventory';
        return
      }
      alert("Login failed");
    })
    .catch(error => {
      alert("Error sending token to backend");
      console.error("Error sending token to backend:", error)
    });

  };        

    // Prevent duplicate injection
    if (document.getElementById("otpless-sdk")) return;

    // Create the script element
    const script = document.createElement("script");
    script.id = "otpless-sdk";
    script.type = "text/javascript";
    script.src = "https://otpless.com/v4/auth.js"; // ✅ Replace with actual OTPless script URL
    script.setAttribute("data-appid", "18JNF0M9JHADR8P302YM"); // ✅ Replace with your real App ID
    script.async = true;

    // Append to document
    document.body.appendChild(script);

    // Clean up if component unmounts
    return () => {
      const existing = document.getElementById("otpless-sdk");
      if (existing) {
        existing.remove();
      }
    };
  }, []);

  return <div id="otpless-login-page"></div>;
};

export default Page
