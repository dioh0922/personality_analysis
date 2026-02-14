const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// .envファイルを親ディレクトリから読み込む
const result = dotenv.config({ path: path.join(__dirname, '../.env') });
if (result.error) {
  console.warn('Warning: .env file not found or could not be loaded.');
}

const targetPath = path.join(__dirname, './src/environments/environment.ts');
const targetPathDev = path.join(__dirname, './src/environments/environment.development.ts');

const envConfigFile = `export const environment = {
  firebase: {
    apiKey: '${process.env.VITE_FIREBASE_API_KEY || ''}',
    authDomain: '${process.env.VITE_FIREBASE_AUTH_DOMAIN || ''}',
    databaseURL: '${process.env.VITE_FIREBASE_DATABASE_URL || ''}',
    projectId: '${process.env.VITE_FIREBASE_PROJECT_ID || ''}',
    storageBucket: '${process.env.VITE_FIREBASE_STORAGE_BUCKET || ''}',
    messagingSenderId: '${process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || ''}',
    appId: '${process.env.VITE_FIREBASE_APP_ID || ''}',
  },
};
`;

fs.writeFileSync(targetPath, envConfigFile);
fs.writeFileSync(targetPathDev, envConfigFile);
console.log(`Output generated at ${targetPath} and ${targetPathDev}`);
