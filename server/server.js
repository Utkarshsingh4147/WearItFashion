const express = require('express');
const dbConfig = require('./src/config/dbConfig');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./src/routes/authRoutes');
const ProductRouter = require('./src/routes/productRoutes');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

dbConfig();

app.use('/auth', authRouter);
app.use('/app', ProductRouter);


app.listen(process.env.PORT, ()=>{
    console.log("Srever running on the PORT :",process.env.PORT);
});