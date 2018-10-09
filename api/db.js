var admin = require("firebase-admin")

require('dotenv').config()

var serviceAccount = {
    "type": "service_account",
    "project_id": "turbodoto",
    "private_key_id": process.env.FB_APIKEY_ID,
    "private_key": JSON.parse(JSON.stringify(process.env.FB_APIKEY.replace(/\\n/g, '\n'))),
    "client_email": process.env.FB_CLIENT_EMAIL,
    "client_id": process.env.FB_CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": process.env.FB_CLIENT_CERT_URL
  }  

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://turbodoto.firebaseio.com"
});

var db = admin.firestore();

const settings = { timestampsInSnapshots: true }

admin.firestore().settings(settings);

module.exports = db