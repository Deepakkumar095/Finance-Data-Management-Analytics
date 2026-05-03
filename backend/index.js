import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.routes.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import recordRouter from './routes/record.routes.js';
import userRouter from './routes/user.routes.js';
import dashboardRouter from './routes/dashboard.routes.js';
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://magnificent-sfogliatella-a8dc5d.netlify.app/"
  ],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api", authRouter);
app.use("/api/records", recordRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/users", userRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = process.env.PORT || 8000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch((err) => {
  console.log("DB error:", err);
});
