const bodyParser = require('body-parser');
const express = require('express');
const app = express()

// Requiring the Multer 
const multer = require('multer')
const path = require('path')


const model =  require('../models/Schema')
const csv = require('csvtojson');


app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static(path.resolve(__dirname,'public')))


const mulStorage =  multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,'./public/file')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const useStorage = multer({storage: mulStorage})

app.get('/register',()=>{
    console.log('The get req has been received its working ')
})

app.post('/register',useStorage.single('file'),(req,res)=>{

    try{

        let allRec = [];
        csv()
        .fromFile(req.file.path)
        .then(async(res)=>{
            // Testing
            // console.log(res)
            for(let i=0;i<res.length;i++){
                allRec.push({
                    collegeCode : res[i].collegeCode,
                    name : res[i].name,
                    cgpa : res[i].cgpa
                })
            }

           await model.insertMany(allRec)
        })


        res.send('Try successfull and successfully fetched the input file')
    }

    catch(e){
        res.send('Error Fetched')
        console.log(e)
    }
})

module.exports = app;

