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


//Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

//Api
app.use("/api/v1", userRoutes);

//rest api
app.get('/',(req,res)=>{
    res.send("<h1>Welcome to Expense-Management-App</h1>")
})

// //static Files
// app.use(express.static(path.join(__dirname, './client/build')));

// app.get('*',function(req,res){
//     res.sendFile(path.join(__dirname, './client/build/index.html'));
// })

//PORT
const PORT = 8080 || process.env.PORT;

//Run listen
app.listen(PORT,()=>{
    console.log("server running")
}) 
