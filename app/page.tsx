"use client";
import { useEffect } from "react";

const Page = () => {
  useEffect(() => {
  // Define the global callback before script loads
  (window as any).otpless = (otplessUser: any) => {
    const token = otplessUser.token;
    console.log("Token:", token);
    console.log("User Details:", JSON.stringify(otplessUser));
    alert("token: " + otplessUser.token)
    // 👉 You can also send token/user details to your backend here
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
