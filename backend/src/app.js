import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.routes.js';
import accountsRouter from './routes/account.routes.js';

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "https://123lms00-5173.inc1.devtunnels.ms"],
    credentials: true
}));

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended: true,limit:"16kb"}));
app.use(express.static("public"))
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/accounts", accountsRouter);

export { app };