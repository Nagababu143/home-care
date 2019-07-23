var express = require('express');
var app = express();
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const bcrypt = require('bcrypt')
var bodyParser = require('body-parser');
var cors = require('cors');
const admin = require('./models/adminlogin.js')
const patients = require('./models/patient')
app.use(cors());
var multer = require('multer');
app.use(express.static('uploads'));
require('./db/mongoose');
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));
const providerctrl = require('./controllers/providerctrl.js');
const getProviders = require('./controllers/providerctrl.js');
const getAdminloginsave = require('./controllers/adminloginctrl');
const getaddqualification = require('./controllers/qualificationctrl');
const qualificationlist = require('./controllers/qualificationctrl');
const slot = require('./controllers/slotmasterctrl');
const patient = require('./controllers/patientctrl')

app.post('/providers',function(req,res){
    providerctrl.newprovider(req,res)
 });
 app.get('/getProviders',function(req,res){
     getProviders.getprovider(req,res)
 });
 app.get('/getAllproviders',function(req,res){
     getProviders.getAllprovider(req,res)
 });
 app.put('/updateProvider/:id',function(req,res){
     getProviders.providerUpdate(req,res)
 });
 app.post('/adminloginsave',function(req,res){
    getAdminloginsave.adminloginsave(req,res)
});
app.post('/addqualification',function(req,res){
    getaddqualification.addQualification(req,res)
});
app.get('/getQualification/:id',function(req,res){
    qualificationlist.getQualification(req,res)
});
app.get('/getAllqualifications',function(req,res){
    qualificationlist.getallqualifications(req,res)
});
app.get('/getqualifications',function(req,res){
    qualificationlist.getqualifications(req,res)
});
app.put('/updateQualification/:id',function(req,res){
    qualificationlist.qualificationUpdate(req,res)
});
app.post('/slotmaster',function(req,res){
    slot.slotMaster(req,res)
});
app.get('/getSlotmaster',function(req,res){
    slot.slotGet(req,res)
});
app.get('/getAllslotmaster',function(req,res){
    slot.slotgetAll(req,res)
})
app.put('/updateSlot/:id',function(req,res){
    slot.slotmasterUpdate(req,res)
});
app.get('/getpatient/:id',function(req,res){
    patient.getpatient(req,res)
});
app.put('/updatepatientpassword/:id',function(req,res){
    patient.changepassword(req,res)
});
app.post('/savePatient',function(req,res,next){
    bcryptjs.hash(req.body.password,8)
    .then(hash=>{
        const patient = new patients({
            email:req.body.email,
            password:hash,
            name:req.body.name,
            gender:req.body.gender,
            age:req.body.age,
            phone:req.body.phone,
            address:req.body.address,
            
});
        patient.save()
        .then(result=>{
            res.status(201).json(result)
        })
    })
});
app.post('/patientlogin',async (req,res)=>{ 
    try{
    const patient = await patients.findOne({email:req.body.email})
    console.log(patient)
    if(!patient){
        throw new error('Unable to login')
    }
    const isMatch = await bcryptjs.compareSync(req.body.password,patient.password)
    console.log(isMatch)
    if(!isMatch){
        throw new error('unable to login')
    }
       res.send(patient)
      
    }catch(e){
        res.status(400).send()
    }
});
// app.post('/login',async (req,res,next)=>{
//   patients.findOne({email:req.body.email})
    
//     .then(patient=>{
//         console.log(patient)
      
//         if(!patient){
//             return res.status(401).json({
//                 message:"auth failed"
//             })
//         }
       
        //   var hashedpassword = bcryptjs.hash(req.body.password,10);
        // console.log(hashedpassword)
        // console.log(req.body.password)
        // console.log(patient.password)
      
//        return bcrypt.compare(req.body.password,patient.password);
//     }).then(result=>{
//          if(!result){
//             console.log(result)
//              console.log('hi1')
//             return res.status(401).json({
//                 message:"auth failed"
//             })  
//          }
        
//         const token = jwt.sign({email:patient.email},'screet this',{expiresIn:'1h'});
//         res.status(200).json({
//             token:token,
//             result:result
//         })   
      
//     }).catch(err=>{
//         console.log('hi2')
//         return res.status(401).json({
//             message:"auth failed"
//     });
// });
//  });
// var datetimestamp;
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null,'./uploads/');
    },
    filename: function (req, file, cb) {
        // datetimestamp = Date.now();
        cb(null, file.originalname); 
    }
});
var upload = multer({ //multer settings 
    storage: storage
}).single('file');
app.post('/upload', function(req, res) {
    upload(req,res,function(success){
        if(success){
             res.json({success_code:1,err_desc:success});
             return;
        }
         res.json({success_code:1,err_desc:null});
    });
});
app.get('/download/:photo', function(req, res){
    var file = __dirname + '/uploads/'+req.params.photo;
    res.download(file); // Set disposition and send it.
  });
app.post('/adminlogin',async (req,res)=>{
    try{
       const admin1 = await admin.findByCredentials(req.body.email,req.body.password)
       res.send(admin1)
    }catch(error){
        res.send(error)
    }
 });
require('./routes/actorroutes')(app);
var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
    console.log('Server running at ' + port);

});
var endMongoConnection = function(){
    mongoose.connection.close(function(){
        process.exit(0);
    });
}
process.on('SIGINT', endMongoConnection).on('SIGTERM', endMongoConnection)

+6
