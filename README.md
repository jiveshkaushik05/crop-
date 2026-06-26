# 🌾 Crop Yield Prediction System

A web-based Crop Yield Prediction System developed using **Node.js, Express.js, MySQL, HTML, and CSS**. This application allows farmers to register/login, enter crop and environmental details, and receive a predicted crop yield based on the provided inputs.

---

## 👨‍💻 Developed By

**Jivesh Kaushik**

B.Tech Computer and Communication Engineering (CCE)  
Manipal University Jaipur

---

## 📌 Features

- Farmer Registration
- Farmer Login & Logout
- Secure Authentication using Cookies
- Crop Yield Prediction
- Store Prediction History in MySQL Database
- Simple and User-Friendly Interface
- Responsive Design

---

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3

### Backend
- Node.js
- Express.js

### Database
- MySQL

### Packages
- Express
- MySQL2
- Body Parser
- Cookie Parser

---

## 📂 Project Structure

```
Crop-Yield-Prediction/
│
├── public/
│   ├── index.html
│   ├── login.html
│   └── register.html
│
├── index.js
├── package.json
├── package-lock.json
├── node_modules/
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/crop-yield-prediction.git
```

### 2. Open the project

```bash
cd crop-yield-prediction
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure MySQL

Create a database named:

```sql
CREATE DATABASE cropdb;
```

Create the required tables:

- farmer
- prediction

Update the database credentials in `index.js` if necessary.

```javascript
host: 'localhost',
user: 'root',
password: 'root',
database: 'cropdb'
```

---

## ▶️ Run the Project

Start the server:

```bash
npm start
```

or

```bash
node index.js
```

Server will start on:

```
http://localhost:3000
```

Open your browser and visit:

```
http://localhost:3000/login.html
```

---

## 🌱 Prediction Parameters

The system predicts crop yield using:

- Crop Name
- Soil Type
- Soil pH
- Rainfall
- Temperature
- Farming Practice

The predicted yield is stored in the database for future reference.

---

## 📸 Screens

- Registration Page
- Login Page
- Crop Prediction Form
- Prediction Result

---

## 🚀 Future Enhancements

- Machine Learning based prediction model
- Weather API integration
- Fertilizer Recommendation System
- Disease Detection
- Dashboard with Prediction History
- Charts and Analytics
- Email Notifications

---

## 📜 License

This project is developed for educational and academic purposes.

---

