//tal sabag - 042836023;
//rotem zagori-316389378

const mongoose = require('mongoose');
const User = require('./User');
const Cost = require('./Cost');
const Developer = require('./Developer');
const URI = 'mongodb+srv://tal:tal@cluster0.4vriwhc.mongodb.net/?retryWrites=true&w=majority'


async function dbConnection(){
    try{
        await mongoose.connect(URI,{dbName: 'FinalProject'}).then(() => console.log('Connected to database'));
    }
    catch(err){
        return {'status':'FAILED','msg':err};
    }
}

async function getReport(reportParams){
    let finalResponseObject = {
        'food':[],
        'health':[],
        'housing':[],
        'sport':[],
        'education':[],
        'transportation':[],  
        'other':[]
    }

    let dbRes = await Cost.find({
        $and:[
            {user_id:reportParams.user_id},
            {year:reportParams.year},
            {month:reportParams.month},
        ]
    });

    dbRes.forEach((cost) => {
        //formmating according the document
        finalResponseObject[cost.category].push({'day':cost.day,'description':cost.description,'sum':cost.sum});
    })

    return finalResponseObject; 
}


async function getDevelopers(){
    let dbRes = await Developer.find({},{firstname:1,lastname:1,id:1,email:1,_id:0})
    return dbRes; 
}

async function saveCost(costParams){
    const cost = new Cost({
        user_id:costParams.user_id,
        sum:costParams.sum,
        category:costParams.category,
        description:costParams.description,
        year:costParams.year,
        month:costParams.month,
        day:costParams.day,
    })

    let dbRes = await cost.save()
    .then((response) => { return {'status':'SUCCESS','msg':response}})
    .catch((err) => {return {'status':'FAILED','msg':err}})
    return dbRes;
}


async function saveUser(userParams){
    const user = new User({
        first_name:userParams.first_name,
        last_name:userParams.last_name,
        birthday:userParams.birthday
    })

    let dbRes = await user.save()
    .then((response) => { return {'status':'SUCCESS','msg':'Welcome ' + userParams.first_name + ':)'};})
    .catch((err) => {return {'status':'FAILED','msg':err};})
    return dbRes;
}


async function saveDeveloper(developerParams){
    const developer = new Developer({
        firstname:developerParams.firstname,
        lastname:developerParams.lastname,
        email:developerParams.email,
        id:developerParams.id,
    })

    let dbRes = await developer.save()
    .then((response) => { return {'status':'SUCCESS','msg':`Added Developer: ${developerParams.firstname} ${developerParams.lastname}`}})
    .catch((err) => {return {'status':'FAILED','msg':err};})
    return dbRes;
}


module.exports = {
    dbConnection,
    saveUser,
    saveCost,
    saveDeveloper,
    getReport,
    getDevelopers,
    
}