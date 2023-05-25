import express from "express";
import morgan from "morgan";
import {config} from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./config/db.js"
import cors from "cors";
import adminRoutes from './routes/adminRoutes.js'
import coachRoutes from "./routes/coachesRoutes.js";
import memberRoutes from "./routes/memberRoutes.js";
import debtRoutes from "./routes/debtRoutes.js";
import salaryRoutes from "./routes/salaryRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import incomeRoutes from "./routes/incomeRoutes.js";
import supplementRoutes from "./routes/supplemenetRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import membershipRoutes from "./routes/membershipRoutes.js";
import programRoutes from "./routes/programRoutes.js"
import attendanceRoutes from "./routes/attendanceRoutes.js";



config()
connectDB()
const app = express()

const port = process.env.Port || 5000;

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors());
// app.use("/",(req,res,next)=>{

//     console.log(req.body)
//     next()
// })
app.use('/admin',adminRoutes)
app.use('/coach',coachRoutes)
app.use('/member',memberRoutes)
app.use('/debt',debtRoutes)
app.use('/salary',salaryRoutes)
app.use('/expense',expenseRoutes)
app.use('/income',incomeRoutes)
app.use('/supplement',supplementRoutes)
app.use('/paymentRoutes',paymentRoutes)
app.use('/membershipRoutes',membershipRoutes)
app.use('/programRoutes',programRoutes)
app.use('/attendanceRoutes',attendanceRoutes)


app.listen(port,(req,res)=>
{console.log(`server listen on port ${port}`)
})