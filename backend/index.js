import express from 'express'
import dotenv from 'dotenv'
import authRouter from './routes/auth.routes.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import recordRouter from './routes/record.routes.js';
import userRouter from './routes/user.routes.js';
import dashboardRouter from './routes/dashboard.routes.js';
dotenv.config();

let app = express();
let port = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser())
app.use("/api", authRouter);

app.use("/api/records", recordRouter);

app.use("/api/dashboard", dashboardRouter);

app.use("/api/users", userRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port,() =>{
    connectDB();
    console.log(`Server is running on port ${port}`);
})