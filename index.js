import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import router from "./routes/route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = [
    "http://localhost:8081",
    "http://localhost:3000",
];

app.use(cookieParser());
app.use(express.json());

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            } else {
                return callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);




app.use(router);

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`⚙️ Server is running at port : ${port}`);
        });
    })
    .catch((err) => {
        console.log("MONGO DB connection failed !!! ", err);
    });
