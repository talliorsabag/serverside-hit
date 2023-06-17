//tal sabag - 042836023;
//rotem zagori-316389378

const express = require('express');
const server = express();
const PORT = 3001;
const dbObject = require('./db/dbObject');
const bodyParser = require('body-parser');

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json())
server.listen(PORT,()=> console.log('Server is listening on port ' + PORT + '...'));
dbObject.dbConnection();



server.get('/report', async (req,res) => {
    if(req.query.year && req.query.month && req.query.user_id){
        const dbResponse = await dbObject.getReport(req.query);        
        res.send(dbResponse); 

    } else {
        res.status(500).send({status:'FAILED',error:'Failed to get report, please check your parameters'});
    }
})


server.get('/about', async (req,res) => {
    try{
        const dbResponse = await dbObject.getDevelopers();        
        res.send(dbResponse); 

    } catch (err) {
        res.status(500).send({status:'FAILED',error:'About request has failed'});
    }
})


server.post('/addcost',async (req,res) => {
    if(req.body.user_id && req.body.sum && req.body.category && req.body.description){
        const dbResponse = await dbObject.saveCost(req.body);
        res.send(dbResponse);

    } else {
        res.status(500).send({status:'FAILED',error:'Must fill all minimum fields'});
    }
})

server.post('/adduser',async (req,res) => {
    if(req.body.first_name && req.body.last_name && req.body.birthday){
        const dbResponse = await dbObject.saveUser(req.body);
        res.send(dbResponse);

    } else {
        res.send({status:'FAILED',error:'Must fill all minimum fields'});
    }
})

server.post('/adddeveloper',async (req,res) => {
    if(req.body.firstname && req.body.lastname && req.body.email && req.body.id){
        const dbResponse = await dbObject.saveDeveloper(req.body);
        res.send(dbResponse);

    } else {
        res.send({status:'FAILED',error:'Must fill all minimum fields'});
    }
})






