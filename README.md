## **Getting Started**

Follow these steps to set up the project locally:

### **1. Clone the Repository**

```bash
git clone https://github.com/endalk-tamru/ticketing-system.git
cd Ticketing-System
```

### **2. Install Dependencies**

Make sure you have Node.js and npm installed. Then, run the following command to install all required packages:

```bash
npm install

cd frontend
npm install
```

### **3. Set Environment Variables**

Create a .env file in the root directory and add the following variables:

```bash
NODE_ENV=development
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=30d
```

Replace placeholder values with your actual credentials.

### **4. Run the Server**

Start the backend and frontend using the following command:

```bash
npm run dev
```

The backend will run on the backend http://localhost:5000 and the frontend will run http://localhost:5173 or the port specified in your .env file.

Start the frontend using the following command:

```bash
npm run client
```

The frontend will run on http://localhost:5173 or the port specified in your .env file.

Start the server using the following command:

```bash
npm run server
```

The server will run on http://localhost:5000 or the port specified in your .env file.

## **Important Notes**

- **Database Connection:**  
  Ensure your MongoDB instance is accessible and the connection string is correct.

- **Testing:**  
  Use tools like Postman to test API endpoints.
  Documentation Link: https://documenter.getpostman.com/view/23024675/2sAYdimUYu
