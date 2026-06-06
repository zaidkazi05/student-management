# Student Management

A simple Express web app with a Contact Us form. Submissions are saved to MongoDB.

## Local setup

```powershell
cd D:\tp\student-management
npm.cmd install --cache .npm-cache
Copy-Item .env.example .env
```

Edit `.env` and set `MONGODB_URI` to your MongoDB Atlas connection string.

```powershell
npm.cmd run dev
```

Open `http://localhost:3000`.

## MongoDB Atlas setup

1. Create a free MongoDB Atlas cluster.
2. Create a database user and password.
3. Add your current IP address for local testing.
4. Copy the connection string and use it as `MONGODB_URI`.
