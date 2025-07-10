import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "https://123lms00-5173.inc1.devtunnels.ms"],
    credentials: true
}));

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended: true,limit:"16kb"}));
app.use(express.static("public"))
app.use(cookieParser());

export { app };