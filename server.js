const express=require('express');
const app=express();
const connectDB=require('./config/db');


const PORT=process.env.PORT|| 5000;
connectDB();

//template engine

app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');


//routes

const fileRoutes = require('./Routes/file');
app.use('/api/files', fileRoutes);
const showRoutes = require('./Routes/show');
app.use('/files',showRoutes)


app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
})