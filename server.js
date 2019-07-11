var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
const admin = require('./models/adminlogin.js')
app.use(cors());
var multer = require('multer');
app.use(express.static('uploads'));
require('./db/mongoose')
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));
const providerctrl = require('./controllers/providerctrl.js')
const getProviders = require('./controllers/providerctrl.js')
const getAdminloginsave = require('./controllers/adminloginctrl')

app.post('/providers',function(req,res){
    providerctrl.newprovider(req,res)
 })

 app.get('/getProviders',function(req,res){
     getProviders.getprovider(req,res)
 })
 app.post('/adminloginsave',function(req,res){
    getAdminloginsave.adminloginsave(req,res)
});
// var datetimestamp;
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/');
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
        //console.log(res.ServerResponse);
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
 })
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
process.on('SIGINT', endMongoConnection).on('SIGTERM', endMongoConnection);