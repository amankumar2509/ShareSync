const express=require('express');
const app=express();
const connectDB=require('./config/db');


const PORT=process.env.PORT|| 5000;


connectDB();
//routes

const fileRoutes = require('./Routes/file');
app.use('/api/files', fileRoutes);


app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
})