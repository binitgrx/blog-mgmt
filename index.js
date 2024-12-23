require("dotenv").config()
const express =require("express")
const morgan =require("morgan")
const mongoose =require("mongoose");

const app = express();
const indexRouter = require("./routes/index")
const PORT = process.env.PORT || 5555;

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("database is connected");
  })
  .catch((e) => {
    console.log("database connection is failed",e.toString());
  });


app.use(morgan("tiny"));
app.use(express.json());
app.use("/resources",express.static("public"));

app.use("/api/v1",indexRouter)

app.use((err,req,res,next) =>{
    const errMsg = err.toString() || "something went wrong";
    res.status(500).json({data:null,msg:errMsg})
})

app.listen(PORT,() => {
    console.log(`App is running in port ${PORT}`)
})