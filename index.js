const express = require("express");
const path = require("path"); 

const {connectMongodb} = require("./connection");
const {logReqRes} = require("./middlewares");
const userRouter = require("./routes/user");
const medicineRouter = require("./routes/medicine");
const homeRouter = require("./routes/home");

const app = express();
const PORT = 8000;

connectMongodb("mongodb://127.0.0.1:27017/vedant")
.then(()=>console.log("mongoose.connect"))
.catch((err)=>console.log("mongoose.connect error" + err))

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
//
app.use(express.urlencoded({extended:false}));

app.use(logReqRes("log.txt"));

app.use("/users",userRouter);
app.use("/medicines",medicineRouter);
app.use("/home",homeRouter);

app.listen(PORT,()=>console.log('Server Start at port: ' + PORT));