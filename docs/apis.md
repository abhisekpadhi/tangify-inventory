## API to verify OTPLess token

- Response for whatsapp login
```json
{
    "token": "7244130f607e45c9a8bb273608fda106",
    "status": "SUCCESS",
    "userId": "MO-e40d6f1e0edd491da4ad7755f6ed55ce",
    "timestamp": "2025-09-18T19:24:12Z",
    "identities": [
        {
            "identityType": "MOBILE",
            "identityValue": "919439831236",
            "channel": "QR",
            "methods": [
                "WHATSAPP"
            ],
            "name": "Abhisek Padhi",
            "verified": true,
            "verifiedAt": "2025-09-18T19:24:12Z",
            "verifyingSource": "ONETAP"
        }
    ],
    "network": {
        "ip": "157.20.168.135",
        "timezone": "Asia/Kolkata",
        "ipLocation": {
            "accuracyRadius": null,
            "city": {
                "code": null,
                "name": "Anekal"
            },
            "subdivisions": {
                "code": "KA",
                "name": "Karnataka"
            },
            "country": {
                "code": "IN",
                "name": "India"
            },
            "continent": {
                "code": "AS",
                "name": null
            },
            "latitude": 12.7111,
            "longitude": 77.69557,
            "postalCode": "562106",
            "asn": null
        }
    },
    "deviceInfo": {
        "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:142.0) Gecko/20100101 Firefox/142.0",
        "platform": "MacIntel",
        "vendor": "",
        "browser": "Unknown",
        "connection": "UNKNOWN",
        "language": "en-US",
        "cookieEnabled": true,
        "screenWidth": 1728,
        "screenHeight": 1117,
        "screenColorDepth": 30,
        "devicePixelRatio": 2.0,
        "timezoneOffset": -330,
        "cpuArchitecture": "16-core",
        "fontFamily": "serif"
    }
}
```

- Response for email login

```json
{
    "token": "4b9b7184de2e47ebb59d92da85669a67",
    "status": "SUCCESS",
    "userId": "MO-69ec188e3f124a2da270e2b15bb50cea",
    "timestamp": "2025-09-18T19:16:53Z",
    "identities": [
        {
            "identityType": "x",
            "identityValue": "avicool000@gmail.com",
            "channel": "OAUTH",
            "methods": [
                "GOOGLE"
            ],
            "name": "Abhisek Padhi",
            "verified": true,
            "verifiedAt": "2025-09-18T19:16:53Z",
            "picture": "https://lh3.googleusercontent.com/a/ACg8ocKLvSZEjuSEyXGqvr51TrxEWxzlnVs2meoriGuZx2cj18JrLQtP=s96-c",
            "isCompanyEmail": false,
            "providerMetadata": {
                "email": "avicool000@gmail.com",
                "nonce": "52993731-77a3-49f5-8472-5e977f580c67",
                "isEmailVerified": true,
                "name": "Abhisek Padhi",
                "picture": "https://lh3.googleusercontent.com/a/ACg8ocKLvSZEjuSEyXGqvr51TrxEWxzlnVs2meoriGuZx2cj18JrLQtP=s96-c"
            }
        }
    ],
    "network": {
        "ip": "157.20.168.135",
        "timezone": "Asia/Kolkata",
        "ipLocation": {
            "accuracyRadius": null,
            "city": {
                "code": null,
                "name": "Anekal"
            },
            "subdivisions": {
                "code": "KA",
                "name": "Karnataka"
            },
            "country": {
                "code": "IN",
                "name": "India"
            },
            "continent": {
                "code": "AS",
                "name": null
            },
            "latitude": 12.7111,
            "longitude": 77.69557,
            "postalCode": "562106",
            "asn": null
        }
    },
    "deviceInfo": {
        "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:142.0) Gecko/20100101 Firefox/142.0",
        "platform": "MacIntel",
        "vendor": "",
        "browser": "Unknown",
        "connection": "UNKNOWN",
        "language": "en-US",
        "cookieEnabled": true,
        "screenWidth": 1728,
        "screenHeight": 1117,
        "screenColorDepth": 30,
        "devicePixelRatio": 2.0,
        "timezoneOffset": -330,
        "cpuArchitecture": "16-core",
        "fontFamily": "serif"
    }
}
```