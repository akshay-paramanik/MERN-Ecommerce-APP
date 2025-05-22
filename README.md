# 🛒 MERN Ecommerce App

A full-featured modern ecommerce web application built using the MERN Stack (MongoDB, Express.js, React.js, Node.js). This project supports full cart functionality, online payments using Razorpay, admin management, and secure user authentication.

---

## 📦 Features

- 🧑‍💻 User registration & login with JWT
- 🛍️ Product listing with filtering
- 🛒 Add to Cart & Remove from Cart
- 📦 Order placement with address entry
- 💳 Razorpay Payment Gateway integration
- 🔐 Secure backend with token verification
- 🧑‍💼 Admin panel for managing products & users
- 🧑‍💼 Use Cloudinary for uploading images

---

## 🛠️ Tech Stack

| Tech         | Used For         |
|--------------|------------------|
| React.js     | Frontend UI      |
| Node.js      | Backend runtime  |
| Express.js   | API server       |
| MongoDB      | Database         |
| Razorpay     | Payment Gateway  |
| JWT + Bcrypt | Authentication   |
| Axios        | HTTP requests    |
| Cloudinary   | Image upload & hosting    |

---

## 📁 Folder Structure

MERN-Ecommerce-App/
│
├── client/ # React frontend
│ ├── src/
│ └── public/
| └── package.json
│
├── server/ # Node.js + Express backend
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ └── utils/
| └── package.json
│
└── Readme.md



---

## ⚙️ Setup Instructions

### 1. Clone the repository

git clone https://github.com/akshay-paramanik/MERN-Ecommerce-App.git
cd MERN-Ecommerce-App

### 2. Setup Backend
cd server
npm install

Create a .env file inside the server folder:

MONGO_URI=your_mongodb_uri
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_secret
JWT_SECRET=your_jwt_secret
# Cloudinary configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


##start backend server
npm i nodemon
nodemon

### 3. Setup Frontend
cd ../client
npm install

Start the frontend:
npm start


🙋‍♂️ Developed By
Akshay Paramanik



