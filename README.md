<h1 align="center">
  <img src="frontend/src/assets/logo.png" alt="Fintrust Logo" width="35" style="border-radius: 50%; vertical-align: middle; margin-right: 12px;" />
  <span>Fintrust – Modern Banking Web App</span>
</h1>

<p align="center">
  <strong>Fast • Secure • Transparent</strong>  
</p>
<p align="center">
  Fintrust is a modern MERN stack banking application designed for seamless and secure banking operations for customers and bankers.
</p>

---

## ✨ Features

- 🔐 **Email Verification** on Signup  
- 🔑 **JWT + Cookie-based Authentication**
- 🧑‍💼 **Role-Based Dashboards** – for Customers and Bankers
- 💸 **Deposit & Withdrawal** Transactions
- 📊 **Transaction History** with Sorting
- 🏦 **Banker Panel** – View Customer Accounts & Transactions
- ⚡ **Fast & Responsive UI** – Tailwind CSS + React
- ☁️ **Deployed** using Vercel (Frontend) and Render (Backend)

---

## ⚙️ Tech Stack

| Layer     | Technology                         |
|-----------|-------------------------------------|
| Frontend  | React.js, Vite, Tailwind CSS        |
| Backend   | Node.js, Express.js                 |
| Database  | MySQL (FreeSQL / Render-hosted)     |
| Auth      | JWT, HTTPOnly Cookies               |
| Hosting   | Vercel (Frontend), Render (Backend) |

---

## 🛠️ Local Setup Instructions

### 📁 1. Clone the Repository

```bash
git clone https://github.com/your-username/fintrust.git

cd fintrust

🔧 2. Setup Backend
cd backend
npm install
Create a .env file in backend/:

PORT=8000
DB_HOST=your_db_host
DB_PORT=3306
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_db_name
ACCESS_TOKEN_SECRET=your_jwt_secret

npm run dev
🖥️ 3. Setup Frontend

cd ../frontend
npm install
Create a .env file in frontend/:

VITE_SERVER_URL=http://localhost:8000

npm run dev
```
🚀 Deployment URLs: https://fin-trust.vercel.app

📲 How to Use
Customer Signup: Register with name, email, and password.

Verify Email: Enter the code received via email.

Login: Access customer dashboard.

Perform Transactions: Deposit or withdraw.

Banker Login: View customer data and transaction history.


Author
Made with ❤️ by Syed Faisal Abdul Rahman Zulfequar

📄 License
This project is licensed under the MIT License – feel free to use and modify it.

⭐ If you found this project useful, consider giving it a star on GitHub!
