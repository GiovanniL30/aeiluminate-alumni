# aeIluminate

### Tech Stack

- **AppWrite**
- **MySQL**
- **React**
- **Multer**
- **React Query**
- **JWT**
- **Vite**
- **Tailwind CSS**
- **Node.js**
- **Express**

### Project Structure

This project is organized into two main folders:

1. **frontend**: Contains the React app along with the build configuration.
2. **server**: Contains the backend logic using Node.js and Express.

### Installation Guide

Follow these steps to set up and run the project locally:

#### Prerequisites

Ensure you have the following tools installed on your local machine:

- **Node.js** (v20.x or higher)
- **MySQL** (https://dev.mysql.com/downloads/installer/)
- **AppWrite** (https://appwrite.io/) (or a running instance of AppWrite)
- **Vite** (https://vitejs.dev/) for frontend development (optional if you're using npm)

#### 1. Clone the repository

```bash
git clone https://github.com/GiovanniL30/aeiluminate-finals.git
cd aeiluminate-finals
```

#### 2. Set up the frontend

Navigate to the frontend folder:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

#### 3. Set up the server

Navigate to the server folder:

```bash
cd ../server
```

Install the dependencies:

```bash
npm install
```

#### 4. Set up the server

You will need to configure the environment variables for both the frontend and backend to work properly.

In the frontend folder, create a .env file and add the following configuration:

```bash
VITE_API_BASE_URL=http://localhost:1099
```

In the server folder, create a .env file and add the following configuration:

```bash
#Application
PORT
secret_key
ADMIN_USERNAME
ADMIN_PASSWORD

#Appwrite
APP_WRITE_ENDPOINT
APP_WRITE_PROJECT_ID

#Database
DATABASE_HOST
DATABASE_USER
DATABASE_PASSWORD
DATABASE_PORT
DATABASE_NAME
```

#### 5. Run the Server

To start the backend server, run the following command from the server folder:

```bash
npm start
```

#### 6. Run the Frontend

To start the frontend development server, run the following command from the frontend folder:

```bash
npm run dev
```
