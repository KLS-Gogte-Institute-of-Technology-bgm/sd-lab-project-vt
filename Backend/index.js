const express = require('express')
const cors = require('cors')
const multer = require('multer')
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require ('uuid');
const mongoose = require('mongoose')
const adminRoutes = require('./auth/auth')
let Vehicle = require('./models/Vehicle')
let User = require('./models/User');
const middleware = require('./auth/isLoggedIn');
const app = express()


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(__dirname + '/public'));

app.use('/admin', adminRoutes)

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
        price: req.body.price,
        year: req.body.year
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
        price: vehicle.price,
        year: vehicle.year,
        papers: vehicle.papers,
        isLive: false,
        isFeatured: false
    })
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

app.get('/allvehicles', (req, res) => {
    Vehicle.find({isLive: true}).sort({date: 'descending'})
        .then(response => {
            let v = []
            while(response.length>0){
                v.push(response.splice(0, 4))
            }
            res.status(200).json({success: true, data: v})
        })
})

app.get('/allfeatured', (req, res) => {
    Vehicle.find({isLive: true, isFeatured: true}).sort({date: 'descending'})
        .then(response => {
            res.status(200).json({success: true, data: response})
        })
})

app.get('/display/:id', (req, res) => {
    const id = req.params.id
    Vehicle.find({_id: id})
        .then(result => {
            res.status(200).json({data: result})
        })
        .catch(err => {
            res.status(400).json({message: "Some error has occured!"})
        })
})

app.get('/admin/getallsellers', middleware.isLoggedIn, (req, res) => {
    User.find({queryType: "Sell"})
        .then(resp => {
            res.status(200).json({success: true, data: resp})
        })
        .catch(err => {
            console.log(err)
        })
})

app.get('/admin/getallbuyers', middleware.isLoggedIn, (req, res) => {
    User.find({queryType: "Buy"})
        .then(resp => {
            res.status(200).json({success: true, data: resp})
        })
        .catch(err => {
            console.log(err)
        })
})

app.post('/admin/setdisplay',middleware.isLoggedIn, async(req, res) => {
    const id = req.body.id
    const isLiveStatus = req.body.isLiveStatus
    await Vehicle.updateOne({_id: id}, {isLive: isLiveStatus})
    res.status(200).json({success: true})
})

app.post('/admin/setfeatured',middleware.isLoggedIn, async(req, res) => {
    const id = req.body.id
    const isFeatured = req.body.isFeatured
    console.log(id, isFeatured)
    await Vehicle.updateOne({_id: id}, {isFeatured: isFeatured})
    res.status(200).json({success: true})
})

app.post('/admin/updateprice',middleware.isLoggedIn, async(req, res) => {
    const id = req.body.id
    const newPrice = req.body.newPrice
    await Vehicle.updateOne({_id: id}, {price: newPrice})
    res.status(200).json({success: true})
})

app.post('/admin/updateregistration', middleware.isLoggedIn, async(req, res) => {
    const id = req.body.id
    const registrationNo = req.body.registrationNo
    await Vehicle.updateOne({_id: id}, {registrationNo: registrationNo})
    res.status(200).json({success: true})
})

app.post('/admin/updatedescription', middleware.isLoggedIn, async(req, res) => {
    const id = req.body.id
    const description = req.body.description
    await Vehicle.updateOne({_id: id}, {description: description})
    res.status(200).json({success: true})
})

app.post('/buyquery', (req, res) => {
    const id = req.body.vehicle
    const name = req.body.name
    const phoneNumber = req.body.phoneNumber
    const city = req.body.city
    const newUser = new User({
        name: name,
        phoneNumber: phoneNumber,
        city: city,
        vehicle: id,
        queryType: "Buy"
    })
    newUser.save()
        .then(resp => {
            res.status(200).json({message: "Your request has been submitted successfully! Please wait until we contact you!"})
        })
        .catch(err => {
            res.status(200).json({message: "Some error has occured, please try again later!"})
        })
})

app.listen(4000, () => {
    console.log("Server running on port 4000")
})