const express=require('express');
const app=express();
const connectDB=require('./config/db');
const path = require('path'); 
const cors = require('cors');
const cron= require('node-cron');
const cleanupFiles = require('./fileCleanup');




const PORT=process.env.PORT|| 5000;
connectDB();

//Cors 

const corsOptions = {
  origin: process.env.ALLOWED_CLIENTS
};


app.use(cors(corsOptions));

app.use(express.static('public'));
//template engine

app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');


app.get('/', (req, res) => {
    // Render the index page
    res.render('index',{ baseURL: process.env.APP_BASE_URL });
  });

//routes

const fileRoutes = require('./Routes/file');
app.use('/api/files', fileRoutes);
const showRoutes = require('./Routes/show');
app.use('/files',showRoutes);
const downloadRoutes = require('./Routes/download');
app.use('/files/download',downloadRoutes)

//crons

cron.schedule('0 0 * * *', cleanupFiles);

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
})