import admin from 'firebase-admin';

// var serviceAccount = require('');
let app;
if (admin.apps.length === 0) {
  app =  admin.initializeApp({
    credential: admin.credential.cert({
      type: 'service_account',
      project_id: 'blogify-e31da',
      private_key_id: 'c1fbb317be03b7137a5364bd0c85aebffe86e208',
      private_key:
        '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDY2wx6XbfvNmcz\n3Ob6g6YaGLtzJk3wPn5rRsLrGNZP0R7jt8LUdCggNu5zAOr84msfnCX0L06z5/dk\nW+EpSnGrmYe+hW4nkM2uFsOtjYdRL2ekE/Qz6aTvgoPMFyZv3U/VcgzRoItVLRT2\ndCRIHCT/n2KtQzRA7z8gsZGr+k1BP8GG24AHvTKqAchE2gQ8S546gAeoLm0c1mug\nRGyjXJypDBiPafTdgjxX7g5nEPG0nOZHBfUgITAjL4ml7hau143Xs+xRcX8u1Qmz\nGscnEikPpOSJWrcDbA4szpYGC6pCGptFeuRHXr/NBNK/xeFF7JMlGFD44JWFrHKb\nY66g2mU5AgMBAAECggEASMmhkxMQ8YCLvGs5tj1pC9pgVMK3J1v6l+xs8XdpO+o/\n2YRtJ12DuGhnuf9FYLNo7He/f4o/ewBx1+RFG9RqegQy/X6Q3kPq3bOzY3YdROFK\nAtdVwPT8EQ54SZE9rA+XQ9gfuF8QVXsnzZ9nLDMSMiDgALMNf3wubr1bXWPK+Yqc\nMLByKX8/3yb3iSVMHPqu9/plrtucvyMvUmMa9/SPJtX7dWZp/YOd0hE+pb7pMZd6\ndBkml+o8RryG/B5fEdsn8HGauWgkkrPSKZrYKu8DteO/v371RjAUvfoPaywf3Xsn\npu0+P+BTIAjxxS27jwBxM8JiyxS2FziNwrz1UDk3ZwKBgQDs3ag3XLoUZLmI+GzX\nE8pgpSrmAxxF4QPigaIrkCBmZognyKT4YySa84dIdo1KRjbJYWnbOKl80i0LrfWG\naI55bUnJQv8wAhgPUDy2OEuTK2oDhrv/jf+3LE9SG6tzxOY+rPlVVzK+HEvxwtxT\nRcP+xSl/9G4ihyZ2lHT6Jjvn4wKBgQDqX5WltkRQaCyDMQWLrSFaOkTrEp5ry1Dc\n+WNjm/jMpifcF4HlcSi6OZF1Lg29397BIgOTUEXTLkYF4itfG8a0g6CMBzoU//Cu\nGKFswDYSp4o5HEjVS8eImGOBO1a10lQCQ1e8fJdjNEGePRIja4Klp4PoAI9d6dF4\n+MFUPTBxMwKBgCZHP+sKeivXh0BCXVx4n0j1CDS5pfUJAxa0ul9t4D6MLU64lyho\n5T6BQoiMWBL7u9jZfEDoLEO2t37eswHwna2z4qu6vwCkJf07i0QrXtM+vdgqCvGm\nof+ZEoyDWjbQSCEy1Oxcth+Q9Rjx06dFbAIdHLLH7pB35Nhe73SJfz7fAoGAcwK0\nzLzEiTCVp0tHDWPIGh698x0P4JXE+KroutivHr3qkXZ3p7//3GKjnn0bATH6fYvT\ndVbO7PKoKfryjZlzyOFOx2hEeEmgMc6kaFlqL31Htv7KPuEQ6VbefWxBALhVwUaK\np1P8dhIOoTgWzorTcbbiY9big5NZ16M6O7xLKUECgYEAgTtq1ELp6Jh8P0Ig91J7\nqQAhS7vDOARKy1gIT7mJlZ1yskqAKK82Wr17HKgy71t4IlUarp49VvYN2sPgN2ip\n+l7fQOfXZXLmaAlXLUOIJwQW2asjzLw6fEdjPe9Ft/zKcPKIzTD+llBdvXj4Lrwi\nwLVStfNnYlTzqr2dzbYilM0=\n-----END PRIVATE KEY-----\n',
      client_email:
        'firebase-adminsdk-fbsvc@blogify-e31da.iam.gserviceaccount.com',
      client_id: '110643058545196852611',
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url:
        'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40blogify-e31da.iam.gserviceaccount.com',
      universe_domain: 'googleapis.com',
    }),
  });
} else {
  app = admin.app();
}

export const db = admin.firestore();
