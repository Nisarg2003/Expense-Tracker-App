import  express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import colors from "colors";
import connectDb from "./config/connectDb.js";
import userRoutes from "./routes/userRoutes.js"
import cors from 'cors'
// import path from 'path'
// import { dirname } from "path";

// config dot env file
dotenv.config();

//config connectDb
connectDb();

// Rest Object
const app = express()

const corsOptions = {
    origin: 'https://expense-tracker-app-six-puce.vercel.app/', 
    methods: ['GET', 'POST'], 
    allowedHeaders: ['Content-Type', 'Authorization']
  };
  
  app.use(cors(corsOptions));
  
//Middlewares
app.use(morgan('dev'))
app.use(express.json())





app.use("/api/v1", userRoutes);


app.get('/',(req,res)=>{
    res.send("<h1>Welcome to Expense-Management-App</h1>")
})


const PORT = 8080 || process.env.PORT;


app.listen(PORT,()=>{
    console.log("server running")
}) 
