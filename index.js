const express = require('express');
const UserRouter = require("./routers/userRouter");
const RentRouter = require("./routers/rentRouter");
const cors = require('cors');




const port = 5000;

//initiliaze express app 
const app = express();

// middle ware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173']
}));


app.use('/user', UserRouter);
app.use('/rent', RentRouter);


// route
app.get('/', (req, res) => {
    res.send('Response from express server');


});

app.get('/add', (req, res) => {
    res.send('Response from add route');


});

// getall
//getbyid
//update
//delete

app.get('/getall', (req, res) => {
    res.send('Reponse to getall the data from backend');
});


app.get('/getbyid', (req, res) => {
    res.send('Reponse to getbyid the data from backend server');
});

app.get('/update', (req, res) => {
    res.send('Reponse to update the data');
});

app.get('/delete', (req, res) => {
    res.send('Reponse to delete the data from file');
});

app.get('/newdata', (req, res) => {
    res.send('gpl will response you at any cost');
});

app.listen(port, () => { console.log('server started'); });









































































































