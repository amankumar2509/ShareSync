const express=require('express');
const app=express();
const connectDB=require('./config/db');
const path = require('path'); 



const PORT=process.env.PORT|| 5000;
connectDB();


app.use(express.static('public'));
//template engine

app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');


app.get('/', (req, res) => {
    // Render the index page
    res.render('index');
  });

//routes

const fileRoutes = require('./Routes/file');
app.use('/api/files', fileRoutes);
const showRoutes = require('./Routes/show');
app.use('/files',showRoutes);
const downloadRoutes = require('./Routes/download');
app.use('/files/download',downloadRoutes)


app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
})