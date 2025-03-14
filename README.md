# Turborepo with Firebase (Express.js & Next.js)

This repository is a **monorepo** using **Turborepo** that integrates **Express.js** (backend) and **Next.js** (frontend), with Firebase features including **Authentication, Firestore, Cloud Functions, and Emulator Suite**. The UI implementation is minimal, focusing on backend functionality.

📹 [Watch Demo Video](https://github.com/ryusuf11/firebase-app/releases/download/demo/firebase.app.demo.mov)

## 🛠 Tech Stack

- **Monorepo Management:** Turborepo
- **Backend:** Express.js, Firebase Functions, Firestore
- **Frontend:** Next.js 15, React MUI, Redux
- **State Management:** Redux
- **Authentication:** Firebase Auth
- **Database:** Firestore
- **Infrastructure:** Firebase Cloud Functions, Firebase Emulator Suite
- **Package Manager:** pnpm
- **Programming Language:** TypeScript

## 📂 Project Structure

```
/turborepo-root
│── apps/
│   ├── backend-repo/  # Express.js + Firebase Functions (API)
│   ├── frontend-repo/  # Next.js 15 (React MUI + Redux)
│── packages/  # Shared utilities
│── .gitignore
│── .eslintrc.js
│── package.json
│── turbo.json
```

## 🚀 Getting Started

### 1️⃣ Install Dependencies

Make sure you have **pnpm** installed globally:

```sh
npm install -g pnpm
```

Then install dependencies:

```sh
pnpm install
```

### 2️⃣ Setup Environment Variables

#### Frontend (`apps/frontend-repo/.env.local`)

Create an `.env.local` file inside `apps/frontend-repo/` with:

```sh
NEXT_PUBLIC_FIREBASE_API_KEY=<your-api-key>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<your-auth-domain>
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your-project-id>
NEXT_PUBLIC_FIREBASE_APP_ID=<your-app-id>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<your-storage-bucket>
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<your-messaging-sender-id>
NEXT_PUBLIC_API_BASE_URL=http://localhost:5001/user-store-b5103/us-central1
```

#### Backend (`apps/backend-repo/serviceAccountKey.json`)

Create a `serviceAccountKey.json` file inside `apps/backend-repo/` with your Firebase service account credentials:

```json
{
  "type": "service_account",
  "project_id": "<your-project-id>",
  "private_key_id": "<your-private-key-id>",
  "private_key": "<your-private-key>\n",
  "client_email": "<your-client-email>",
  "client_id": "<your-client-id>",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/<your-client-email>"
}
```

### 3️⃣ Run Firebase Emulator Locally

Firebase Emulator allows testing Firestore and Functions without deploying.

```sh
cd apps/backend-repo
firebase emulators:start --only functions,firestore,auth
```

### 4️⃣ Start Backend (Express.js + Firebase Functions)

```sh
cd apps/backend-repo
pnpm build && firebase emulators:start --only functions
```

### 5️⃣ Start Frontend (Next.js 14+)

```sh
cd apps/frontend-repo
pnpm dev
```

## 🔥 Deploying to Firebase

Ensure your Firebase project is on the **Blaze Plan** to enable Cloud Functions.

```sh
cd apps/backend-repo
firebase deploy --only functions
```

For frontend deployment:

```sh
cd apps/frontend-repo
firebase target:apply hosting frontend <your-project-id>
firebase deploy --only hosting
```

---

### 🎯 Features

✔ **Firebase Authentication** (Google Sign-In, Email/Password, etc.)\
✔ **Firestore Integration** (Realtime Database)\
✔ **Firebase Cloud Functions** (Backend API)\
✔ **Redux for State Management**\
✔ **React MUI for UI Components**\
✔ **Next.js App Router for Navigation**\
✔ **Turborepo for Monorepo Management**\
✔ **Firebase Emulator Suite for Local Development**

---

## 📌 Notes

- Firebase **Emulator Suite** allows API testing locally without affecting production.
- **Firestore security rules** should be configured before deploying.
- Ensure `.gitignore` includes `serviceAccountKey.json` for security.

💡 **Need improvements or have questions? Feel free to contribute!** 🚀
