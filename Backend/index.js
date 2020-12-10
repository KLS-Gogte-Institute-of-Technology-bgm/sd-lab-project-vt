const express = require('express')
const cors = require('cors')
const multer = require('multer')
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require ('uuid');
const mongoose = require('mongoose')
let Vehicle = require('./models/Vehicle')
let User = require('./models/User')
const app = express()


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(__dirname + '/public'));

const DIR = './public/'

mongoose.connect("mongodb+srv://pigoauto:vaibhav@cluster0.2czvc.mongodb.net/pigoauto?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true}, () => {console.log("Connected to db")})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

app.get('/', (req, res) => {
    res.send("Hello")
})

app.post('/upload', upload.array('images', 6), async(req, res, next) => {
    const user = {
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        city: req.body.city
    }

    const vehicle = {
        brand: req.body.brand,
        model: req.body.model,
        kmDriven: req.body.kmDriven,
        owners: req.body.owners,
        papers: req.body.papers,
        insurance: req.body.insurance,
        accident: req.body.accident,
        type: req.body.type,
        price: req.body.price
    }
    const reqFiles = []
    const url = req.protocol+'://'+req.get('host')
    console.log(vehicle, user)
    for(let i = 0; i<req.files.length; i++){
        reqFiles.push(url+'/public/'+req.files[i].filename)
        console.log(req.files[i].filename)
    }
    console.log(vehicle, user)
    const result = await submitSellQuery(reqFiles, user, vehicle)
    if(result){
        res.status(200).json({message: "Your request has been submitted successfully! Please wait until we contact you!"})
    } else {
        res.status(200).json({message: "Some error has occured, please try again after some time!"})
    }
})

async function submitSellQuery(reqFiles, user, vehicle){
    const V = new Vehicle({
        brand: vehicle.brand,
        model: vehicle.model,
        kmDriven: vehicle.kmDriven,
        insurance: vehicle.insurance,
        accident: vehicle.accident,
        type: vehicle.type,
        images: reqFiles,
        price: vehicle.price
    })
    console.log(reqFiles)
    let result = await V.save()
                    .catch(err => {
                        console.log(err)
                    })
    const U = new User({
        name: user.name,
        phoneNumber: user.phoneNumber,
        city: user.city,
        vehicle: result._id,
        queryType: "Sell"
    })
    
    U.save().then(result => {
        if(result._id){
            return true
        }
    })
    .catch(err => {
        return false
    })
}

app.get('/public/:id', (req, res) => {
    res.sendFile(__dirname + '/public/'+req.params.id)
})

app.listen(4000, () => {
    console.log("Server running on port 4000")
})