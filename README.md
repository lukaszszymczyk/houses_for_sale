# Houses for sale

This project includes implementation of application with houses for sale announcements.

## Used technologies

| Tech                                            | Description                                                              |
|-------------------------------------------------| ------------------------------------------------------------------------ |
| [NextJS](https://nextjs.org/)                   | Framework providing React-based applications with SSR and SWG            |
| [React](https://reactjs.org/)                   | Library for building user interfaces                                     |
| [Firebase](https://firebase.google.com/)        | Set of backend cloud computing (authentication, NoSQL database, storage) |
| [Typescript](https://www.typescriptlang.org/)   | Javascript superset language                                             |
| [React Hook Form](https://react-hook-form.com/) | Forms with easy-to-use validation.                                       |

## App functionalities
- user registration and login (with Facebook, Google and Github providers)
- presenting a list of houses for sale for logged user
- form with adding new announcement (integration with Firebase NoSQL database)
- deleting house announcement
- uploading file to Firestore


## Installation

```bash
git clone https://github.com/lukaszszymczyk/houses_for_sale
npm install
npm run start
```

Example of .env file:
```bash
#Firebase configuration

FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
```


## Available scripts

| Command                   | Description                   |
| ------------------------- | ----------------------------- |
| `npm run dev`             | Open local server             |
| `npm run build`           | Create optimized build        |
| `npm run start`           | Start with production mode    |

## Live

https://houses-for-sale-lukaszszymczyk.vercel.app

## Screenshots
Product list view:
<p align="center" style="padding: 0 16px">
<img width="600" alt="Screen shot" src="https://github.com/lukaszszymczyk/houses_for_sale/assets/15704051/c38034b4-db39-4e33-bc06-5c7cbdc1ef6c"></p>

Product details view:
<p align="center" style="padding: 0 16px">
    <img width="600" src="https://github.com/lukaszszymczyk/houses_for_sale/assets/15704051/a72a5706-eede-4d49-bf91-56bef383668a" alt="Screen Shot">
</p>

Search product by a phrase:
<p align="center" style="padding: 0 16px">
    <img width="600" src="https://github.com/lukaszszymczyk/houses_for_sale/assets/15704051/f74ee6d0-8ab0-4b26-a4f6-337e34a515f1" alt="Screen Shot">
</p>
